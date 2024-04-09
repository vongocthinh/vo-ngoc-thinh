import { AppService } from './app.service';
import { AuthService } from './Auth/auth.service';
import { IUser } from './User';
export declare class AppController {
    private readonly appService;
    private readonly authService;
    constructor(appService: AppService, authService: AuthService);
    getHello(): string;
    updateScore(authorizationHeader: string, newScore: number): Promise<IUser>;
    getScore(authorizationHeader: string): Promise<IUser>;
    private extractToken;
}
