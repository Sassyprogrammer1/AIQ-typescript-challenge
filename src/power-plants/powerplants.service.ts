// src/power-plant/power-plant.service.ts

import {Injectable, Inject} from '@nestjs/common';
import {IPowerPlant} from './interfaces/powerplant.interface';
import {IState} from './interfaces/state-powerplants.interface';
import {IStateObject} from './interfaces/state-powerplants.interface';
import {PowerPlantResponseObject} from './types/PlantsDataType';

export class PowerPlantsService {
  constructor(
    @Inject('PowerPlant') private readonly plant: IPowerPlant,
    @Inject('SatePowerPlant') private readonly state: IState,
  ) {}

  async getTopPlants(count: number): Promise<PowerPlantResponseObject> {
    const result = await this.plant.filterTopNPlants(count);
    return result;
  }

  async getStatsOfState(state: string): Promise<IStateObject> {
    const result = this.state.calculateStats(state);
    return result;
  }

  async getPlantsByState(state: string): Promise<PowerPlantResponseObject> {
    const result = await this.plant.filterPlantsByState(state);
    return result;
  }
}
