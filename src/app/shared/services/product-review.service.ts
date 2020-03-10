import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { ProductReviewDto } from '../dtos/product-review.dto';
import { toHttpParams } from '../helpers/to-http-params.function';

@Injectable({
  providedIn: 'root'
})
export class ProductReviewService {

  constructor(private http: HttpClient) {
  }

  fetchAllProductReviews(filter: IPagination): Observable<ResponseDto<ProductReviewDto[]>> {
    return this.http.get<ResponseDto<ProductReviewDto[]>>(
      'http://localhost:3500/api/v1/admin/product-reviews',
      { params: toHttpParams(filter) }
    );
  }

  fetchProductReviewsByProductId(productId: number): Observable<ResponseDto<ProductReviewDto[]>> {
    return this.http.get<ResponseDto<ProductReviewDto[]>>(
      'http://localhost:3500/api/v1/admin/product-reviews',
      { params: toHttpParams({ productId })  }
    );
  }

  fetchProductReview(id: number): Observable<ResponseDto<ProductReviewDto>> {
    return this.http.get<ResponseDto<ProductReviewDto>>(`http://localhost:3500/api/v1/admin/product-reviews/${id}`);
  }

  addNewProductReview(dto: ProductReviewDto): Observable<ResponseDto<ProductReviewDto>> {
    return this.http.post<ResponseDto<ProductReviewDto>>(`http://localhost:3500/api/v1/admin/product-reviews`, dto);
  }

  updateProductReview(id: number, dto: ProductReviewDto): Observable<ResponseDto<ProductReviewDto>> {
    return this.http.put<ResponseDto<ProductReviewDto>>(`http://localhost:3500/api/v1/admin/product-reviews/${id}`, dto);
  }

  deleteProductReview(id: number) {
    return this.http.delete<any>(`http://localhost:3500/api/v1/admin/product-reviews/${id}`);
  }
}
