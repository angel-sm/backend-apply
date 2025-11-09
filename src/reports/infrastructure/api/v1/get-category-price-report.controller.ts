import { Get } from '@nestjs/common';

import { GetCategoryPriceReportUseCase } from '@reports/application/usecases/get-category-price-report.usecase';
import { ReportController } from '@reports/infrastructure/decorators/report-controller.decorator';

import { ApiGetCategoryPriceReport } from '@swagger/v1/reports/get-category-price-report.controller.swagger';

@ReportController()
export class GetCategoryPriceReportController {
  constructor(private readonly getCategoryPriceReportUseCase: GetCategoryPriceReportUseCase) {}

  @Get('categories')
  @ApiGetCategoryPriceReport()
  async getCategoryPriceReport() {
    const report = await this.getCategoryPriceReportUseCase.run();

    return {
      success: true,
      data: report,
    };
  }
}
