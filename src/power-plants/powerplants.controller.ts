import {Inject} from '@nestjs/common';
import {Controller, Get, Query, UseFilters} from '@nestjs/common';
import {IPowerPlantService} from './interfaces/pp-service.interface';
import {CustomExceptionFilter} from 'src/http-exception.filter';
import {ApiOperation, ApiQuery} from '@nestjs/swagger';

@Controller('power-plants')
export class PowerPlantsController {
  constructor(
    @Inject('PowerPlantsService')
    private readonly powerPlantService: IPowerPlantService,
  ) {}

  @ApiOperation({description: 'Get top N plants by annual net gen'})
  @ApiQuery({name: 'count', description: 'N number of top results'})
  @Get('/top')
  @UseFilters(CustomExceptionFilter)
  getTopPlants(@Query('count') count: number): any {
    return this.powerPlantService.getTopPlants(count);
  }

  @ApiOperation({description: 'Get absolute value and perc of annual net get by state'})
  @ApiQuery({name: 'state', description: 'abreviation of a state'})
  @Get('/state/stats')
  @UseFilters(CustomExceptionFilter)
  getStateData(@Query('state') state: string): any {
    return this.powerPlantService.getStatsOfState(state.toUpperCase());
  }

  @ApiOperation({description: 'Get all plants belonging to a state'})
  @ApiQuery({name: 'state', description: 'abreviation of a state'})
  @Get('/state')
  @UseFilters(CustomExceptionFilter)
  getStatePlants(@Query('state') state: string): any {
    return this.powerPlantService.getPlantsByState(state.toUpperCase());
  }
}
