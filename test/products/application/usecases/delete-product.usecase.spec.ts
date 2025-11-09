import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProductsUseCase } from '@products/application/usecases/delete-product.usecase';
import { ProductRepository } from '@products/domain/repositories/product.repository';

describe('DeleteProductsUseCase', () => {
  let useCase: DeleteProductsUseCase;
  let repository: ProductRepository;

  const mockProductRepository = {
    deleteProduct: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProductsUseCase,
        {
          provide: ProductRepository,
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteProductsUseCase>(DeleteProductsUseCase);
    repository = module.get<ProductRepository>(ProductRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  describe('run', () => {
    it('should delete a product by id', async () => {
      const productId = '507f1f77bcf86cd799439011';

      mockProductRepository.deleteProduct.mockResolvedValue(undefined);

      await useCase.run(productId);

      expect(repository.deleteProduct).toHaveBeenCalledWith(productId);
      expect(repository.deleteProduct).toHaveBeenCalledTimes(1);
    });

    it('should handle errors when deleting fails', async () => {
      const productId = 'invalid-id';
      const error = new Error('Product not found');

      mockProductRepository.deleteProduct.mockRejectedValue(error);

      await expect(useCase.run(productId)).rejects.toThrow('Product not found');
      expect(repository.deleteProduct).toHaveBeenCalledWith(productId);
    });
  });
});
