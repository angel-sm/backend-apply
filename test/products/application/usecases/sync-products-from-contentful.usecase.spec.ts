import { Test, TestingModule } from '@nestjs/testing';
import { SyncProductsFromContentfulUseCase } from '@products/application/usecases/sync-products-from-contentful.usecase';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import { ContentfulRepository } from '@shared/domain/repositories/contenful.repository';

describe('SyncProductsFromContentfulUseCase', () => {
  let useCase: SyncProductsFromContentfulUseCase;

  const mockProductRepository = {
    saveProducts: jest.fn(),
  };

  const mockContentfulRepository = {
    fetchProducts: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SyncProductsFromContentfulUseCase,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
        {
          provide: ContentfulRepository,
          useValue: mockContentfulRepository,
        },
      ],
    }).compile();

    useCase = module.get<SyncProductsFromContentfulUseCase>(SyncProductsFromContentfulUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('run', () => {
    it('should sync products from Contentful successfully', async () => {
      const mockContentfulProducts = [
        {
          sys: {
            id: '1',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
          },
          fields: {
            sku: 'ABC123',
            name: 'Laptop',
            brand: 'Apple',
            model: 'MacBook Pro',
            category: 'Electronics',
            price: 2499.99,
            currency: 'USD',
            color: 'Silver',
            stock: 10,
          },
        },
        {
          sys: {
            id: '2',
            createdAt: '2024-01-02T00:00:00Z',
            updatedAt: '2024-01-02T00:00:00Z',
          },
          fields: {
            sku: 'DEF456',
            name: 'Mouse',
            brand: 'Logitech',
            model: 'MX Master',
            category: 'Accessories',
            price: 99.99,
            currency: 'USD',
            color: 'Black',
            stock: 50,
          },
        },
      ];

      mockContentfulRepository.fetchProducts.mockResolvedValue(mockContentfulProducts);
      mockProductRepository.saveProducts.mockResolvedValue(undefined);

      const result = await useCase.run();

      expect(result).toEqual({
        success: true,
        productsCount: 2,
        message: 'Successfully synchronized 2 products from Contentful',
      });
    });
  });
});
