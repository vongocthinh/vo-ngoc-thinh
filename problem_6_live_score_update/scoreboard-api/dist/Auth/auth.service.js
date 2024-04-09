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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../User/user.service");
let AuthService = class AuthService {
    constructor(jwtService, userService) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.secretKey = '99_tech_is_awesome';
    }
    composeToken(user) {
        delete user.password;
        return this.jwtService.sign(user, { secret: this.secretKey });
    }
    async register(username, password) {
        if (!username || !password)
            throw new common_1.BadRequestException('username and password are required!');
        const existingUser = this.userService.getUser(username);
        if (existingUser)
            throw new common_1.BadRequestException(`${username} is already registered!`);
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { username, password: hashedPassword, score: 0 };
        this.userService.addOrUpdateUser(newUser);
    }
    async login(username, password) {
        if (!username || !password)
            throw new common_1.BadRequestException('username and password are required!');
        const user = this.userService.getUser(username);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('username or password is incorrect!');
        }
        return {
            token: this.composeToken(user),
        };
    }
    async validateUser(token) {
        const decoded = this.jwtService.verify(token, { secret: this.secretKey });
        const username = decoded.username;
        const user = this.userService.getUser(username);
        if (user) {
            return {
                username: user.username,
                score: user.score,
            };
        }
        throw new common_1.UnauthorizedException('Unauthorized!');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        user_service_1.UserService])
], AuthService);
//# sourceMappingURL=auth.service.js.map