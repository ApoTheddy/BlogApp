import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';
export declare class UserController {
    private readonly user_service;
    constructor(user_service: UserService);
    find_all(): Promise<User[]>;
    find_by_option(username: string, firstname: string, lastname: string): Promise<User[]>;
    find_by_id(user_id: number): Promise<User>;
    find_by_id_profile(user_id: number): Promise<User>;
    create_user(data: CreateUserDto): Promise<User>;
    update_user(data: UpdateUserDto): Promise<User>;
    delete_user(user_user_id: number): Promise<User>;
}
