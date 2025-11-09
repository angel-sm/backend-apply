import { Test, TestingModule } from '@nestjs/testing';
import { GetDeletedProductsReportUseCase } from '@reports/application/usecases/get-deleted-products-report.usecase';
import { ProductRepository } from '@products/domain/repositories/product.repository';

describe('GetDeletedProductsReportUseCase', () => {
  let useCase: GetDeletedProductsReportUseCase;
  let repository: ProductRepository;

  const mockProductRepository = {
    countDocuments: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetDeletedProductsReportUseCase,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetDeletedProductsReportUseCase>(GetDeletedProductsReportUseCase);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('run', () => {
    it('should generate report for deleted products', async () => {
      mockProductRepository.countDocuments
        .mockResolvedValueOnce(100) // totalProducts
        .mockResolvedValueOnce(15); // deletedProducts

      const result = await useCase.run();

      expect(result.toPrimitive).toEqual({
        totalProducts: 100,
        activeProducts: 85,
        deletedProducts: 15,
        deletedPercentage: 15,
        activePercentage: 85,
      });
      expect(repository.countDocuments).toHaveBeenCalledTimes(2);
    });

    it('should calculate percentages correctly', async () => {
      mockProductRepository.countDocuments
        .mockResolvedValueOnce(200)
        .mockResolvedValueOnce(50);

      const result = await useCase.run();

      expect(result.toPrimitive.deletedPercentage).toBe(25);
      expect(result.toPrimitive.activePercentage).toBe(75);
    });

    it('should handle all products deleted scenario', async () => {
      mockProductRepository.countDocuments
        .mockResolvedValueOnce(100)
        .mockResolvedValueOnce(100);

      const result = await useCase.run();

      expect(result.toPrimitive).toEqual({
        totalProducts: 100,
        activeProducts: 0,
        deletedProducts: 100,
        deletedPercentage: 100,
        activePercentage: 0,
      });
    });
  });
});
