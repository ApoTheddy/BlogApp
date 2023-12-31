"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModule = void 0;
const common_1 = require("@nestjs/common");
const post_service_1 = require("./services/post.service");
const post_controller_1 = require("./controllers/post.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const user_module_1 = require("../user/user.module");
const comment_entity_1 = require("../comment/comment.entity");
const post_entity_1 = require("./entities/post.entity");
const comment_module_1 = require("../comment/comment.module");
let PostModule = exports.PostModule = class PostModule {
};
exports.PostModule = PostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post, user_entity_1.User, comment_entity_1.Comment]),
            user_module_1.UserModule,
            (0, common_1.forwardRef)(() => comment_module_1.CommentModule),
        ],
        providers: [post_service_1.PostService],
        controllers: [post_controller_1.PostController],
        exports: [post_service_1.PostService],
    })
], PostModule);
//# sourceMappingURL=post.module.js.map