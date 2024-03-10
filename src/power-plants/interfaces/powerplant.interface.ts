import {PowerPlantResponseObject} from '../types/PlantsDataType';

export interface IPlantObject {
  plantName: string;
  annualNetGeneration: number;
  stateAbrv: string;
}

export interface IPowerPlant {
  filterTopNPlants(N: number): Promise<PowerPlantResponseObject>;
  filterPlantsByState(state: string): Promise<PowerPlantResponseObject>;
}
