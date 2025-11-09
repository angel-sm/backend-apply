import { ProductFilters } from '@products/utils/product-filters.util';
import {
  PrimitiveProduct,
  Product,
} from '@products/domain/entities/product.entity';
import { PaginatedResult, Pagination } from '@shared/utils/pagination.util';

export abstract class ProductRepository {
  /**
   * Search and filter products with pagination support.
   *
   * @param filters - Filter criteria for product search (SKU, name, brand, category, price range, dates, etc.)
   * @param pagination - Pagination parameters (page number and items per page)
   * @returns Promise resolving to paginated result containing products and pagination metadata
   */
  abstract searchProducts(
    filters: ProductFilters,
    pagination: Pagination,
  ): Promise<PaginatedResult<PrimitiveProduct>>;

  /**
   * Persist multiple products to the database.
   * Creates new products or updates existing ones based on product ID.
   *
   * @param products - Array of Product entities to save
   * @returns Promise that resolves when all products are saved
   */
  abstract saveProducts(products: Product[]): Promise<void>;

  /**
   * Soft delete a product by setting its deletedAt timestamp.
   *
   * @param productId - Unique identifier of the product to delete
   * @returns Promise that resolves when the product is marked as deleted
   * @throws {NotFoundException} If product with given ID does not exist
   */
  abstract deleteProduct(productId: string): Promise<void>;

  /**
   * Count the number of products matching the given filter criteria.
   *
   * @param filter - Filter criteria to apply when counting products
   * @returns Promise resolving to the total count of matching products
   */
  abstract countDocuments(filter: ProductFilters): Promise<number>;

  /**
   * Fetch all products matching the filter criteria without pagination.
   *
   * @param filter - Filter criteria for product retrieval
   * @returns Promise resolving to array of products matching the filter
   */
  abstract fetch(filter: ProductFilters): Promise<PrimitiveProduct[]>;

  /**
   * Fetch product statistics aggregated by category.
   * Returns average price and total stock per category for non-deleted products.
   *
   * @returns Promise resolving to array of category statistics with _id (category name), avgPrice, and totalStock
   */
  abstract fetchCategories(): Promise<any>;
}
