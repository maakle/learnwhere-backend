import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':username')
  getUserSubmissions(
    @Param('username') username: string,
    @Res() response: Response,
  ) {
    return this.usersService.getUserSubmissions(username, response);
  }
}
