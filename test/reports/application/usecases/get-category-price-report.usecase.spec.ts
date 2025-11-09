import { Test, TestingModule } from '@nestjs/testing';
import { GetCategoryPriceReportUseCase } from '@reports/application/usecases/get-category-price-report.usecase';
import { ProductRepository } from '@products/domain/repositories/product.repository';

describe('GetCategoryPriceReportUseCase', () => {
  let useCase: GetCategoryPriceReportUseCase;
  let repository: ProductRepository;

  const mockProductRepository = {
    fetchCategories: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetCategoryPriceReportUseCase,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetCategoryPriceReportUseCase>(GetCategoryPriceReportUseCase);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('run', () => {
    it('should return category statistics', async () => {
      const mockCategories = [
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
        {
          category: 'Furniture',
          avgPrice: 799.99,
          totalStock: 100,
        },
      ];

      mockProductRepository.fetchCategories.mockResolvedValue(mockCategories);

      const result = await useCase.run();

      expect(result).toEqual(mockCategories);
      expect(repository.fetchCategories).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no categories exist', async () => {
      mockProductRepository.fetchCategories.mockResolvedValue([]);

      const result = await useCase.run();

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
    });

    it('should handle categories sorted by stock', async () => {
      const mockCategories = [
        {
          category: 'Accessories',
          avgPrice: 49.99,
          totalStock: 500,
        },
        {
          category: 'Electronics',
          avgPrice: 1299.99,
          totalStock: 250,
        },
        {
          category: 'Furniture',
          avgPrice: 799.99,
          totalStock: 100,
        },
      ];

      mockProductRepository.fetchCategories.mockResolvedValue(mockCategories);

      const result = await useCase.run();

      expect(result[0].totalStock).toBeGreaterThanOrEqual(result[1].totalStock);
      expect(result[1].totalStock).toBeGreaterThanOrEqual(result[2].totalStock);
    });
  });
});
