import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { HealtModule } from '@healt/healt.module';
import { AuthModule } from '@auth/auth.module';
import { ProductsModule } from '@products/product.module';
import { DatabaseModule } from '@shared/infrastructure/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    HealtModule,
    AuthModule,
    ProductsModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      ignoreEnvFile: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
