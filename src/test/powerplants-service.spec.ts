import {PowerPlantsService} from '../power-plants/powerplants.service';
import {IStateObject} from '../power-plants/interfaces/state-powerplants.interface';
import {PowerPlantResponseObject} from '../power-plants/types/PlantsDataType';
import {powerPlantMock} from '../mocks/power-plant-mock';
import {statePowerPlantMock} from '../mocks/state-power-plant-mock';

describe('PowerPlantsService', () => {
  let powerPlantsService: PowerPlantsService;
  let mockPowerPlant, mockState;
  beforeEach(() => {
    mockPowerPlant = {
      filterTopNPlants: jest.fn().mockResolvedValue(powerPlantMock),
      filterPlantsByState: jest.fn().mockResolvedValue(statePowerPlantMock),
    };
    mockState = {
      calculateStats: jest.fn().mockResolvedValue({
        absoluteNetGen: 1000,
        stateNetGenPerc: 20,
      }),
    };
    powerPlantsService = new PowerPlantsService(mockPowerPlant, mockState);
  });

  describe('getTopPlants', () => {
    it('should return top plants', async () => {
      const expectedResult: PowerPlantResponseObject = powerPlantMock;

      const result = await powerPlantsService.getTopPlants(13);
      expect(result).toBe(expectedResult);
      expect(mockPowerPlant.filterTopNPlants).toHaveBeenCalledWith(13);
    });
  });

  describe('getStatsOfState', () => {
    it('should return stats of state', async () => {
      const state = 'SomeState';
      const expectedStats: IStateObject = {absoluteNetGen: 1000, stateNetGenPerc: 20};
      const result = await powerPlantsService.getStatsOfState(state);
      expect(result).toEqual(expectedStats);
      expect(mockState.calculateStats).toHaveBeenCalledWith(state);
    });
  });

  describe('getPlantsByState', () => {
    it('should return plants by state', async () => {
      const state = 'SomeState';
      const expectedResult: PowerPlantResponseObject = statePowerPlantMock;
      const result = await powerPlantsService.getPlantsByState(state);
      expect(result).toBe(expectedResult);
      expect(mockPowerPlant.filterPlantsByState).toHaveBeenCalledWith(state);
    });
  });
});
