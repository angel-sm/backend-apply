import { Test, TestingModule } from '@nestjs/testing';
import { GetCategoryPriceReportController } from '@reports/infrastructure/api/v1/get-category-price-report.controller';
import { GetCategoryPriceReportUseCase } from '@reports/application/usecases/get-category-price-report.usecase';
import { AuthGuard } from '@shared/infrastructure/guards/auth.guard';

describe('GetCategoryPriceReportController', () => {
  let controller: GetCategoryPriceReportController;
  let useCase: GetCategoryPriceReportUseCase;

  const mockGetCategoryPriceReportUseCase = {
    run: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetCategoryPriceReportController],
      providers: [
        {
          provide: GetCategoryPriceReportUseCase,
          useValue: mockGetCategoryPriceReportUseCase,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<GetCategoryPriceReportController>(GetCategoryPriceReportController);
    useCase = module.get<GetCategoryPriceReportUseCase>(GetCategoryPriceReportUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCategoryPriceReport', () => {
    it('should return category price report', async () => {
      const mockReport = [
        {
          category: 'Electronics',
          avgPrice: 1299.99,
          totalStock: 250,
        },
        {
          category: 'Accessories',
          avgPrice: 49.99,
          totalStock: 500,
        },
      ];

      mockGetCategoryPriceReportUseCase.run.mockResolvedValue(mockReport);

      const result = await controller.getCategoryPriceReport();

      expect(result).toEqual({
        success: true,
        data: mockReport,
      });
      expect(useCase.run).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no categories exist', async () => {
      mockGetCategoryPriceReportUseCase.run.mockResolvedValue([]);

      const result = await controller.getCategoryPriceReport();

      expect(result).toEqual({
        success: true,
        data: [],
      });
    });
  });
});
