import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(
    @Body() { username, password }: { username: string; password: string },
  ): Promise<void> {
    return await this.authService.register(username, password);
  }

  @Post('login')
  public async login(
    @Body() { username, password }: { username: string; password: string },
  ): Promise<{ token: string }> {
    return await this.authService.login(username, password);
  }
}
