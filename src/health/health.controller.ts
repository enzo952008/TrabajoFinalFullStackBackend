import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
    constructor(private readonly healthService: HealthService) { }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Verificar el estado de la aplicación' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Estado exitoso' })
    healthCheck(): string {
      return this.healthService.getHealth();
    }
}
