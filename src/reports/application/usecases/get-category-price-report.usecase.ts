import { Injectable } from '@nestjs/common';

import { ProductRepository } from '@products/domain/repositories/product.repository';

@Injectable()
export class GetCategoryPriceReportUseCase {
  constructor(private readonly productsRepository: ProductRepository) {}

  async run(): Promise<any> {
    const categories = await this.productsRepository.fetchCategories();
    return categories;
  }
}
