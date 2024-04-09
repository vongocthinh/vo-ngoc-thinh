import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register({ username, password }: {
        username: string;
        password: string;
    }): Promise<void>;
    login({ username, password }: {
        username: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
}
