import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

export function ApiDeleteProduct() {
  return applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete a product',
      description:
        'Performs a soft delete of a product by its ID. Requires authentication via JWT token. The product will be marked as deleted but not removed from the database.',
    }),
    ApiResponse({
      status: 200,
      description: 'Product deleted successfully',
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
            description: 'Indicates if the deletion was successful',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - Invalid product ID format',
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
