import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserQuery } from 'src/interfaces/user-query.interface';
export declare class UserService {
    private user_repository;
    constructor(user_repository: Repository<User>);
    find_all(): Promise<User[]>;
    find_by_id(user_id: number): Promise<User>;
    find_by_id_profile(user_id: number): Promise<User>;
    private find_by_id_complete;
    find_by_username(username: string): Promise<User>;
    find_by_email(email: string): Promise<User>;
    find_by_options(query: UserQuery): Promise<User[]>;
    create_user(data: CreateUserDto): Promise<User>;
    update_user(data: UpdateUserDto): Promise<User>;
    delete_user(user_id: number): Promise<User>;
}
