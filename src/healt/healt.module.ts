import { Module } from '@nestjs/common';
import { HealtController } from './healt.controller';
import { HealtService } from './healt.service';

@Module({
  controllers: [HealtController],
  providers: [HealtService],
})
export class HealtModule {}
