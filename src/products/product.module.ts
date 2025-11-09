import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, ProductMongooseSchema } from '@shared/infrastructure/database/mongo/schemas';

import { MongoProductsRepository } from '@products/infrastructure/repositories/mongo-products.repository';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { ContentfulRepository } from '@shared/domain/repositories/contenful.repository';
import { ContentfulRepositoryImpl } from '@shared/infrastructure/clients/contenful/repositories/contentful.repository.impl';

import { SearchProductsController } from '@products/infrastructure/api/v1/controllers/search-products.controller';
import { DeleteProductController } from '@products/infrastructure/api/v1/controllers/delete-product.controller';
import { SyncProductsController } from '@products/infrastructure/api/v1/controllers/sync-products.controller';

import { DeleteProductsUseCase } from '@products/application/usecases/delete-product.usecase';
import { SearchProductsUseCase } from '@products/application/usecases/search-products.usecase';
import { ScheduleStoreProductsUseCase } from '@products/application/usecases/schedule-store-products.usecase';
import { SyncProductsFromContentfulUseCase } from '@products/application/usecases/sync-products-from-contentful.usecase';

import { AuthModule } from '@auth/auth.module';
import { AuthGuard } from '@shared/infrastructure/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductSchema.name,
        schema: ProductMongooseSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [SearchProductsController, DeleteProductController, SyncProductsController],
  providers: [
    {
      provide: ProductRepository,
      useClass: MongoProductsRepository,
    },
    {
      provide: ContentfulRepository,
      useClass: ContentfulRepositoryImpl,
    },
    ScheduleStoreProductsUseCase,
    SearchProductsUseCase,
    DeleteProductsUseCase,
    SyncProductsFromContentfulUseCase,
    AuthGuard,
  ],
  exports: [ProductRepository],
})
export class ProductsModule {}
