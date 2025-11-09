import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { NonDeletedProductsReporFiltersUtil } from '@reports/utils/non-deleted-report-filter.util';
import { ProductsReport } from '@reports/domain/entities/products-report.entity';
import { ProductsReportDto } from '../dtos/products-report.dto';

@Injectable()
export class GetNonDeletedProductsReportUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(filters: ProductsReportDto): Promise<any> {
    const query = NonDeletedProductsReporFiltersUtil.buildMongoQuery(filters);

    const [totalProducts, deletedProducts] = await Promise.all([
      this.productRepository.countDocuments({}),
      this.productRepository.countDocuments({ ...query, deletedAt: null }),
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
