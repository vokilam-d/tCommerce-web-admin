import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOrUpdateProductDto, ProductListItemDto, ProductDto } from '../dtos/product.dto';
import { toHttpParams } from '../helpers/to-http-params.function';
import { ResponseDto } from '../dtos/response.dto';
import { IGridValue } from '../../grid/grid.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  fetchAllProducts(filter: IGridValue, withVariants: boolean): Observable<ResponseDto<ProductListItemDto[]>> {
    const params: any = filter;
    params.withVariants = withVariants;

    return this.http.get<ResponseDto<ProductListItemDto[]>>(
      'http://localhost:3500/api/v1/admin/products',
      { params: toHttpParams(params) }
    );
  }

  fetchProduct(id: string | number): Observable<ResponseDto<ProductDto>> {
    return this.http.get<ResponseDto<ProductDto>>(`http://localhost:3500/api/v1/admin/products/${id}`);
  }

  addNewProduct(dto: AddOrUpdateProductDto): Observable<ResponseDto<ProductDto>> {
    return this.http.post<ResponseDto<ProductDto>>(`http://localhost:3500/api/v1/admin/products`, dto);
  }

  updateProduct(id: number, dto: AddOrUpdateProductDto): Observable<ResponseDto<ProductDto>> {
    return this.http.put<ResponseDto<ProductDto>>(`http://localhost:3500/api/v1/admin/products/${id}`, dto);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`http://localhost:3500/api/v1/admin/products/${id}`);
  }

  getGoogleShoppingFeedUrl(): string {
    return `http://localhost:3500/api/v1/admin/google/shopping-feed`;
  }

  getGoogleReviewsFeedUrl(): string {
    return `http://localhost:3500/api/v1/admin/google/reviews-feed`;
  }
}
