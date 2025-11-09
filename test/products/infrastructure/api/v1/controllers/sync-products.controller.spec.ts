import { Test, TestingModule } from '@nestjs/testing';
import { SyncProductsController } from '@products/infrastructure/api/v1/controllers/sync-products.controller';
import { SyncProductsFromContentfulUseCase } from '@products/application/usecases/sync-products-from-contentful.usecase';
import { AuthGuard } from '@shared/infrastructure/guards/auth.guard';

describe('SyncProductsController', () => {
  let controller: SyncProductsController;
  let useCase: SyncProductsFromContentfulUseCase;

  const mockSyncProductsUseCase = {
    run: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SyncProductsController],
      providers: [
        {
          provide: SyncProductsFromContentfulUseCase,
          useValue: mockSyncProductsUseCase,
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<SyncProductsController>(SyncProductsController);
    useCase = module.get<SyncProductsFromContentfulUseCase>(SyncProductsFromContentfulUseCase);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('syncProducts', () => {
    it('should sync products successfully', async () => {
      const mockResult = {
        success: true,
        productsCount: 42,
        message: 'Successfully synchronized 42 products from Contentful',
      };

      mockSyncProductsUseCase.run.mockResolvedValue(mockResult);

      const result = await controller.syncProducts();

      expect(result).toEqual(mockResult);
      expect(useCase.run).toHaveBeenCalledTimes(1);
    });
  });
});
