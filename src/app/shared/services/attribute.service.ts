import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from '../dtos/attribute.dto';
import { Observable, ReplaySubject } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  attributes$: ReplaySubject<AttributeDto[]> = new ReplaySubject();

  constructor(private http: HttpClient) {
    this.setAttributes();
  }

  setAttributes() {
    this.http.get<ResponseDto<AttributeDto[]>>('http://localhost:3500/api/v1/admin/attributes')
      .subscribe(
        response => {
          this.attributes$.next(response.data);
        }
      );
  }

  fetchAttribute(id: string): Observable<ResponseDto<AttributeDto>> {
    return this.http.get<ResponseDto<AttributeDto>>(`http://localhost:3500/api/v1/admin/attributes/${id}`);
  }

  addNewAttribute(dto: CreateAttributeDto): Observable<ResponseDto<AttributeDto>> {
    return this.http.post<ResponseDto<AttributeDto>>(`http://localhost:3500/api/v1/admin/attributes`, dto)
      .pipe( tap(() => this.setAttributes()) );
  }

  updateAttribute(id: string, dto: UpdateAttributeDto): Observable<ResponseDto<AttributeDto>> {
    return this.http.put<ResponseDto<AttributeDto>>(`http://localhost:3500/api/v1/admin/attributes/${id}`, dto)
      .pipe( tap(() => this.setAttributes()) );
  }

  deleteAttribute(id: string) {
    return this.http.delete<any>(`http://localhost:3500/api/v1/admin/attributes/${id}`)
      .pipe( tap(() => this.setAttributes()) );
  }
}
