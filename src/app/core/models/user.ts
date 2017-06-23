import {UserDto} from "./user-dto";

export class User implements UserDto {
  fullName: string;
  username: string;

  static fromDto(userDto: UserDto): User {
    const user = new User();
    user.fullName = userDto.fullName;
    user.username = userDto.username;
    return user;
  }
}
