import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOrUpdateProductDto, ProductDto } from '../dtos/product.dto';
import { IPagination } from '../../pagination/pagination.interface';
import { toHttpParams } from '../helpers/to-http-params.function';
import { ResponsePaginationDto } from '../dtos/response.dto';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  fetchAllProducts(filter: IPagination): Observable<ResponsePaginationDto<ProductDto[]>> {
    return this.http.get<ResponsePaginationDto<ProductDto[]>>(
      'http://localhost:3500/api/v1/admin/products',
      { params: toHttpParams(filter) }
    );
  }

  fetchProduct(id: string | number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`http://localhost:3500/api/v1/admin/products/${id}`);
  }

  addNewProduct(dto: AddOrUpdateProductDto): Observable<ProductDto> {
    return this.http.post<ProductDto>(`http://localhost:3500/api/v1/admin/products`, dto);
  }

  updateProduct(id: number, dto: AddOrUpdateProductDto): Observable<ProductDto> {
    return this.http.put<ProductDto>(`http://localhost:3500/api/v1/admin/products/${id}`, dto);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`http://localhost:3500/api/v1/admin/products/${id}`);
  }
}
