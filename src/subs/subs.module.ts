import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';
import Sub from './entities/sub.entity';
import { SubsController } from './subs.controller';
import { SubsService } from './subs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sub]), DatabaseModule],
  providers: [SubsService],
  controllers: [SubsController],
})
export class SubsModule {}
