import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { IUser } from '.';
import * as fs from 'fs';

@Injectable()
export class UserService {
  private readonly users: IUser[] = [];
  private readonly logger = new Logger('UserService');

  constructor() {
    this.loadUsersFromFile();
  }

  private loadUsersFromFile(): void {
    try {
      const usersData = fs.readFileSync('users.json', 'utf8');
      if (usersData) this.users.push(...JSON.parse(usersData));
    } catch (error) {
      this.logger.error('loadUsersFromFile', JSON.stringify(error));
      throw new InternalServerErrorException('Oops! something went wrong.');
    }
  }

  private saveUsersToFile(): void {
    fs.writeFileSync('users.json', JSON.stringify(this.users), 'utf8');
  }

  public getUser(username: string) {
    const foundUser = this.users.find((user) => user.username == username);
    return foundUser;
  }

  public addOrUpdateUser(user: IUser): void {
    const foundUser = this.users.find((x) => x.username == user.username);
    if (foundUser) {
      foundUser.password = user.password;
      foundUser.score = user.score;
    } else {
      this.users.push(user);
    }
    this.saveUsersToFile();
  }
}
