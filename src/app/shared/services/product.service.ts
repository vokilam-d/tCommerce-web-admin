import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddOrUpdateProductDto, ResponseProductDto } from '../dtos/product.dto';
import { IDataListResponseDto } from '../dtos/data-list.dto';
import { IPagination } from '../../pagination/pagination.interface';
import { toHttpParams } from '../helpers/to-http-params.function';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) {
  }

  fetchProducts(filter: IPagination): Observable<IDataListResponseDto<ResponseProductDto[]>> {
    return this.http.get<IDataListResponseDto<ResponseProductDto[]>>('http://localhost:3500/api/v1/admin/products', { params: toHttpParams(filter) });
  }

  fetchProduct(id: string | number): Observable<ResponseProductDto> {
    return this.http.get<ResponseProductDto>(`http://localhost:3500/api/v1/admin/products/${id}`);
  }

  addNewProduct(dto: AddOrUpdateProductDto): Observable<ResponseProductDto> {
    return this.http.post<ResponseProductDto>(`http://localhost:3500/api/v1/admin/products`, dto);
  }

  updateProduct(id: number, dto: AddOrUpdateProductDto): Observable<ResponseProductDto> {
    return this.http.put<ResponseProductDto>(`http://localhost:3500/api/v1/admin/products/${id}`, dto);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(`http://localhost:3500/api/v1/admin/products/${id}`);
  }
}
