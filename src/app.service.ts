import { Injectable } from '@nestjs/common';

type HelloWorldType = {
  message: string;
};

@Injectable()
export class AppService {
  getHello(): HelloWorldType {
    return { message: 'Hello world!' };
  }
}
