import { Get, Query } from '@nestjs/common';

import { ProductsReportDto } from '@reports/application/dtos/products-report.dto';
import { GetNonDeletedProductsReportUseCase } from '@reports/application/usecases/get-non-deleted-products-report.usecase';
import { ProductsReportFilters } from '@reports/utils/non-deleted-report-filter.util';
import { ReportController } from '@reports/infrastructure/decorators/report-controller.decorator';

import { ApiGetNonDeletedProductsReport } from '@swagger/v1/reports/get-non-deleted-products-report.controller.swagger';

@ReportController()
export class GetNonDeletedProductsReportController {
  constructor(private readonly getNonDeletedProductsReportUseCase: GetNonDeletedProductsReportUseCase) {}

  @Get('non-deleted-products')
  @ApiGetNonDeletedProductsReport()
  async getNonDeletedProductsReport(@Query() dto: ProductsReportDto) {
    const filters: ProductsReportFilters = {
      hasPrice: dto.hasPrice,
      startDate: dto.startDate,
      endDate: dto.endDate,
    };

    const report = await this.getNonDeletedProductsReportUseCase.run(filters);

    return {
      success: true,
      data: report.toPrimitive,
    };
  }
}
