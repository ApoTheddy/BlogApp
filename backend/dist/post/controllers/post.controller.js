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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const post_service_1 = require("../services/post.service");
const create_post_dto_1 = require("../dto/create-post.dto");
const find_post_query_dto_1 = require("../dto/find-post-query.dto");
let PostController = exports.PostController = class PostController {
    constructor(post_service) {
        this.post_service = post_service;
    }
    find_all(skip, take) {
        let findPostDto = new find_post_query_dto_1.FindPostDto(0, 10);
        if (skip)
            findPostDto.skip = skip >= 0 ? skip : 0;
        if (take)
            findPostDto.take = take >= 0 ? take : 5;
        return this.post_service.find_all(findPostDto);
    }
    find_by_id(post_id) {
        return this.post_service.find_by_id(post_id);
    }
    find_posts_by_user_id(user_id, skip, take) {
        let findPostDto = new find_post_query_dto_1.FindPostDto(0, 10);
        if (skip)
            findPostDto.skip = skip >= 0 ? skip : 0;
        if (take)
            findPostDto.take = take >= 0 ? take : 5;
        return this.post_service.find_posts_by_user_id(user_id, findPostDto);
    }
    create_post(create_post_dto) {
        return this.post_service.create_post(create_post_dto);
    }
    delete_post(post_id) {
        return this.post_service.delete_post(post_id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "find_all", null);
__decorate([
    (0, common_1.Get)(':post_id'),
    __param(0, (0, common_1.Param)('post_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "find_by_id", null);
__decorate([
    (0, common_1.Get)('/search/:user_id'),
    __param(0, (0, common_1.Param)('user_id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('take')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "find_posts_by_user_id", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_dto_1.CreatePostDto]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "create_post", null);
__decorate([
    (0, common_1.Delete)(':post_id'),
    __param(0, (0, common_1.Param)('post_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "delete_post", null);
exports.PostController = PostController = __decorate([
    (0, swagger_1.ApiTags)('Posts'),
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map