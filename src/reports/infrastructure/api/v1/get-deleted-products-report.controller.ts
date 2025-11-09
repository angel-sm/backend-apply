import { Get } from '@nestjs/common';

import { GetDeletedProductsReportUseCase } from '@reports/application/usecases/get-deleted-products-report.usecase';
import { ReportController } from '@reports/infrastructure/decorators/report-controller.decorator';

import { ApiGetDeletedProductsReport } from '@swagger/v1/reports/get-deleted-products-report.controller.swagger';

@ReportController()
export class GetDeletedProductsReportController {
  constructor(private readonly getDeletedProductsReportUseCase: GetDeletedProductsReportUseCase) {}

  @Get('deleted-products')
  @ApiGetDeletedProductsReport()
  async getDeletedProductsReport() {
    const report = await this.getDeletedProductsReportUseCase.run();

    return {
      success: true,
      data: report.toPrimitive,
    };
  }
}
