import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<ProductSchema>;
export const PRODUCT_COLLECTION_NAME = 'products';

@Schema({
  timestamps: true,
  collection: 'products',
})
export class ProductSchema {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  sku: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  brand: string;

  @Prop({ required: true })
  model: string;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  color: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ required: true, default: 'USD' })
  currency: string;

  @Prop({ required: true, default: '0' })
  stock: number;

  @Prop({ type: Date })
  deletedAt: Date | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export const ProductMongooseSchema =
  SchemaFactory.createForClass(ProductSchema);

ProductMongooseSchema.index({ brand: 1, category: 1, name: 1, color: 1 });
ProductMongooseSchema.index({ deletedAt: 1 });
ProductMongooseSchema.index({ createdAt: -1 });
