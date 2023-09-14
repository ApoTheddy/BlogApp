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
exports.DuplicateValidationMiddleware = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/services/user.service");
let DuplicateValidationMiddleware = exports.DuplicateValidationMiddleware = class DuplicateValidationMiddleware {
    constructor(user_service) {
        this.user_service = user_service;
    }
    async use(req, res, next) {
        const { username, email } = req.body;
        if (username) {
            const existing_username = await this.user_service.find_by_username(username);
            if (existing_username)
                throw new common_1.ConflictException('El username ya se encuentra en uso');
        }
        if (email) {
            const existing_email = await this.user_service.find_by_email(email);
            if (existing_email)
                throw new common_1.ConflictException('El email ya se encuentra en uso');
        }
        next();
    }
};
exports.DuplicateValidationMiddleware = DuplicateValidationMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], DuplicateValidationMiddleware);
//# sourceMappingURL=duplication-validation.midleware.js.map