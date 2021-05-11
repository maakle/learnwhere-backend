// eslint-disable-next-line prettier/prettier
import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express, Response } from 'express';

import JwtAuthenticationGuard from '../auth/jwt-authentication.guard';
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

  @Get('ranking/top-subs')
  async topSubs(@Res() response: Response) {
    return this.subsService.topSubs(response);
  }

  @Post(':name/sub-image')
  @UseGuards(JwtAuthenticationGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadSubImage(
    @Param('name') name: string,
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.subsService.uploadSubImage(
      name,
      file.buffer,
      file.originalname,
    );
  }
}
