import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

export function ApiSearchProducts() {
  return applyDecorators(
    ApiOperation({
      summary: 'Search products',
      description:
        'Search and filter products with pagination support. Allows filtering by SKU, name, brand, model, category, color, price range, and date range. Returns a paginated list of products.',
    }),
    ApiQuery({
      name: 'sku',
      required: false,
      type: String,
      description: 'Filter by SKU code',
      example: 'ABC123',
    }),
    ApiQuery({
      name: 'name',
      required: false,
      type: String,
      description: 'Filter by product name',
      example: 'Laptop',
    }),
    ApiQuery({
      name: 'brand',
      required: false,
      type: String,
      description: 'Filter by brand name',
      example: 'Apple',
    }),
    ApiQuery({
      name: 'model',
      required: false,
      type: String,
      description: 'Filter by product model',
      example: 'MacBook Pro',
    }),
    ApiQuery({
      name: 'category',
      required: false,
      type: String,
      description: 'Filter by product category',
      example: 'Electronics',
    }),
    ApiQuery({
      name: 'color',
      required: false,
      type: String,
      description: 'Filter by product color',
      example: 'Silver',
    }),
    ApiQuery({
      name: 'minPrice',
      required: false,
      type: Number,
      description: 'Filter by minimum price',
      example: 100,
    }),
    ApiQuery({
      name: 'maxPrice',
      required: false,
      type: Number,
      description: 'Filter by maximum price',
      example: 5000,
    }),
    ApiQuery({
      name: 'startDate',
      required: false,
      type: String,
      description: 'Filter by start date (ISO format)',
      example: '2024-01-01',
    }),
    ApiQuery({
      name: 'endDate',
      required: false,
      type: String,
      description: 'Filter by end date (ISO format)',
      example: '2024-12-31',
    }),
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number for pagination',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page (max: 100)',
      example: 5,
    }),
    ApiResponse({
      status: 200,
      description: 'Products retrieved successfully',
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
            description: 'Indicates if the request was successful',
          },
          data: {
            type: 'array',
            description: 'Array of products',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  example: '507f1f77bcf86cd799439011',
                  description: 'Product unique identifier',
                },
                sku: {
                  type: 'string',
                  example: 'ABC123',
                  description: 'Product SKU code',
                },
                name: {
                  type: 'string',
                  example: 'MacBook Pro 16"',
                  description: 'Product name',
                },
                brand: {
                  type: 'string',
                  example: 'Apple',
                  description: 'Product brand',
                },
                model: {
                  type: 'string',
                  example: 'MacBook Pro',
                  description: 'Product model',
                },
                category: {
                  type: 'string',
                  example: 'Electronics',
                  description: 'Product category',
                },
                price: {
                  type: 'number',
                  example: 2499.99,
                  description: 'Product price',
                },
                currency: {
                  type: 'string',
                  example: 'USD',
                  description: 'Currency code',
                },
                color: {
                  type: 'string',
                  example: 'Silver',
                  description: 'Product color',
                },
                stock: {
                  type: 'number',
                  example: 15,
                  description: 'Available stock quantity',
                },
                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-15T10:30:00Z',
                  description: 'Product creation date',
                },
                updatedAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2024-01-20T14:45:00Z',
                  description: 'Product last update date',
                },
                deletedAt: {
                  type: 'string',
                  format: 'date-time',
                  nullable: true,
                  example: null,
                  description: 'Product deletion date (null if active)',
                },
              },
            },
          },
          pagination: {
            type: 'object',
            description: 'Pagination metadata',
            properties: {
              page: {
                type: 'number',
                example: 1,
                description: 'Current page number',
              },
              limit: {
                type: 'number',
                example: 5,
                description: 'Items per page',
              },
              total: {
                type: 'number',
                example: 50,
                description: 'Total number of items',
              },
              totalPages: {
                type: 'number',
                example: 10,
                description: 'Total number of pages',
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - Invalid query parameters',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}
