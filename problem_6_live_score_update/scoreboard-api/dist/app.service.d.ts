import { UserService } from './User/user.service';
import { IUser } from './User';
export declare class AppService {
    private readonly userService;
    constructor(userService: UserService);
    getHello(): string;
    updateScore(username: string, newScore: number): IUser;
    getScore(username: string): IUser;
}
