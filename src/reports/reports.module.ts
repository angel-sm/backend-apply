import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductMongooseSchema } from '@shared/infrastructure/database/mongo/schemas';
import { AuthModule } from '@auth/auth.module';
import { AuthGuard } from '@shared/infrastructure/guards/auth.guard';
import { GetDeletedProductsReportUseCase } from './application/usecases/get-deleted-products-report.usecase';
import { GetNonDeletedProductsReportUseCase } from './application/usecases/get-non-deleted-products-report.usecase';
import { GetCategoryPriceReportUseCase } from './application/usecases/get-category-price-report.usecase';
import { GetCategoryPriceReportController } from './infrastructure/api/v1/get-category-price-report.controller';
import { GetDeletedProductsReportController } from './infrastructure/api/v1/get-deleted-products-report.controller';
import { GetNonDeletedProductsReportController } from './infrastructure/api/v1/get-non-deleted-products-report.controller';
import { ProductsModule } from '@products/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'products',
        schema: ProductMongooseSchema,
      },
    ]),
    AuthModule,
    ProductsModule,
  ],
  controllers: [
    GetCategoryPriceReportController,
    GetDeletedProductsReportController,
    GetNonDeletedProductsReportController,
  ],
  providers: [
    GetDeletedProductsReportUseCase,
    GetNonDeletedProductsReportUseCase,
    GetCategoryPriceReportUseCase,
    AuthGuard,
  ],
  exports: [],
})
export class ReportsModule {}
