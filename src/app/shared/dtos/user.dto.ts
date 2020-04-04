export class UserDto {
  id?: string;
  login: string = '';
}

export class AddOrUpdateUserDto extends UserDto {
  password: string;
}
