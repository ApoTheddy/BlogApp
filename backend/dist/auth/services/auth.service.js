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
const user_service_1 = require("../../user/services/user.service");
const bcrypt_1 = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = exports.AuthService = class AuthService {
    constructor(user_service, jwt_service) {
        this.user_service = user_service;
        this.jwt_service = jwt_service;
    }
    async sign_in({ email, password }) {
        let user = await this.user_service.find_by_email(email);
        if (!user)
            throw new common_1.NotFoundException('La contrasena o password son incorrectas');
        const check_password = await (0, bcrypt_1.compare)(password, user.password);
        if (!check_password)
            throw new common_1.UnauthorizedException('La contrasena o password son incorrectas');
        const payload = {
            user_id: user.user_id,
        };
        const token = this.jwt_service.sign(payload);
        user = { ...user, password: '' };
        return { user, token };
    }
    async sign_up(data) {
        return this.user_service.create_user(data);
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map