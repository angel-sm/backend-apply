import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@products/domain/repositories/product.repository';
import { ProductFilters } from '@products/utils/product-filters.util';
import { PrimitiveProduct } from '@products/domain/entities/product.entity';
import { PaginatedResult, Pagination } from '@shared/utils/pagination.util';

@Injectable()
export class SearchProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(filters: ProductFilters, pagination: Pagination): Promise<PaginatedResult<PrimitiveProduct>> {
    const result = await this.productRepository.searchProducts(filters, pagination);
    return result;
  }
}
