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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("../dto/create-user.dto");
const update_user_dto_1 = require("../dto/update-user.dto");
const user_service_1 = require("../services/user.service");
const swagger_1 = require("@nestjs/swagger");
let UserController = exports.UserController = class UserController {
    constructor(user_service) {
        this.user_service = user_service;
    }
    async find_all() {
        return this.user_service.find_all();
    }
    async find_by_option(username, firstname, lastname) {
        let query = { username, firstname, lastname };
        return this.user_service.find_by_options(query);
    }
    async find_by_id(user_id) {
        return this.user_service.find_by_id(user_id);
    }
    async find_by_id_profile(user_id) {
        return this.user_service.find_by_id_profile(user_id);
    }
    async create_user(data) {
        return this.user_service.create_user(data);
    }
    async update_user(data) {
        return this.user_service.update_user(data);
    }
    async delete_user(user_user_id) {
        return this.user_service.delete_user(user_user_id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find_all", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('username')),
    __param(1, (0, common_1.Query)('firstname')),
    __param(2, (0, common_1.Query)('lastname')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find_by_option", null);
__decorate([
    (0, swagger_1.ApiParam)({ name: 'user_id' }),
    (0, common_1.Get)(':user_id'),
    __param(0, (0, common_1.Param)('user_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find_by_id", null);
__decorate([
    (0, common_1.Get)('/search/:user_id'),
    __param(0, (0, common_1.Param)('user_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "find_by_id_profile", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create_user", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update_user", null);
__decorate([
    (0, common_1.Delete)(':user_id'),
    __param(0, (0, common_1.Param)('user_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "delete_user", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map