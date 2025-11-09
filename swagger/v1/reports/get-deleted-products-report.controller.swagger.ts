import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiGetDeletedProductsReport() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get deleted products report',
      description:
        'Generates a comprehensive report of all deleted products with statistics including total count and percentages. Requires authentication via JWT token.',
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
            type: 'object',
            description: 'Products report data',
            properties: {
              totalProducts: {
                type: 'number',
                example: 150,
                description: 'Total number of products in the system',
              },
              deletedProducts: {
                type: 'number',
                example: 10,
                description: 'Number of deleted products',
              },
              activeProducts: {
                type: 'number',
                example: 140,
                description: 'Number of active (non-deleted) products',
              },
              deletedPercentage: {
                type: 'number',
                example: 6.67,
                description: 'Percentage of deleted products',
              },
              activePercentage: {
                type: 'number',
                example: 93.33,
                description: 'Percentage of active products',
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
