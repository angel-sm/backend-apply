import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export function ApiSyncProducts() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Sync products from Contentful',
      description:
        'Manually triggers a synchronization of products from Contentful CMS to the database. This endpoint fetches all products from Contentful and stores them in the local database. Requires authentication via JWT token.',
    }),
    ApiResponse({
      status: 200,
      description: 'Products synchronized successfully',
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
            description: 'Indicates if the synchronization was successful',
          },
          productsCount: {
            type: 'number',
            example: 42,
            description: 'Number of products synchronized from Contentful',
          },
          message: {
            type: 'string',
            example: 'Successfully synchronized 42 products from Contentful',
            description: 'Detailed message about the synchronization result',
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
      description: 'Internal server error - Failed to sync products from Contentful',
    }),
    ApiResponse({
      status: 503,
      description: 'Service unavailable - Contentful API is unreachable',
    }),
  );
}
