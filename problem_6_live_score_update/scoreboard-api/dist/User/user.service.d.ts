import { IUser } from '.';
export declare class UserService {
    private readonly users;
    private readonly logger;
    constructor();
    private loadUsersFromFile;
    private saveUsersToFile;
    getUser(username: string): IUser;
    addOrUpdateUser(user: IUser): void;
}
