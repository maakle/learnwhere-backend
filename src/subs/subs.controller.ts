// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import JwtAuthenticationGuard from '../../dist/src/auth/jwt-authentication.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import NewSubDto from './dto/new-sub.dto';
import { SubsService } from './subs.service';

@Controller('subs')
export class SubsController {
  constructor(private readonly subsService: SubsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post('create')
  async createSub(
    @Req() request: RequestWithUser,
    @Res() response: Response,
    @Body() newSubData: NewSubDto,
  ) {
    return this.subsService.createSub(request, response, newSubData);
  }

  @Get(':name')
  async getSub(
    @Param('name') name: string,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    return this.subsService.getSub(name, request, response);
  }

  @Get('search/:name')
  async searchSubs(@Param('name') name: string, @Res() response: Response) {
    return this.subsService.searchSubs(name, response);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post(':name/image')
  async uploadSubImage(
    @Param('name') name: string,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    return this.subsService.uploadSubImage(request, response);
  }
}
