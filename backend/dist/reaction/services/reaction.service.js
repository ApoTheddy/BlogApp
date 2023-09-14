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
exports.ReactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const reaction_entity_1 = require("../entities/reaction.entity");
const typeorm_2 = require("typeorm");
const user_service_1 = require("../../user/services/user.service");
const post_service_1 = require("../../post/services/post.service");
let ReactionService = exports.ReactionService = class ReactionService {
    constructor(reaction_repository, user_service, post_service) {
        this.reaction_repository = reaction_repository;
        this.user_service = user_service;
        this.post_service = post_service;
    }
    async add_reaction(createReactionDto) {
        let user = await this.user_service.find_by_id(createReactionDto.user_id);
        let post = await this.post_service.find_by_id(createReactionDto.post_id);
        let new_reaction = this.reaction_repository.create();
        new_reaction.user = user;
        new_reaction.post = post;
        return await this.reaction_repository.save(new_reaction);
    }
    async find_by_id(reaction_id) {
        let reaction = await this.reaction_repository.findOne({
            where: { reaction_id },
        });
        if (!reaction)
            throw new common_1.NotFoundException('La reaccion no existe');
        return reaction;
    }
    async find_reaction_by_post_id(post_id) {
        let reaction = await this.reaction_repository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.user', 'ru')
            .leftJoinAndSelect('r.post', 'rp')
            .select(['r', 'ru.user_id'])
            .where('rp.post_id =:post_id', { post_id })
            .getOne();
        return reaction;
    }
    async find_all_reactions_by_post(post_id) {
        let reactions = await this.reaction_repository
            .createQueryBuilder('r')
            .leftJoinAndSelect('r.post', 'rp')
            .leftJoinAndSelect('r.user', 'ru')
            .where('rp.post_id =:post_id', { post_id })
            .select(['r', 'ru.user_id'])
            .getMany();
        return reactions;
    }
    async delete_reaction(reaction_id) {
        let reaction = await this.find_by_id(reaction_id);
        return await this.reaction_repository.remove(reaction);
    }
};
exports.ReactionService = ReactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(reaction_entity_1.Reaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        user_service_1.UserService,
        post_service_1.PostService])
], ReactionService);
//# sourceMappingURL=reaction.service.js.map