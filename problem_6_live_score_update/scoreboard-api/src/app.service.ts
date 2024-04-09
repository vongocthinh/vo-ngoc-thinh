import { Injectable } from '@nestjs/common';
import { UserService } from './User/user.service';
import { IUser } from './User';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  public updateScore(username: string, newScore: number): IUser {
    const userModel: IUser = {
      username,
      score: newScore,
    };
    this.userService.addOrUpdateUser(userModel);
    return userModel;
  }

  public getScore(username: string): IUser {
    return this.userService.getUser(username);
  }
}
