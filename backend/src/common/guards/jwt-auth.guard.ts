import { Injectable } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport/dist';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
