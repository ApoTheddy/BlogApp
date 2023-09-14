import { AuthService } from '../services/auth.service';
import { SignInDto } from '../dto/sign-in.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class AuthController {
    private readonly auth_service;
    constructor(auth_service: AuthService);
    sign_in(data: SignInDto): Promise<{}>;
    sign_up(data: CreateUserDto): Promise<User>;
}
