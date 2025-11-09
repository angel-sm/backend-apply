import { Test, TestingModule } from '@nestjs/testing';
import { SearchProductsUseCase } from '@products/application/usecases/search-products.usecase';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { ProductFilters } from '@products/utils/product-filters.util';
import { Pagination } from '@shared/utils/pagination.util';

describe('SearchProductsUseCase', () => {
  let useCase: SearchProductsUseCase;
  let repository: ProductRepository;

  const mockProductRepository = {
    searchProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchProductsUseCase,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<SearchProductsUseCase>(SearchProductsUseCase);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('run', () => {
    it('should search products with filters and pagination', async () => {
      const filters: ProductFilters = {
        category: 'Electronics',
        minPrice: 100,
        maxPrice: 1000,
      };

      const pagination: Pagination = {
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
            price: 999,
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

      mockProductRepository.searchProducts.mockResolvedValue(mockResult);

      const result = await useCase.run(filters, pagination);

      expect(result).toEqual(mockResult);
      expect(repository.searchProducts).toHaveBeenCalledWith(filters, pagination);
      expect(repository.searchProducts).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no products match filters', async () => {
      const filters: ProductFilters = {
        category: 'NonExistent',
      };

      const pagination: Pagination = {
        page: 1,
        limit: 10,
      };

      const mockResult = {
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
      };

      mockProductRepository.searchProducts.mockResolvedValue(mockResult);

      const result = await useCase.run(filters, pagination);

      expect(result.data).toHaveLength(0);
      expect(result.pagination.total).toBe(0);
    });
  });
});
