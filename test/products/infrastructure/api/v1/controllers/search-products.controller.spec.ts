import { Test, TestingModule } from '@nestjs/testing';
import { SearchProductsController } from '@products/infrastructure/api/v1/controllers/search-products.controller';
import { SearchProductsUseCase } from '@products/application/usecases/search-products.usecase';
import { SearchProductsDto } from '@products/application/dtos/search-products.dto';

describe('SearchProductsController', () => {
  let controller: SearchProductsController;
  let useCase: SearchProductsUseCase;

  const mockSearchProductsUseCase = {
    run: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchProductsController],
      providers: [
        {
          provide: SearchProductsUseCase,
          useValue: mockSearchProductsUseCase,
        },
      ],
    }).compile();

    controller = module.get<SearchProductsController>(SearchProductsController);
    useCase = module.get<SearchProductsUseCase>(SearchProductsUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('searchProducts', () => {
    it('should return paginated products', async () => {
      const dto: SearchProductsDto = {
        category: 'Electronics',
        page: 1,
        limit: 10,
      };

      const mockResult = {
        data: [
          {
            id: '1',
            sku: 'ABC123',
            name: 'Laptop',
            brand: 'Apple',
            model: 'MacBook Pro',
            category: 'Electronics',
            price: 2499.99,
            currency: 'USD',
            color: 'Silver',
            stock: 10,
            createdAt: '2024-01-01',
            updatedAt: '2024-01-01',
            deletedAt: null,
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 1,
          totalPages: 1,
        },
      };

      mockSearchProductsUseCase.run.mockResolvedValue(mockResult);

      const result = await controller.searchProducts(dto);

      expect(result).toEqual({
        success: true,
        data: mockResult.data,
        pagination: mockResult.pagination,
      });
      expect(useCase.run).toHaveBeenCalledWith(
        expect.objectContaining({
          category: 'Electronics',
        }),
        {
          page: 1,
          limit: 10,
        },
      );
    });

    it('should use default pagination values when not provided', async () => {
      const dto: SearchProductsDto = {};

      const mockResult = {
        data: [],
        pagination: {
          page: 1,
          limit: 5,
          total: 0,
          totalPages: 0,
        },
      };

      mockSearchProductsUseCase.run.mockResolvedValue(mockResult);

      await controller.searchProducts(dto);

      expect(useCase.run).toHaveBeenCalledWith(expect.any(Object), {
        page: 1,
        limit: 5,
      });
    });
  });
});
