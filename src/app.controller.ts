import { Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async hello() {
    return 'Never stop learning. ;) ';
  }
}
