import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyDto } from '../../shared/dtos/currency.dto';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { NotyService } from '../../noty/noty.service';
import { DEFAULT_CURRENCY_CODE } from '../../shared/enums/currency.enum';

@Component({
  selector: 'currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  currencies: CurrencyDto[] = [];
  activeCurrency: CurrencyDto = null;

  constructor(private http: HttpClient,
              private notyService: NotyService) { }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.activeCurrency = null;
    this.http.get<ResponseDto<CurrencyDto[]>>(`http://localhost:3500/api/v1/admin/currencies`)
      .pipe(this.notyService.attachNoty())
      .subscribe(
        response => {
          this.setCurrencies(response.data);
          this.selectCurrency(this.currencies[0]);
        }
      );
  }

  private setCurrencies(currencyDtos: CurrencyDto[]) {
    this.currencies = currencyDtos.filter(dto => dto.id !== DEFAULT_CURRENCY_CODE);
  }

  selectCurrency(currency: CurrencyDto) {
    if (currency) {
      this.activeCurrency = currency;
    } else {
      this.activeCurrency = null;
    }
  }

  updateCurrency() {
    this.http.put<ResponseDto<CurrencyDto>>(
      `http://localhost:3500/api/v1/admin/currencies/${this.activeCurrency.id}`,
      this.activeCurrency
    )
      .pipe(this.notyService.attachNoty({ successText: 'Валюта успешно обновлена' }))
      .subscribe(
        response => {
          this.activeCurrency = response.data;
        }
      );
  }

  updateExchangeRates() {
    this.http.post<ResponseDto<CurrencyDto[]>>(`http://localhost:3500/api/v1/admin/currencies/update-rates`, {})
      .pipe(this.notyService.attachNoty({ successText: 'Курс валют успешно обновлён' }))
      .subscribe(
        response => {
          this.setCurrencies(response.data);
          this.selectCurrency(this.currencies[0]);
        }
      );
  }
}
