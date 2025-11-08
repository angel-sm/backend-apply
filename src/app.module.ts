import { Module } from '@nestjs/common';
import { HealtModule } from './healt/healt.module';

@Module({
  imports: [HealtModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
