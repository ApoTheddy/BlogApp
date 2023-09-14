"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactionModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const post_module_1 = require("../post/post.module");
const user_module_1 = require("../user/user.module");
const reaction_entity_1 = require("./entities/reaction.entity");
const post_entity_1 = require("../post/entities/post.entity");
const user_entity_1 = require("../user/entities/user.entity");
const reaction_service_1 = require("./services/reaction.service");
const reaction_controller_1 = require("./controllers/reaction.controller");
let ReactionModule = exports.ReactionModule = class ReactionModule {
};
exports.ReactionModule = ReactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([reaction_entity_1.Reaction, user_entity_1.User, post_entity_1.Post]),
            post_module_1.PostModule,
            user_module_1.UserModule,
        ],
        providers: [reaction_service_1.ReactionService],
        controllers: [reaction_controller_1.ReactionController],
    })
], ReactionModule);
//# sourceMappingURL=reaction.module.js.map