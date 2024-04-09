import {
  Body,
  Controller,
  Get,
  Headers,
  Put,
  UnauthorizedException,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './Auth/auth.service';
import { IUser } from './User';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Put('update')
  public async updateScore(
    @Headers('authorization') authorizationHeader: string,
    @Body('score') newScore: number,
  ): Promise<IUser> {
    const token = this.extractToken(authorizationHeader);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.authService.validateUser(token);

    return this.appService.updateScore(user.username, newScore);
  }

  @Get('getScore')
  public async getScore(
    @Headers('authorization') authorizationHeader: string,
  ): Promise<IUser> {
    const token = this.extractToken(authorizationHeader);
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await this.authService.validateUser(token);

    return this.appService.getScore(user.username);
  }

  private extractToken(authorizationHeader: string): string | null {
    if (!authorizationHeader) {
      return null;
    }
    const parts = authorizationHeader.split(' ');
    if (parts.length !== 2 || parts[0].toLowerCase() !== 'bearer') {
      return null;
    }
    return parts[1];
  }
}
