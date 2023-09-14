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
exports.ReactionController = void 0;
const common_1 = require("@nestjs/common");
const reaction_service_1 = require("../services/reaction.service");
const create_reaction_dto_1 = require("../dto/create-reaction.dto");
let ReactionController = exports.ReactionController = class ReactionController {
    constructor(reaction_service) {
        this.reaction_service = reaction_service;
    }
    find_by_id(reaction_id) {
        return this.reaction_service.find_by_id(reaction_id);
    }
    find_all_reactions_by_post(post_id) {
        return this.reaction_service.find_all_reactions_by_post(post_id);
    }
    add_reaction(createReactionDto) {
        return this.reaction_service.add_reaction(createReactionDto);
    }
    delete_reaction(reaction_id) {
        return this.reaction_service.delete_reaction(reaction_id);
    }
};
__decorate([
    (0, common_1.Get)(':reaction_id'),
    __param(0, (0, common_1.Param)('reaction_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "find_by_id", null);
__decorate([
    (0, common_1.Get)('/search/:post_id'),
    __param(0, (0, common_1.Param)('post_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "find_all_reactions_by_post", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reaction_dto_1.CreateReactionDto]),
    __metadata("design:returntype", Promise)
], ReactionController.prototype, "add_reaction", null);
__decorate([
    (0, common_1.Delete)(':reaction_id'),
    __param(0, (0, common_1.Param)('reaction_id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ReactionController.prototype, "delete_reaction", null);
exports.ReactionController = ReactionController = __decorate([
    (0, common_1.Controller)('reactions'),
    __metadata("design:paramtypes", [reaction_service_1.ReactionService])
], ReactionController);
//# sourceMappingURL=reaction.controller.js.map