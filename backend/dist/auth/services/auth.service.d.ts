import { UserService } from 'src/user/services/user.service';
import { SignInDto } from '../dto/sign-in.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly user_service;
    private readonly jwt_service;
    constructor(user_service: UserService, jwt_service: JwtService);
    sign_in({ email, password }: SignInDto): Promise<{}>;
    sign_up(data: CreateUserDto): Promise<User>;
}
