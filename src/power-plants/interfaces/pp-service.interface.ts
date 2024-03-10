export interface IPowerPlantService {
  getTopPlants(count: number): any;
  getStatsOfState(stateAbr: string): any;
  getPlantsByState(stateAbr: string): any;
  // Add other methods as needed
}
