import { Role } from '../enums/role.enum';

export class AddOrUpdateUserDto {
  login: string = '';
  password: string = '';
  name: string = '';
  role: Role = Role.Manager;
}

export class UserDto extends AddOrUpdateUserDto {
  id: string;
}

