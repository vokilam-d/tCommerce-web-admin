import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { INotyMessage } from './noty.interface';

interface ValidationError {
  /**
   * Object that was validated.
   */
  target?: Object;
  /**
   * Object's property that haven't pass validation.
   */
  property: string;
  /**
   * Value that haven't pass a validation.
   */
  value?: any;
  /**
   * Constraints that failed validation with error messages.
   */
  constraints: {
    [type: string]: string;
  };
  /**
   * Contains all nested validation errors of the property.
   */
  children: ValidationError[];
}

interface IAttachOptions {
  onSuccess: string;
  onError?: string;
  showError?: boolean;
  showProgress?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotyService {

  showNoty$ = new Subject<INotyMessage>();
  private defaultOptions: IAttachOptions = {
    onSuccess: null,
    onError: null,
    showError: true,
    showProgress: false
  };

  constructor() { }

  attachNoty<T>(options?: IAttachOptions) { // todo attach error noty in request interceptor, attach success by demand
    options = {
      ...this.defaultOptions,
      ...(options ? options : {})
    };

    return (source: Observable<T>) =>
      new Observable<T>(observer => {
        // console.log('request start');

        return source.subscribe(
          (response: T) => {
            if (options.onSuccess) {
              this.showSuccessNoty(options.onSuccess);
            }

            observer.next(response);
          },
          responseError => { // todo handle statusCode 0 - no internet
            if (options.showError) {
              const message = (options.onError ? `${options.onError}:\n` : '') + this.buildErrorMessage(responseError.error);
              this.showErrorNoty(message);
            }

            observer.error(responseError);
          },
          () => observer.complete()
        );
      })
  }

  private showSuccessNoty(message) {
    this.showNoty$.next({
      type: 'success',
      message
    });
  }

  private showErrorNoty(message) {
    this.showNoty$.next({
      type: 'error',
      message
    });
  }

  private buildErrorMessage(response: any): string {
    const errors: string[] = [];

    if (typeof response.message === 'string') {
      errors.push(`${response.error}: ${response.message}`);

    } else if (Array.isArray(response.message) && response.message.length > 0) {
      errors.push(response.error + ':');
      errors.push(...this.getErrorsFromValidationErrors(response.message));
    }

    return errors.join('\n');
  }

  private getErrorsFromValidationErrors(validationErrors: ValidationError[]): string[] {
    const errors: string[] = [];

    validationErrors.forEach(validationError => {
      if (validationError.constraints) {
        errors.push(`${this.buildMessageFromConstraints(validationError.constraints)}, got: '${validationError.value}'`);
      }

      if (Array.isArray(validationError.children) && validationError.children.length > 0) {
        errors.push(...this.getErrorsFromValidationErrors(validationError.children));
      }
    });

    return errors;
  }

  private buildMessageFromConstraints(constraints: ValidationError['constraints']): string {
    const messages: string[] = [];

    Object.keys(constraints).forEach(key => {
      messages.push(constraints[key]);
    });

    return messages.join(', ');
  }
}
