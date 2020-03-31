import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { StoreReviewDto } from '../dtos/store-review.dto';
import { toHttpParams } from '../helpers/to-http-params.function';
import { API_HOST } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class StoreReviewService {

  constructor(private http: HttpClient) {
  }

  fetchAllStoreReviews(filter: IPagination): Observable<ResponseDto<StoreReviewDto[]>> {
    return this.http.get<ResponseDto<StoreReviewDto[]>>(
      `${API_HOST}/api/v1/admin/store-reviews`,
      { params: toHttpParams(filter) }
    );
  }

  fetchStoreReview(id: string): Observable<ResponseDto<StoreReviewDto>> {
    return this.http.get<ResponseDto<StoreReviewDto>>(`${API_HOST}/api/v1/admin/store-reviews/${id}`);
  }

  addNewStoreReview(dto: StoreReviewDto): Observable<ResponseDto<StoreReviewDto>> {
    return this.http.post<ResponseDto<StoreReviewDto>>(`${API_HOST}/api/v1/admin/store-reviews`, dto);
  }

  updateStoreReview(id: string, dto: StoreReviewDto): Observable<ResponseDto<StoreReviewDto>> {
    return this.http.put<ResponseDto<StoreReviewDto>>(`${API_HOST}/api/v1/admin/store-reviews/${id}`, dto);
  }

  deleteStoreReview(id: string) {
    return this.http.delete<any>(`${API_HOST}/api/v1/admin/store-reviews/${id}`);
  }
}
