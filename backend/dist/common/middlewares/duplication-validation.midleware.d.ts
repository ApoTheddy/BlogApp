import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/services/user.service';
export declare class DuplicateValidationMiddleware implements NestMiddleware {
    private readonly user_service;
    constructor(user_service: UserService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
