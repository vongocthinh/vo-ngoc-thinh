"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
let UserService = class UserService {
    constructor() {
        this.users = [];
        this.logger = new common_1.Logger('UserService');
        this.loadUsersFromFile();
    }
    loadUsersFromFile() {
        try {
            const usersData = fs.readFileSync('users.json', 'utf8');
            if (usersData)
                this.users.push(...JSON.parse(usersData));
        }
        catch (error) {
            this.logger.error('loadUsersFromFile', JSON.stringify(error));
            throw new common_1.InternalServerErrorException('Oops! something went wrong.');
        }
    }
    saveUsersToFile() {
        fs.writeFileSync('users.json', JSON.stringify(this.users), 'utf8');
    }
    getUser(username) {
        const foundUser = this.users.find((user) => user.username == username);
        return foundUser;
    }
    addOrUpdateUser(user) {
        const foundUser = this.users.find((x) => x.username == user.username);
        if (foundUser) {
            foundUser.password = user.password;
            foundUser.score = user.score;
        }
        else {
            this.users.push(user);
        }
        this.saveUsersToFile();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], UserService);
//# sourceMappingURL=user.service.js.map