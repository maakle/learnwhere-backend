// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import { VoteDto } from './dto/vote.dto';
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

  @Post('vote')
  @UseGuards(JwtAuthenticationGuard)
  vote(
    @Body() voteDto: VoteDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    return this.usersService.vote(voteDto, request, response);
  }
}
