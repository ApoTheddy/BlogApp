import {
  Controller,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Post,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserService } from '../services/user.service';
import { UserQuery } from 'src/interfaces/user-query.interface';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly user_service: UserService) {}

  @Get()
  async find_all(): Promise<User[]> {
    return this.user_service.find_all();
  }

  @Get('search')
  async find_by_option(
    @Query('username') username: string,
    @Query('firstname') firstname: string,
    @Query('lastname') lastname: string,
  ): Promise<User[]> {
    let query: UserQuery = { username, firstname, lastname };
    return this.user_service.find_by_options(query);
  }

  @ApiParam({ name: 'user_id' })
  @Get(':user_id')
  async find_by_id(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<User> {
    return this.user_service.find_by_id(user_id);
  }

  @Get('/search/:user_id')
  async find_by_id_profile(
    @Param('user_id', ParseIntPipe) user_id: number,
  ): Promise<User> {
    return this.user_service.find_by_id_profile(user_id);
  }

  @Post()
  async create_user(@Body() data: CreateUserDto) {
    return this.user_service.create_user(data);
  }

  @Patch()
  async update_user(@Body() data: UpdateUserDto) {
    return this.user_service.update_user(data);
  }

  @Delete(':user_id')
  async delete_user(
    @Param('user_id', ParseIntPipe) user_user_id: number,
  ): Promise<User> {
    return this.user_service.delete_user(user_user_id);
  }
}
