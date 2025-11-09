import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  ProductDocument,
  ProductSchema,
} from '@shared/infrastructure/database/mongo/schemas';
import { PaginatedResult, Pagination } from '@shared/utils/pagination.util';
import {
  PrimitiveProduct,
  Product,
} from '@products/domain/entities/product.entity';
import { ProductRepository } from '@products/domain/repositories/product.repository';
import {
  ProductFilters,
  ProductFiltersUtil,
} from '@products/utils/product-filters.util';

@Injectable()
export class MongoProductsRepository extends ProductRepository {
  constructor(
    @InjectModel(ProductSchema.name)
    private readonly productModel: Model<ProductDocument>,
  ) {
    super();
  }

  async searchProducts(
    filters: ProductFilters,
    pagination: Pagination,
  ): Promise<PaginatedResult<PrimitiveProduct>> {
    const page = pagination.page;
    const limit = pagination.limit;
    const skip = (page - 1) * limit;

    const query = ProductFiltersUtil.buildMongoQuery(filters);

    const [products, total] = await Promise.all([
      this.productModel
        .find({
          ...query,
          deletedAt: null,
        })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      this.productModel
        .countDocuments({
          ...query,
          deletedAt: null,
        })
        .exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: products as PrimitiveProduct[],
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  async saveProducts(products: Product[]): Promise<void> {
    try {
      const productToInsert: PrimitiveProduct[] = products.map(
        (product) => product.toPrimitive,
      );
      await this.productModel.insertMany(productToInsert);
    } catch (error) {
      console.error('Error saving products:', error);
      throw error;
    }
  }

  async deleteProduct(productId: string): Promise<void> {
    try {
      await this.productModel.updateOne(
        {
          id: productId,
        },
        {
          deletedAt: new Date().toISOString(),
        },
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }

  async countDocuments(filter: ProductFilters): Promise<number> {
    const query = ProductFiltersUtil.buildMongoQuery(filter);
    const result = await this.productModel.countDocuments(query).exec();
    return result;
  }

  async fetch(filter: ProductFilters): Promise<PrimitiveProduct[]> {
    const query = ProductFiltersUtil.buildMongoQuery(filter);
    const result = await this.productModel.find(query).lean().exec();
    return result as PrimitiveProduct[];
  }

  async fetchCategories(): Promise<any> {
    const result = await this.productModel
      .aggregate([
        { $match: { deletedAt: null } },
        {
          $group: {
            _id: '$category',
            avgPrice: { $avg: '$price' },
            totalStock: { $sum: '$stock' },
          },
        },
        {
          $project: {
            _id: 0,
            category: '$_id',
            avgPrice: { $round: ['$avgPrice', 2] },
            totalStock: 1,
          },
        },
        { $sort: { totalStock: -1 } },
      ])
      .exec();
    return result;
  }
}
