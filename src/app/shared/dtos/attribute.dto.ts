import { EAttributeType } from '../enums/attribute-type.enum';

export class AttributeValueDto {
  id: string = '';
  label: string = '';
  color?: string = '';
  isDefault: boolean = false;
}

export class UpdateAttributeDto {
  label: string = '';
  values: AttributeValueDto[] = [];
  groupName: string = '';
  isVisibleInProduct: boolean = true;
  isVisibleInFilters: boolean = true;
  hasColor: boolean = false;
}

export class CreateAttributeDto extends UpdateAttributeDto {
  id: string = '';
  type: EAttributeType = EAttributeType.Select;
}

export class AttributeDto extends CreateAttributeDto {
}
