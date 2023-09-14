"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const type_orm_config_1 = require("./config/type_orm.config");
const user_module_1 = require("./user/user.module");
const post_module_1 = require("./post/post.module");
const duplication_validation_midleware_1 = require("./common/middlewares/duplication-validation.midleware");
const auth_module_1 = require("./auth/auth.module");
const comment_module_1 = require("./comment/comment.module");
const reaction_module_1 = require("./reaction/reaction.module");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(duplication_validation_midleware_1.DuplicateValidationMiddleware)
            .forRoutes({ path: 'users', method: common_1.RequestMethod.POST }, { path: 'users', method: common_1.RequestMethod.PATCH });
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(type_orm_config_1.TypeOrmConfig),
            user_module_1.UserModule,
            post_module_1.PostModule,
            auth_module_1.AuthModule,
            comment_module_1.CommentModule,
            reaction_module_1.ReactionModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map