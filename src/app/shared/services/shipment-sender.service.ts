import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseDto } from '../dtos/response.dto';
import { ShipmentSenderDto } from '../dtos/shipment-sender.dto';
import { API_HOST } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ShipmentSenderService {

  constructor(private http: HttpClient) {
  }

  fetchAllSenders() {
    return this.http.get<ResponseDto<ShipmentSenderDto[]>>(`${API_HOST}/api/v1/shipment-senders`);
  }
}
