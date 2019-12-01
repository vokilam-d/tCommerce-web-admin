import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from '../dtos/attribute.dto';
import { Observable } from 'rxjs';

@Injectable()
export class AttributeService {

  constructor(private http: HttpClient) {
  }

  fetchAttributes(): Observable<AttributeDto[]> {
    return this.http.get<AttributeDto[]>('http://localhost:3500/api/v1/admin/attributes');
  }

  fetchAttribute(id: string): Observable<AttributeDto> {
    return this.http.get<AttributeDto>(`http://localhost:3500/api/v1/admin/attributes/${id}`);
  }

  addNewAttribute(dto: CreateAttributeDto): Observable<AttributeDto> {
    return this.http.post<AttributeDto>(`http://localhost:3500/api/v1/admin/attributes`, dto);
  }

  updateAttribute(id: string, dto: UpdateAttributeDto): Observable<AttributeDto> {
    return this.http.put<AttributeDto>(`http://localhost:3500/api/v1/admin/attributes/${id}`, dto);
  }

  deleteAttribute(id: string) {
    return this.http.delete<any>(`http://localhost:3500/api/v1/admin/attributes/${id}`);
  }
}
