import {Inject} from '@nestjs/common';
import {Controller, Get, Query, UseFilters} from '@nestjs/common';
import {IPowerPlantService} from './interfaces/pp-service.interface';
import {CustomExceptionFilter} from 'src/http-exception.filter';

@Controller('power-plants')
export class PowerPlantsController {
  constructor(
    @Inject('PowerPlantsService')
    private readonly powerPlantService: IPowerPlantService,
  ) {}

  @Get('/top')
  @UseFilters(CustomExceptionFilter)
  getTopPlants(@Query('count') count: number): any {
    return this.powerPlantService.getTopPlants(count);
  }

  @Get('stats/state')
  @UseFilters(CustomExceptionFilter)
  getStateData(@Query('state') state: string): any {
    return this.powerPlantService.getStatsOfState(state.toUpperCase());
  }

  @Get('/plants/state')
  @UseFilters(CustomExceptionFilter)
  getStatePlants(@Query('state') state: string): any {
    return this.powerPlantService.getPlantsByState(state.toUpperCase());
  }
}
