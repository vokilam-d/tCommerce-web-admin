export class AttributeValueDto {
  id: string;
  name: string;
  isDefault: boolean;
}

export class UpdateAttributeDto {
  label: string;
  values: AttributeValueDto[];
  groupName: string;
}

export class CreateAttributeDto extends UpdateAttributeDto {
  id: string;
}

export class AttributeDto extends CreateAttributeDto {
}
