import {Module, Logger} from '@nestjs/common';
import {PowerPlantsController} from './powerplants.controller';
import {PowerPlantsService} from './powerplants.service';
import {PowerPlant} from './powerplant';
import {StatePowerPlants} from './state-powerplants';
import {CountryPowerPlants} from './country-powerplants';
import {
  STATE_POWER_PLANTS_JSON,
  POWER_PLANTS_JSON,
  COUNTRY_POWER_PLANTS_JSON,
  PLANTS_ANNUAL_NET_GENERATION_KEY,
  PLANTS_NAME,
  PLANTS_STATE_ABBREVIATION_KEY,
  STATE_ABBREVIATION_KEY,
  STATES_ABSOLUTE_ANNUAL_NET_GENERATION_KEY,
  USA_ABSOLUTE_ANNUAL_NET_GENERATION_KEY,
} from './constants';

import {CustomExceptionFilter} from 'src/http-exception.filter';

@Module({
  imports: [],
  controllers: [PowerPlantsController],
  providers: [
    Logger, // Register the Logger provider
    {provide: 'Logger', useClass: Logger},
    {provide: 'PowerPlant', useClass: PowerPlant},
    {provide: 'SatePowerPlant', useClass: StatePowerPlants},
    {provide: 'CountryPowerPlant', useClass: CountryPowerPlants},
    {provide: 'PowerPlantsService', useClass: PowerPlantsService},
    {provide: 'POWER_PLANTS_JSON_PATH', useValue: POWER_PLANTS_JSON},
    {provide: 'STATE_POWER_PLANTS_JSON_PATH', useValue: STATE_POWER_PLANTS_JSON},
    {provide: 'COUNTRY_POWER_PLANTS_JSON_PATH', useValue: COUNTRY_POWER_PLANTS_JSON},
    {
      provide: 'PLANTS_ANNUAL_NET_GENERATION_KEY',
      useValue: PLANTS_ANNUAL_NET_GENERATION_KEY,
    },
    {
      provide: 'PLANTS_NAME',
      useValue: PLANTS_NAME,
    },
    {
      provide: 'PLANTS_STATE_ABBREVIATION_KEY',
      useValue: PLANTS_STATE_ABBREVIATION_KEY,
    },
    {
      provide: 'STATE_ABBREVIATION_KEY',
      useValue: STATE_ABBREVIATION_KEY,
    },
    {
      provide: 'STATES_ABSOLUTE_ANNUAL_NET_GENERATION_KEY',
      useValue: STATES_ABSOLUTE_ANNUAL_NET_GENERATION_KEY,
    },
    {
      provide: 'USA_ABSOLUTE_ANNUAL_NET_GENERATION_KEY',
      useValue: USA_ABSOLUTE_ANNUAL_NET_GENERATION_KEY,
    },
  ],
})
export class PowerPlantsModule {}
