import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination } from '@shared/utils/pagination.util';
import { SearchProductsDto } from '@products/application/dtos/search-products.dto';
import { SearchProductsUseCase } from '@products/application/usecases/search-products.usecase';
import { ProductFilters } from '@products/utils/product-filters.util';

import { ApiSearchProducts } from '@swagger/v1/products/search-products.controller.swagger';
@ApiTags('Products')
@Controller({ path: 'products', version: '1' })
export class SearchProductsController {
  constructor(private readonly searchProductsUseCase: SearchProductsUseCase) {}

  @Get()
  @ApiSearchProducts()
  async searchProducts(@Query() filters: SearchProductsDto) {
    const productFilters: ProductFilters = {
      ...filters,
      startDate: filters.startDate ? new Date(filters.startDate) : undefined,
      endDate: filters.endDate ? new Date(filters.endDate) : undefined,
    };

    const pagination: Pagination = {
      page: filters.page || 1,
      limit: filters.limit || 5,
    };

    const result = await this.searchProductsUseCase.run(productFilters, pagination);

    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
    };
  }
}
