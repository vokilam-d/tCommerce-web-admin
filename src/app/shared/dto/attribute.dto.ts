export class UpdateAttributeDto {
  label: string;

  values: string[];

  groupName: string;
}

export class CreateAttributeDto extends UpdateAttributeDto {
  id: string;
}

export class AttributeDto extends CreateAttributeDto {
}
