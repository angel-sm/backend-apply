import { Module } from '@nestjs/common';
import { HealtModule } from './healt/healt.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [HealtModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
