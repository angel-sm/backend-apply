import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@shared/infrastructure/guards/auth.guard';
import { DeleteProductDto } from '@products/application/dtos/delete-products.dto';
import { DeleteProductsUseCase } from '@products/application/usecases/delete-product.usecase';

import { ApiDeleteProduct } from '@swagger/v1/products/delete-product.controller.swagger';
@ApiTags('Products')
@UseGuards(AuthGuard)
@Controller({ path: 'products', version: '1' })
export class DeleteProductController {
  constructor(private readonly deleteProductUseCase: DeleteProductsUseCase) {}

  @Delete(':id')
  @ApiDeleteProduct()
  async deleteProduct(@Param() { id }: DeleteProductDto) {
    await this.deleteProductUseCase.run(id);
    return {
      success: true,
    };
  }
}
