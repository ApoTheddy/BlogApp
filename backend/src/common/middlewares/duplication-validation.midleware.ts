import { Injectable, ConflictException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class DuplicateValidationMiddleware implements NestMiddleware {
  constructor(private readonly user_service: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { username, email } = req.body;

    if (username) {
      const existing_username = await this.user_service.find_by_username(
        username,
      );
      if (existing_username)
        throw new ConflictException('El username ya se encuentra en uso');
    }

    if (email) {
      const existing_email = await this.user_service.find_by_email(email);
      if (existing_email)
        throw new ConflictException('El email ya se encuentra en uso');
    }
    next();
  }
}
