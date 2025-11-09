import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

export function ApiGetNonDeletedProductsReport() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get non-deleted products report',
      description:
        'Generates a detailed report of active (non-deleted) products with statistics including total count, percentages, and filtering options. Requires authentication via JWT token.',
    }),
    ApiQuery({
      name: 'hasPrice',
      required: false,
      type: Boolean,
      description: 'Filter products by whether they have a price defined',
      example: true,
    }),
    ApiQuery({
      name: 'startDate',
      required: false,
      type: String,
      description: 'Filter products created from this date (ISO format)',
      example: '2024-01-01',
    }),
    ApiQuery({
      name: 'endDate',
      required: false,
      type: String,
      description: 'Filter products created until this date (ISO format)',
      example: '2024-12-31',
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
      status: 400,
      description: 'Bad request - Invalid query parameters',
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
