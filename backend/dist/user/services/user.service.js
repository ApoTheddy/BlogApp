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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
let UserService = exports.UserService = class UserService {
    constructor(user_repository) {
        this.user_repository = user_repository;
    }
    async find_all() {
        return this.user_repository.find({ where: { status: 'active' } });
    }
    async find_by_id(user_id) {
        let user = await this.find_by_id_complete(user_id);
        let data = { ...user, password: '', email: '' };
        return data;
    }
    async find_by_id_profile(user_id) {
        let user = await this.find_by_id_complete(user_id);
        return user;
    }
    async find_by_id_complete(user_id) {
        let user = await this.user_repository.findOne({
            where: { user_id, status: 'active' },
        });
        if (!user)
            throw new common_1.NotFoundException(`No se encontro el usuario con el ID ${user_id}`);
        return user;
    }
    async find_by_username(username) {
        return await this.user_repository.findOne({
            where: { username, status: 'active' },
        });
    }
    async find_by_email(email) {
        return await this.user_repository.findOne({
            where: { email, status: 'active' },
        });
    }
    async find_by_options(query) {
        let where_clause = {};
        Object.keys(query).forEach((key) => {
            if (query[key])
                where_clause.where = { [key]: (0, typeorm_1.Like)(`%${query[key]}%`) };
        });
        return this.user_repository.find(where_clause);
    }
    async create_user(data) {
        data.password = await (0, bcrypt_1.hash)(data.password, 10);
        data.career = data.career.toUpperCase();
        let new_user = this.user_repository.create(data);
        return await this.user_repository.save(new_user);
    }
    async update_user(data) {
        let user = await this.find_by_id(data.user_id);
        if (!user)
            throw new common_1.NotFoundException('El usuario a actualizar no existe en la base de datos');
        Object.assign(user, data);
        return await this.user_repository.save(user);
    }
    async delete_user(user_id) {
        let user = await this.find_by_id(user_id);
        user.status = 'inactive';
        return await this.user_repository.save(user);
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map