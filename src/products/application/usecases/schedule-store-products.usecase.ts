import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { Product } from '@products/domain/entities/product.entity';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { ContentfulRepository } from '@shared/domain/repositories/contenful.repository';

@Injectable()
export class ScheduleStoreProductsUseCase {
  private readonly logger = new Logger(ScheduleStoreProductsUseCase.name);

  constructor(
    private readonly contentfulRepository: ContentfulRepository,
    private readonly productsRepository: ProductRepository,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async run() {
    try {
      const contentfulResponse =
        await this.contentfulRepository.fetchProducts();

      const products = contentfulResponse.map((data) =>
        Product.create({
          id: data.sys.id,
          sku: data.fields.sku,
          name: data.fields.name,
          brand: data.fields.brand,
          model: data.fields.model,
          category: data.fields.category,
          price: data.fields.price,
          currency: data.fields.currency,
          color: data.fields.color,
          stock: data.fields.stock,
          createdAt: data.sys.createdAt,
          updatedAt: data.sys.updatedAt,
          deletedAt: null,
        }),
      );

      await this.productsRepository.saveProducts(products);
      this.logger.log('Products stored successfully');
    } catch (error) {
      this.logger.error('Failed to store products:', error);
      throw error;
    }
  }
}
