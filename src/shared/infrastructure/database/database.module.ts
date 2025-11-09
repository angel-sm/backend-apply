import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseConfig } from './mongo/config/database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const config = getDatabaseConfig();
        return {
          uri: config.uri,
          ...config.options,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
