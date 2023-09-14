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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const comment_entity_1 = require("./comment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_service_1 = require("../post/services/post.service");
const user_service_1 = require("../user/services/user.service");
let CommentService = exports.CommentService = class CommentService {
    constructor(comment_repository, post_service, user_service) {
        this.comment_repository = comment_repository;
        this.post_service = post_service;
        this.user_service = user_service;
    }
    find_all() {
        return this.comment_repository
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.user', 'u')
            .select(['c.content', 'u.username', 'u.profile_image'])
            .where('c.status = :status', { status: 'active' })
            .getMany();
    }
    async find_by_post_id(post_id, { skip, take }) {
        let request = this.comment_repository
            .createQueryBuilder('c')
            .leftJoinAndSelect('c.user', 'u')
            .select(['c.content', 'u.username', 'u.profile_image'])
            .where('c.status =:status AND c.post_id =:post_id', {
            status: 'active',
            post_id,
        })
            .orderBy('c.comment_id', 'DESC');
        let [allComments, comments] = await Promise.all([
            request.getMany(),
            request.offset(skip).limit(take).getMany(),
        ]);
        return { total_comments: allComments.length, comments };
    }
    async add_comment(create_comment_dto) {
        let post = await this.post_service.find_by_id(create_comment_dto.post_id);
        let user = await this.user_service.find_by_id(create_comment_dto.author_id);
        let new_comment = this.comment_repository.create(create_comment_dto);
        new_comment.user = user;
        new_comment.post = post;
        return await this.comment_repository.save(new_comment);
    }
};
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => post_service_1.PostService))),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        post_service_1.PostService,
        user_service_1.UserService])
], CommentService);
//# sourceMappingURL=comment.service.js.map