import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { API_HOST } from '../constants/constants';
import { toHttpParams } from '../helpers/to-http-params.function';
import { BlogPostDto } from '../dtos/blog-post.dto';
import { IGridValue } from '../../grid/grid.interface';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor(private http: HttpClient) { }

  fetchAllPosts(gridValue: IGridValue): Observable<ResponseDto<BlogPostDto[]>> {
    return this.http.get<ResponseDto<BlogPostDto[]>>(
      `${API_HOST}/api/v1/admin/blog/posts`,
      { params: toHttpParams(gridValue) }
    );
  }

  fetchPost(id: number): Observable<ResponseDto<BlogPostDto>> {
    return this.http.get<ResponseDto<BlogPostDto>>(`${API_HOST}/api/v1/admin/blog/posts/${id}`);
  }

  addNewPost(dto: BlogPostDto): Observable<ResponseDto<BlogPostDto>> {
    return this.http.post<ResponseDto<BlogPostDto>>(`${API_HOST}/api/v1/admin/blog/posts`, dto);
  }

  updatePost(id: number, dto: BlogPostDto): Observable<ResponseDto<BlogPostDto>> {
    return this.http.put<ResponseDto<BlogPostDto>>(`${API_HOST}/api/v1/admin/blog/posts/${id}`, dto);
  }

  deletePost(id: number) {
    return this.http.delete<any>(`${API_HOST}/api/v1/admin/blog/posts/${id}`);
  }
}
