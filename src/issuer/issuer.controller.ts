import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssuerService } from './issuer.service';
import { CreateIssuerDto } from './dto/create-issuer.dto';
import { UpdateIssuerDto } from './dto/update-issuer.dto';

@Controller('issuer')
export class IssuerController {
  constructor(private readonly issuerService: IssuerService) {}

  @Post()
  create(@Body() createIssuerDto: CreateIssuerDto) {
    return this.issuerService.create(createIssuerDto);
  }

  @Get()
  findAll() {
    return this.issuerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssuerDto: UpdateIssuerDto) {
    return this.issuerService.update(+id, updateIssuerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuerService.remove(+id);
  }
}
