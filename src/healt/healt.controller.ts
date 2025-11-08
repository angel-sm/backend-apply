import { Controller, Get } from '@nestjs/common';
import { HealtService } from './healt.service';

@Controller('health')
export class HealtController {
  constructor(private readonly healtService: HealtService) {}

  @Get()
  getHealt(): { status: string; timestamp: string } {
    return this.healtService.getHealt();
  }
}
