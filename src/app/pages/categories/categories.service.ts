import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AddOrUpdateCategoryDto, CategoryDto, CategoryTreeItem } from '../../shared/dtos/category.dto';
import { ResponseDto } from '../../shared/dtos/response.dto';
import { API_HOST } from '../../shared/constants/constants';

@Injectable()
export class CategoriesService {

  selectedCategoryId: number;
  categoryUpdated$ = new Subject();

  constructor(private http: HttpClient) {
  }

  fetchCategoriesTree() {
    return this.http.get<ResponseDto<CategoryTreeItem[]>>(`${API_HOST}/api/v1/admin/categories/tree`);
  }

  fetchCategory(id: string) {
    return this.http.get<ResponseDto<CategoryDto>>(`${API_HOST}/api/v1/admin/categories/${id}`);
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

    return this.http.post<ResponseDto<CategoryDto>>(`${API_HOST}/api/v1/admin/categories`, categoryDto);
  }

  updateCategory(id: number, categoryDto: CategoryDto) {
    return this.http.put<ResponseDto<CategoryDto>>(`${API_HOST}/api/v1/admin/categories/${id}`, categoryDto);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${API_HOST}/api/v1/admin/categories/${id}`);
  }
}
