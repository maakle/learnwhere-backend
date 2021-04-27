import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IssuerService } from './issuer.service';
import { CreateIssuerDto } from './dto/create-issuer.dto';
import { UpdateIssuerDto } from './dto/update-issuer.dto';

@Controller('issuer')
export class IssuerController {
  constructor(
    private readonly issuerService: IssuerService,
    private configService: ConfigService,
  ) {}

  @Get()
  @Render('issuer/index')
  renderIssuance() {
    return;
  }

  @Post('create')
  create(@Body() createIssuerDto: CreateIssuerDto) {
    return this.issuerService.create(createIssuerDto, this.configService);
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
