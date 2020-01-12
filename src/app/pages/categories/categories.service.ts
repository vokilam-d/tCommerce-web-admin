import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { AddOrUpdateCategoryDto, CategoriesTreeDto, CategoryDto } from '../../shared/dtos/category.dto';
import { ResponseDto } from '../../shared/dtos/response.dto';

@Injectable()
export class CategoriesService {

  selectedCategoryId: number;
  categoryUpdated$ = new Subject();

  constructor(private http: HttpClient) {
  }

  fetchCategoriesTree(): Observable<ResponseDto<CategoriesTreeDto>> {
    return this.http.get<ResponseDto<CategoriesTreeDto>>(`http://localhost:3500/api/v1/admin/categories/tree`);
  }

  fetchCategory(id: string) {
    return this.http.get<ResponseDto<CategoryDto>>(`http://localhost:3500/api/v1/admin/categories/${id}`);
  }

  setSelectedCategoryId(id: number) {
    this.selectedCategoryId = id;
  }

  removeSelectedCategoryId() {
    this.selectedCategoryId = null;
  }

  saveCategory(category: AddOrUpdateCategoryDto, parentId: string) {
    const categoryDto: AddOrUpdateCategoryDto = {
      ...category,
      parentId: parseInt(parentId)
    };

    return this.http.post<ResponseDto<CategoryDto>>(`http://localhost:3500/api/v1/admin/categories`, categoryDto);
  }

  updateCategory(id: number, categoryDto: CategoryDto) {
    return this.http.put<ResponseDto<CategoryDto>>(`http://localhost:3500/api/v1/admin/categories/${id}`, categoryDto);
  }

  deleteCategory(id: number) {
    return this.http.delete(`http://localhost:3500/api/v1/admin/categories/${id}`);
  }
}
