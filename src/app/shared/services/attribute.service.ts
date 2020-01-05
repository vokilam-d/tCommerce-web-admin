import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from '../dtos/attribute.dto';
import { Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';

@Injectable()
export class AttributeService {

  constructor(private http: HttpClient) {
  }

  fetchAttributes(): Observable<ResponseDto<AttributeDto[]>> {
    return this.http.get<ResponseDto<AttributeDto[]>>('http://localhost:3500/api/v1/admin/attributes');
  }

  fetchAttribute(id: string): Observable<ResponseDto<AttributeDto>> {
    return this.http.get<ResponseDto<AttributeDto>>(`http://localhost:3500/api/v1/admin/attributes/${id}`);
  }

  addNewAttribute(dto: CreateAttributeDto): Observable<ResponseDto<AttributeDto>> {
    return this.http.post<ResponseDto<AttributeDto>>(`http://localhost:3500/api/v1/admin/attributes`, dto);
  }

  updateAttribute(id: string, dto: UpdateAttributeDto): Observable<ResponseDto<AttributeDto>> {
    return this.http.put<ResponseDto<AttributeDto>>(`http://localhost:3500/api/v1/admin/attributes/${id}`, dto);
  }

  deleteAttribute(id: string) {
    return this.http.delete<any>(`http://localhost:3500/api/v1/admin/attributes/${id}`);
  }
}
