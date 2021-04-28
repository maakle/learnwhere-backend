import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { IssuerService } from './issuer.service';
import { CreateIssuerDto } from './dto/create-issuer.dto';
import { UpdateIssuerDto } from './dto/update-issuer.dto';

@Controller('issuer')
export class IssuerController {
  constructor(private readonly issuerService: IssuerService) {}

  @Get()
  @Render('issuer/index')
  renderIssuance() {
    return;
  }

  @Get('create-request')
  create(@Req() request: Request) {
    return this.issuerService.createIssueRequest(request);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.issuerService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateIssuerDto: UpdateIssuerDto) {
  //   return this.issuerService.update(+id, updateIssuerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.issuerService.remove(+id);
  // }
}
