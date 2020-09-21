import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotyService } from '../../noty/noty.service';
import { API_HOST } from '../../shared/constants/constants';
import { HeadService } from '../../shared/services/head.service';
import { logMemory } from '../../shared/helpers/log-memory.function';

@Component({
  selector: 'emails-test',
  templateUrl: './emails-test.component.html',
  styleUrls: ['./emails-test.component.scss']
})
export class EmailsTestComponent implements OnInit {

  email: string = '';
  private apiPrefix = 'admin/email-test';

  constructor(private http: HttpClient,
              private headService: HeadService,
              private notyService: NotyService) { }

  ngOnInit() {
    this.headService.setTitle(`Письма`);
    setTimeout(() => {
      console.log('After "EmailsTestComponent" render');
      logMemory();
    }, 1000);
  }

  sendEmailConfirmationEmail() {
    if (!this.checkEmail()) { return; }

    const apiUrl = `${API_HOST}/api/v1/${this.apiPrefix}/email-confirmation`;
    this.http.post(apiUrl, { email: this.email })
      .pipe(this.notyService.attachNoty({ successText: 'Письмо успешно отправлено' }))
      .subscribe();
  }

  sendSuccessfulRegistrationEmail() {
    if (!this.checkEmail()) { return; }

    const apiUrl = `${API_HOST}/api/v1/${this.apiPrefix}/registration-success`;
    this.http.post(apiUrl, { email: this.email })
      .pipe(this.notyService.attachNoty({ successText: 'Письмо успешно отправлено' }))
      .subscribe();
  }

  sendOrderConfirmationEmail() {
    if (!this.checkEmail()) { return; }

    const orderId = prompt(`Введите ID заказа`);
    if (!orderId) { return; }

    const apiUrl = `${API_HOST}/api/v1/${this.apiPrefix}/order-confirmation/${orderId}`;
    this.http.post(apiUrl, { email: this.email })
      .pipe(this.notyService.attachNoty({ successText: 'Письмо успешно отправлено' }))
      .subscribe();
  }

  sendLeaveReviewEmail() {
    if (!this.checkEmail()) { return; }

    const orderId = prompt(`Введите ID заказа`);
    if (!orderId) { return; }

    const apiUrl = `${API_HOST}/api/v1/${this.apiPrefix}/leave-review/${orderId}`;
    this.http.post(apiUrl, { email: this.email })
      .pipe(this.notyService.attachNoty({ successText: 'Письмо успешно отправлено' }))
      .subscribe();
  }

  sendResetPasswordEmail() {
    if (!this.checkEmail()) { return; }

    const apiUrl = `${API_HOST}/api/v1/${this.apiPrefix}/reset-password`;
    this.http.post(apiUrl, { email: this.email })
      .pipe(this.notyService.attachNoty({ successText: 'Письмо успешно отправлено' }))
      .subscribe();
  }

  sendNewProductReviewEmail() {
    if (!this.checkEmail()) { return; }

    const reviewId = prompt(`Введите ID отзыва`);
    if (!reviewId) { return; }

    const apiUrl = `${API_HOST}/api/v1/${this.apiPrefix}/new-product-review/${reviewId}`;
    this.http.post(apiUrl, { email: this.email })
      .pipe(this.notyService.attachNoty({ successText: 'Письмо успешно отправлено' }))
      .subscribe();
  }

  sendNewStoreReviewEmail() {
    if (!this.checkEmail()) { return; }

    const reviewId = prompt(`Введите ID отзыва`);
    if (!reviewId) { return; }

    const apiUrl = `${API_HOST}/api/v1/${this.apiPrefix}/new-store-review/${reviewId}`;
    this.http.post(apiUrl, { email: this.email })
      .pipe(this.notyService.attachNoty({ successText: 'Письмо успешно отправлено' }))
      .subscribe();
  }

  private checkEmail(): boolean {
    if (this.email) {
      return true;
    } else {
      this.notyService.showErrorNoty(`Не указан email для тестирования`);
      return false;
    }
  }
}
