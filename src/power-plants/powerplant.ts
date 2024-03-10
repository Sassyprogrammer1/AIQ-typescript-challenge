import {NotFoundException, Inject} from '@nestjs/common';
import {IPowerPlant, IPlantObject} from './interfaces/powerplant.interface';
import {AbstractPowerPlant} from './abstract-powerplant';
import {PowerPlantResponseObject} from './types/PlantsDataType';
import {CustomError} from '../error';

export class PowerPlant extends AbstractPowerPlant implements IPowerPlant {
  constructor(
    @Inject('POWER_PLANTS_JSON_PATH') private readonly plantsJsonPath: string,
    @Inject('PLANTS_ANNUAL_NET_GENERATION_KEY') private readonly annualNetGenerationKey: string,
    @Inject('PLANTS_STATE_ABBREVIATION_KEY') private readonly stateAbrv: string,
  ) {
    super(plantsJsonPath);
  }

  /**
   * @description
   * reads data from the powerplants sheet and filters
   * the power plants by annualNetGenaration in descending order
   * @param number
   * @returns Promise<PowerPlantResponseObject>
   */
  async filterTopNPlants(topN: number): Promise<PowerPlantResponseObject> {
    const data = await this.getData();
    if (data && data.length > 0) {
      const annualNetGenerationKey = this.annualNetGenerationKey;
      const sortedPlants = data
        .sort((a, b) => (b[annualNetGenerationKey] as number) - (a[annualNetGenerationKey] as number))
        .slice(0, topN);
      return sortedPlants;
    }
    throw new CustomError('No data for Power Plants found');
  }

  /**
   * @description
   * reads data from the powerplants sheet and filters
   * the power plants by state
   * @param string
   * @returns Promise<PowerPlantResponseObject>
   */
  async filterPlantsByState(state: string): Promise<PowerPlantResponseObject> {
    const data = await this.getData();
    if (data && data.length > 0) {
      const stateAbrv = this.stateAbrv;
      const filteredPlants: PowerPlantResponseObject = [];
      // filter powerplants by federal state
      for (const plant of data) {
        if (plant[`${stateAbrv}`] === state) {
          filteredPlants.push(plant);
        }
      }
      // check no state case
      if (filteredPlants.length === 0) {
        throw new CustomError('state not found!');
      }
      return filteredPlants;
    }
    throw new CustomError('No data for Power Plants found!');
  }
}
