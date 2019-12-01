export class AttributeValue {
  isDefault: boolean;
  name: string;
}

export class UpdateAttributeDto {
  label: string;
  values: AttributeValue[];
  groupName: string;
}

export class CreateAttributeDto extends UpdateAttributeDto {
  id: string;
}

export class AttributeDto extends CreateAttributeDto {
}
