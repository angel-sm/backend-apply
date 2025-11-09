import { Injectable } from '@nestjs/common';
import { ProductsReport } from '@reports/domain/entities/products-report.entity';
import { ProductRepository } from '@products/domain/repositories/product.repository';

@Injectable()
export class GetDeletedProductsReportUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(): Promise<ProductsReport> {
    const [totalProducts, deletedProducts] = await Promise.all([
      this.productRepository.countDocuments({}),
      this.productRepository.countDocuments({ deletedAt: null }),
    ]);

    const activeProducts = totalProducts - deletedProducts;

    const report = ProductsReport.create({
      totalProducts,
      deletedProducts,
      activeProducts,
    });

    return report;
  }
}
