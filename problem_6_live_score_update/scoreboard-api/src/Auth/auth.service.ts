import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { IUser } from '../User';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/user.service';

@Injectable()
export class AuthService {
  private readonly secretKey: string = '99_tech_is_awesome';

  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  private composeToken(user: IUser): string {
    delete user.password;
    return this.jwtService.sign(user, { secret: this.secretKey });
  }

  public async register(username: string, password: string): Promise<void> {
    if (!username || !password)
      throw new BadRequestException('username and password are required!');

    const existingUser = this.userService.getUser(username);
    if (existingUser)
      throw new BadRequestException(`${username} is already registered!`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: IUser = { username, password: hashedPassword, score: 0 };
    this.userService.addOrUpdateUser(newUser);
  }

  public async login(
    username: string,
    password: string,
  ): Promise<{ token: string }> {
    if (!username || !password)
      throw new BadRequestException('username and password are required!');

    const user = this.userService.getUser(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('username or password is incorrect!');
    }

    return {
      token: this.composeToken(user),
    };
  }

  public async validateUser(token: string): Promise<IUser> {
    const decoded = this.jwtService.verify(token, { secret: this.secretKey });
    const username = decoded.username;
    const user = this.userService.getUser(username);
    if (user) {
      return {
        username: user.username,
        score: user.score,
      };
    }
    throw new UnauthorizedException('Unauthorized!');
  }
}
