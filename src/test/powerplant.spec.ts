import {PowerPlant} from '../power-plants/powerplant';
import {PLANTS_ANNUAL_NET_GENERATION_KEY} from '../power-plants/constants';
import {powerPlantMock} from '../mocks/power-plant-mock';
import {CustomError} from '../error';
import {PLANTS_STATE_ABBREVIATION_KEY} from '../power-plants/constants';

describe('PowerPlant', () => {
  let powerPlant: PowerPlant;

  beforeEach(() => {
    powerPlant = new PowerPlant(
      'plants.json',
      PLANTS_ANNUAL_NET_GENERATION_KEY,
      PLANTS_STATE_ABBREVIATION_KEY,
    );
  });

  describe('filterTopNPlants', () => {
    it('should return top N plants by annual net generation', async () => {
      jest.spyOn(powerPlant, 'getData').mockResolvedValueOnce(powerPlantMock);
      const sortedPlants = await powerPlant.filterTopNPlants(5);
      expect(sortedPlants).toHaveLength(5);
      expect(sortedPlants[0][PLANTS_ANNUAL_NET_GENERATION_KEY]).toEqual(177115);
    });

    it('should throw an error if no data is available', async () => {
      jest.spyOn(powerPlant, 'getData').mockResolvedValueOnce([]);
      await expect(powerPlant.filterTopNPlants(5)).rejects.toThrow('No data for Power Plants found');
    });

    it('should return error if file path is wrong', async () => {
      await expect(powerPlant.filterTopNPlants(5)).rejects.toThrow('file does not exist!');
    });
  });

  describe('filterPlantsByState', () => {
    it('should return plants filtered by state', async () => {
      jest.spyOn(powerPlant, 'getData').mockResolvedValueOnce(powerPlantMock);
      const filteredPlants = await powerPlant.filterPlantsByState('AK');
      expect(filteredPlants).toHaveLength(12);
    });

    it('should return plants filtered by state', async () => {
      jest.spyOn(powerPlant, 'getData').mockResolvedValueOnce(powerPlantMock);
      const filteredPlants = await powerPlant.filterPlantsByState('TX');
      expect(filteredPlants).toHaveLength(1);
    });

    it('should throw an error if no state is found', async () => {
      jest.spyOn(powerPlant, 'getData').mockResolvedValueOnce(powerPlantMock);
      await expect(powerPlant.filterPlantsByState('u')).rejects.toThrow('state not found!');
    });

    it('should throw an error if no data is available', async () => {
      jest.spyOn(powerPlant, 'getData').mockResolvedValueOnce([]);
      await expect(powerPlant.filterPlantsByState('CA')).rejects.toThrow('No data for Power Plants found');
    });
  });
});
