import { environment } from '../../../environments/environment';

export function getClientLinkPrefix(): string {
  if (environment.production) {
    return '/';
  } else {
    return 'http://localhost:4002/';
  }
}
