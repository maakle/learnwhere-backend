import { Controller } from '@nestjs/common';
import { Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('/')
  async hello() {
    return 'Never stop learning. ;) ';
  }
}
