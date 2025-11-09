import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    description: 'Username',
    example: 'admin',
  })
  @IsString()
  username: string;
}
