import { IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class DeleteProductDto {
  @ApiPropertyOptional({ description: 'product id' })
  @IsString()
  id: string;
}
