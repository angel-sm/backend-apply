export interface PrimitiveProduct {
  id: string;
  sku: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  color: string;
  price: number;
  currency: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Product {
  constructor(private readonly attrs: PrimitiveProduct) {}

  static create(data: PrimitiveProduct) {
    return new Product({
      ...data,
      id: data.id ?? '',
    });
  }

  get toPrimitive() {
    return this.attrs;
  }
}
