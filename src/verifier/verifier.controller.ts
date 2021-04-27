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
import { VerifierService } from './verifier.service';
import { CreateVerifierDto } from './dto/create-verifier.dto';
import { UpdateVerifierDto } from './dto/update-verifier.dto';

@Controller('verifier')
export class VerifierController {
  constructor(private readonly verifierService: VerifierService) {}

  @Post()
  create(@Body() createVerifierDto: CreateVerifierDto) {
    return this.verifierService.create(createVerifierDto);
  }

  @Get()
  @Render('verifier/index')
  renderVerifier() {
    return this.verifierService.renderVerifier();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verifierService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVerifierDto: UpdateVerifierDto,
  ) {
    return this.verifierService.update(+id, updateVerifierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verifierService.remove(+id);
  }
}
