import { IUser } from '../User';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/User/user.service';
export declare class AuthService {
    private readonly jwtService;
    private readonly userService;
    private readonly secretKey;
    constructor(jwtService: JwtService, userService: UserService);
    private composeToken;
    register(username: string, password: string): Promise<void>;
    login(username: string, password: string): Promise<{
        token: string;
    }>;
    validateUser(token: string): Promise<IUser>;
}
