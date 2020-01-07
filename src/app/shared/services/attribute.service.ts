import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AttributeDto, CreateAttributeDto, UpdateAttributeDto } from '../dtos/attribute.dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseDto } from '../dtos/response.dto';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  private _attributes$: BehaviorSubject<AttributeDto[]> = new BehaviorSubject([]);
  attributes$ = this._attributes$.asObservable();

  constructor(private http: HttpClient) {
    this.setAttributes();
  }

  setAttributes() {
    this.http.get<ResponseDto<AttributeDto[]>>('http://localhost:3500/api/v1/admin/attributes')
      .subscribe(
        response => {
          this._attributes$.next(response.data);
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

  getAttributeLabel(attrId: string): string {
    const found = this._attributes$.getValue().find(attr => attr.id === attrId);
    if (!found) {
      throw new Error(`Attribute with id '${attrId}' not found`);
    }

    return found.label;
  }

  getValueLabel(attrId: string, valueId: string): string {
    const found = this._attributes$.getValue().find(attr => attr.id === attrId);
    if (!found) { throw new Error(`Attribute with id '${attrId}' not found`); }

    const foundValue = found.values.find(value => value.id === valueId);
    if (!foundValue) { throw new Error(`Value with id '${valueId}' not found in attribute '${found.label}'`); }

    return foundValue.label
  }
}