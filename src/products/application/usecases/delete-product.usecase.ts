import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@products/domain/repositories/product.repository';

@Injectable()
export class DeleteProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async run(id: string): Promise<void> {
    await this.productRepository.deleteProduct(id);
  }
}
