import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function ApiSignin() {
  return applyDecorators(
    ApiOperation({
      summary: 'User authentication',
      description:
        'Authenticates a user with a username and returns a JWT access token. This endpoint accepts any valid username and generates a secure token for API access.',
    }),
    ApiResponse({
      status: 200,
      description: 'Authentication successful - Returns access token',
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
            description: 'Indicates if the authentication was successful',
          },
          accessToken: {
            type: 'string',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            description: 'JWT access token for authenticated requests',
          },
        },
      },
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - Invalid username or missing required fields',
    }),
    ApiResponse({
      status: 500,
      description: 'Internal server error',
    }),
  );
}
