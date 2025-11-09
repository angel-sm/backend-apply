import { PrimitiveProduct } from '@products/domain/entities/product.entity';

export interface ProductFilters extends Partial<PrimitiveProduct> {
  minPrice?: number;
  maxPrice?: number;
  startDate?: Date;
  endDate?: Date;
}

export class ProductFiltersUtil {
  static buildMongoQuery(filters: ProductFilters): Record<string, any> {
    const query: Record<string, any> = {};

    query.deletedAt = null;

    if (filters.sku) query.sku = filters.sku;
    if (filters.brand) query.brand = filters.brand;
    if (filters.category) query.category = filters.category;
    if (filters.color) query.color = filters.color;

    if (filters.name) {
      query.name = new RegExp(filters.name, 'i');
    }

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      query.price = {
        $gte: filters.minPrice,
        $lte: filters.maxPrice,
      };
    }

    if (filters.startDate && filters.endDate) {
      query.createdAt = {
        $gte: filters.startDate,
        $lte: filters.endDate,
      };
    }

    return query;
  }
}
