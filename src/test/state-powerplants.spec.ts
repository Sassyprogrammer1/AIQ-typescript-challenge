import {StatePowerPlants} from '../power-plants/state-powerplants';
import {statePowerPlantMock} from '../mocks/state-power-plant-mock';
import {STATE_ABBREVIATION_KEY, STATES_ABSOLUTE_ANNUAL_NET_GENERATION_KEY} from '../power-plants/constants';

describe('StatePowerPlants', () => {
  let statePowerPlants: StatePowerPlants;

  beforeEach(() => {
    const mockCountryPowerPlants: any = {
      absoluteAnnualNetGeneration: jest.fn().mockResolvedValue(1000), // Mocking the method with a resolved value
    };

    statePowerPlants = new StatePowerPlants(
      'states.json',
      STATE_ABBREVIATION_KEY,
      STATES_ABSOLUTE_ANNUAL_NET_GENERATION_KEY,
      mockCountryPowerPlants,
    );
  });

  describe('absoluteAnnualNetGeneration', () => {
    it('should return the absolute annual net generation for the specified state', async () => {
      jest.spyOn(statePowerPlants, 'getData').mockResolvedValueOnce(statePowerPlantMock);
      const absoluteNetGen = await statePowerPlants.absoluteAnnualNetGeneration('AK');
      expect(absoluteNetGen).toEqual(6595817.773);
    });

    it('should throw an error if no data is available', async () => {
      jest.spyOn(statePowerPlants, 'getData').mockResolvedValueOnce([]);
      await expect(statePowerPlants.absoluteAnnualNetGeneration('CA')).rejects.toThrow(
        'No data for State Power Plants found!',
      );
    });

    it('should return error if file path is wrong', async () => {
      await expect(statePowerPlants.absoluteAnnualNetGeneration('CA')).rejects.toThrow(
        'file does not exist!',
      );
    });
  });

  describe('statesAnnualNetGenerationPercentage', () => {
    it('should calculate the percentage of state annual net generation compared to country', async () => {
      const statePercentage = await statePowerPlants.statesAnnualNetGenerationPercentage(2000);
      expect(statePercentage).toEqual(200);
    });
  });

  describe('calculateStats', () => {
    it('should return an object with absolute net generation and state net generation percentage', async () => {
      jest.spyOn(statePowerPlants, 'absoluteAnnualNetGeneration').mockResolvedValueOnce(2000);
      jest.spyOn(statePowerPlants, 'statesAnnualNetGenerationPercentage').mockResolvedValueOnce(20);
      const stats = await statePowerPlants.calculateStats('NY');
      expect(stats).toEqual({absoluteNetGen: 2000, stateNetGenPerc: 20});
    });
  });
});
