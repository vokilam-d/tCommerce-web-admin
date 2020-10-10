import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IPagination } from '../../pagination/pagination.interface';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { API_HOST } from '../constants/constants';
import { toHttpParams } from '../helpers/to-http-params.function';
import { AdminBlogPostDto } from '../dtos/blog-post.dto';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  constructor( private http: HttpClient ) { }

  fetchAllPosts(filter: IPagination): Observable<ResponseDto<AdminBlogPostDto[]>> {
    return this.http.get<ResponseDto<AdminBlogPostDto[]>>(
      `${API_HOST}/api/v1/admin/blog/posts`,
      { params: toHttpParams(filter) }
    );
  }

  fetchPost(id: number): Observable<ResponseDto<AdminBlogPostDto>> {
    return this.http.get<ResponseDto<AdminBlogPostDto>>(`${API_HOST}/api/v1/admin/blog/posts/${id}`);
  }

  addNewPost(dto: AdminBlogPostDto): Observable<ResponseDto<AdminBlogPostDto>> {
    return this.http.post<ResponseDto<AdminBlogPostDto>>(`${API_HOST}/api/v1/admin/blog/posts`, dto);
  }

  updatePost(id: number, dto: AdminBlogPostDto): Observable<ResponseDto<AdminBlogPostDto>> {
    return this.http.put<ResponseDto<AdminBlogPostDto>>(`${API_HOST}/api/v1/admin/blog/posts/${id}`, dto);
  }

  deletePost(id: number) {
    return this.http.delete<any>(`${API_HOST}/api/v1/admin/blog/posts/${id}`);
  }
}
