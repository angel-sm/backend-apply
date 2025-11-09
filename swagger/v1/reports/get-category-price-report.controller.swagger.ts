import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetCategoryPriceReport() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get category price report',
      description:
        'Generates a report with statistics by product category including average price and total stock. Results are sorted by total stock in descending order. Requires authentication via JWT token.',
    }),
    ApiResponse({
      status: 200,
      description: 'Report generated successfully',
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
            description: 'Array of category statistics',
            items: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  example: 'Electronics',
                  description: 'Product category name',
                },
                avgPrice: {
                  type: 'number',
                  example: 1299.99,
                  description: 'Average price of products in this category (rounded to 2 decimals)',
                },
                totalStock: {
                  type: 'number',
                  example: 250,
                  description: 'Total stock available for this category',
                },
              },
            },
          },
        },
      },
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - Missing or invalid JWT token',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}
