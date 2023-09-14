import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { hash } from 'bcrypt';
import { UserQuery } from 'src/interfaces/user-query.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private user_repository: Repository<User>,
  ) {}

  async find_all(): Promise<User[]> {
    /* 
      return all users of the database while their status is 'active'
      
      STATUS TYPES:
        - active
        - inactive
    */
    return this.user_repository.find({ where: { status: 'active' } });
  }

  async find_by_id(user_id: number): Promise<User> {
    let user = await this.find_by_id_complete(user_id);
    let data: User = { ...user, password: '', email: '' };
    return data;
  }

  async find_by_id_profile(user_id: number): Promise<User> {
    let user = await this.find_by_id_complete(user_id);
    return user;
  }

  private async find_by_id_complete(user_id: number) {
    let user = await this.user_repository.findOne({
      where: { user_id, status: 'active' },
    });

    if (!user)
      throw new NotFoundException(
        `No se encontro el usuario con el ID ${user_id}`,
      );

    return user;
  }

  async find_by_username(username: string): Promise<User> {
    return await this.user_repository.findOne({
      where: { username, status: 'active' },
    });
  }

  async find_by_email(email: string): Promise<User> {
    return await this.user_repository.findOne({
      where: { email, status: 'active' },
    });
  }

  async find_by_options(query: UserQuery): Promise<User[]> {
    let where_clause: FindManyOptions<User> = {};
    Object.keys(query).forEach((key) => {
      if (query[key]) where_clause.where = { [key]: Like(`%${query[key]}%`) };
    });

    return this.user_repository.find(where_clause);
  }

  async create_user(data: CreateUserDto): Promise<User> {
    data.password = await hash(data.password, 10);
    data.career = data.career.toUpperCase();
    let new_user = this.user_repository.create(data);
    return await this.user_repository.save(new_user);
  }

  async update_user(data: UpdateUserDto) {
    /*
      We verify if the user_id extract the data exist in my database
    */
    let user: User = await this.find_by_id(data.user_id);

    if (!user)
      throw new NotFoundException(
        'El usuario a actualizar no existe en la base de datos',
      );

    /*
      We replace the old information(user) with the new past information(data)
    */
    Object.assign(user, data);
    return await this.user_repository.save(user);
  }

  async delete_user(user_id: number): Promise<User> {
    let user = await this.find_by_id(user_id);
    user.status = 'inactive';
    return await this.user_repository.save(user);
  }
}
