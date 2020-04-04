import { UserService } from './user.service';

export function authInitFactory(userService: UserService) {
  return () => userService.fetchUser().toPromise().catch(_ => { });
}
