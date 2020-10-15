import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { BlogCategoryDto } from '../dtos/blog-category.dto';
import { API_HOST } from '../constants/constants';
import { toHttpParams } from '../helpers/to-http-params.function';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryService {

  constructor(private http: HttpClient) { }

  fetchAllCategories(filter: IPagination): Observable<ResponseDto<BlogCategoryDto[]>> {
    return this.http.get<ResponseDto<BlogCategoryDto[]>>(
      `${API_HOST}/api/v1/admin/blog/categories`,
      { params: toHttpParams(filter) }
    );
  }

  fetchCategory(id: number): Observable<ResponseDto<BlogCategoryDto>> {
    return this.http.get<ResponseDto<BlogCategoryDto>>(`${API_HOST}/api/v1/admin/blog/categories/${id}`);
  }

  addNewCategory(dto: BlogCategoryDto): Observable<ResponseDto<BlogCategoryDto>> {
    return this.http.post<ResponseDto<BlogCategoryDto>>(`${API_HOST}/api/v1/admin/blog/categories`, dto);
  }

  updateCategory(id: number, dto: BlogCategoryDto): Observable<ResponseDto<BlogCategoryDto>> {
    return this.http.put<ResponseDto<BlogCategoryDto>>(`${API_HOST}/api/v1/admin/blog/categories/${id}`, dto);
  }

  deleteCategory(id: number) {
    return this.http.delete<any>(`${API_HOST}/api/v1/admin/blog/categories/${id}`);
  }
}
