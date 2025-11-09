import { Injectable, Logger } from '@nestjs/common';

import { Product } from '@products/domain/entities/product.entity';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { ContentfulRepository } from '@shared/domain/repositories/contenful.repository';

export interface SyncProductsResult {
  success: boolean;
  productsCount: number;
  message: string;
}

@Injectable()
export class SyncProductsFromContentfulUseCase {
  private readonly logger = new Logger(SyncProductsFromContentfulUseCase.name);

  constructor(
    private readonly contentfulRepository: ContentfulRepository,
    private readonly productsRepository: ProductRepository,
  ) {}

  async run(): Promise<SyncProductsResult> {
    try {
      this.logger.log('Starting Contentful product synchronization...');

      const contentfulResponse = await this.contentfulRepository.fetchProducts();

      if (!contentfulResponse || contentfulResponse.length === 0) {
        this.logger.warn('No products found in Contentful');
        return {
          success: true,
          productsCount: 0,
          message: 'No products found in Contentful',
        };
      }

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

      this.logger.log(`Successfully synchronized ${products.length} products from Contentful`);

      return {
        success: true,
        productsCount: products.length,
        message: `Successfully synchronized ${products.length} products from Contentful`,
      };
    } catch (error: unknown) {
      this.logger.error('Failed to sync products from Contentful:', error);
      throw error;
    }
  }
}
