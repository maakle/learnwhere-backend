import { Body, Controller, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  createUser(@Req() @Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }
}
