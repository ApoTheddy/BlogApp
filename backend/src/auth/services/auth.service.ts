import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { SignInDto } from '../dto/sign-in.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly user_service: UserService,
    private readonly jwt_service: JwtService,
  ) {}

  async sign_in({ email, password }: SignInDto): Promise<{}> {
    let user = await this.user_service.find_by_email(email);
    if (!user)
      throw new NotFoundException('La contrasena o password son incorrectas');

    const check_password = await compare(password, user.password);

    if (!check_password)
      throw new UnauthorizedException(
        'La contrasena o password son incorrectas',
      );

    const payload = {
      user_id: user.user_id,
    };

    const token = this.jwt_service.sign(payload);
    user = { ...user, password: '' };
    return { user, token };
  }

  async sign_up(data: CreateUserDto): Promise<User> {
    return this.user_service.create_user(data);
  }
}
