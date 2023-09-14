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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../../user/services/user.service");
const post_entity_1 = require("../entities/post.entity");
const comment_service_1 = require("../../comment/comment.service");
let PostService = exports.PostService = class PostService {
    constructor(post_repository, user_service, comment_service) {
        this.post_repository = post_repository;
        this.user_service = user_service;
        this.comment_service = comment_service;
    }
    async find_all({ skip, take }) {
        let posts = await this.post_repository
            .createQueryBuilder('p')
            .leftJoinAndSelect('p.user', 'pu')
            .select([
            'p',
            'pu.user_id',
            'pu.username',
            'pu.profile_image',
            'pu.career',
        ])
            .where('p.status =:status', { status: 'active' })
            .offset(skip)
            .limit(take)
            .getMany();
        return posts;
    }
    async find_posts_by_user_id(user_id, { skip, take }) {
        let user = await this.user_service.find_by_id(user_id);
        let posts = await this.post_repository.find({
            where: { user: { user_id: user.user_id }, status: "active" },
            skip,
            take,
        });
        return posts;
    }
    async create_post(create_post_dto) {
        const user = await this.user_service.find_by_id(create_post_dto.user_id);
        let new_post = this.post_repository.create(create_post_dto);
        new_post.type_publication = create_post_dto.image ? 'text-image' : 'text';
        new_post.user = user;
        return await this.post_repository.save(new_post);
    }
    async find_by_id(post_id) {
        const post = await this.post_repository.findOne({ where: { post_id } });
        if (!post)
            throw new common_1.NotFoundException(`El post con el ID ${post_id} no existe`);
        return post;
    }
    async delete_post(post_id) {
        const post = await this.find_by_id(post_id);
        post.status = 'inactive';
        return this.post_repository.save(post);
    }
};
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => comment_service_1.CommentService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        comment_service_1.CommentService])
], PostService);
//# sourceMappingURL=post.service.js.map