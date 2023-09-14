import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly auth_service: AuthService) {}

  @Post('login')
  async sign_in(@Body() data: SignInDto): Promise<{}> {
    return this.auth_service.sign_in(data);
  }

  @Post('register')
  async sign_up(@Body() data: CreateUserDto): Promise<User> {
    return this.auth_service.sign_up(data);
  }
}
