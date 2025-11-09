import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@shared/infrastructure/guards/auth.guard';

export function ReportController() {
  return applyDecorators(
    ApiTags('Reports'),
    ApiBearerAuth(),
    UseGuards(AuthGuard),
    Controller({ path: 'reports', version: '1' }),
  );
}
