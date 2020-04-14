import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotyService } from '../../noty/noty.service';
import { API_HOST } from '../../shared/constants/constants';

@Component({
  selector: 'emails-test',
  templateUrl: './emails-test.component.html',
  styleUrls: ['./emails-test.component.scss']
})
export class EmailsTestComponent implements OnInit {

  email: string = '';
  private apiPrefix = 'admin/email-test';

  constructor(private http: HttpClient,
              private notyService: NotyService) { }

  ngOnInit() {
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

  private checkEmail(): boolean {
    if (this.email) {
      return true;
    } else {
      this.notyService.showErrorNoty(`Не указан email для тестирования`);
      return false;
    }
  }
}
