import { Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '@shared/infrastructure/guards/auth.guard';
import { SyncProductsFromContentfulUseCase } from '@products/application/usecases/sync-products-from-contentful.usecase';

import { ApiSyncProducts } from '@swagger/v1/products/sync-products.controller.swagger';

@ApiTags('Products')
@UseGuards(AuthGuard)
@ApiBearerAuth()
@Controller({ path: 'products', version: '1' })
export class SyncProductsController {
  constructor(private readonly syncProductsUseCase: SyncProductsFromContentfulUseCase) {}

  @Post('sync')
  @ApiSyncProducts()
  async syncProducts() {
    const result = await this.syncProductsUseCase.run();
    return result;
  }
}
