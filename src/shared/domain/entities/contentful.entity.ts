export interface Contentful {
  metadata: object;
  sys: {
    space: object;
    id: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    environment: object;
    publishedVersion?: number;
    revision: number;
    contentType: object;
    locale: string;
  };
  fields: ContentfulProductFields;
}

export interface ContentfulProductFields {
  sku: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  color: string;
  price: number;
  currency: string;
  stock: number;
}
