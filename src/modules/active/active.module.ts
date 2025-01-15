import { Module } from '@nestjs/common';
import { ActiveController } from './active.controller';
import { ActiveRepository } from './active.repository';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [ActiveController],
  providers: [ActiveRepository]
})
export class ActiveModule { }
