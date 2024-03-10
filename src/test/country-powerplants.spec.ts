import {CountryPowerPlants} from '../power-plants/country-powerplants';
import {CustomError} from '../error';
import {countryMock} from '../mocks/country-mock';
import {USA_ABSOLUTE_ANNUAL_NET_GENERATION_KEY} from '../power-plants/constants';

describe('CountryPowerPlants', () => {
  let countryPowerPlants: CountryPowerPlants;

  beforeEach(() => {
    countryPowerPlants = new CountryPowerPlants(
      'COUNTRY_POWER_PLANTS_JSON',
      USA_ABSOLUTE_ANNUAL_NET_GENERATION_KEY,
    );
  });

  describe('absoluteAnnualNetGeneration', () => {
    it('should return absolute annual net generation if data is available', async () => {
      const mockGetData = jest.spyOn(countryPowerPlants, 'getData').mockResolvedValue(countryMock);
      const result = await countryPowerPlants.absoluteAnnualNetGeneration();
      expect(result).toEqual(countryMock[0][USA_ABSOLUTE_ANNUAL_NET_GENERATION_KEY]);
      expect(mockGetData).toHaveBeenCalled();
    });

    it('should return error if file path is wrong', async () => {
      await expect(countryPowerPlants.absoluteAnnualNetGeneration()).rejects.toThrow('file does not exist!');
    });

    it('should throw a CustomError if no data is available', async () => {
      const mockGetData = jest.spyOn(countryPowerPlants, 'getData').mockResolvedValue([]);

      await expect(countryPowerPlants.absoluteAnnualNetGeneration()).rejects.toThrow(
        'No data for Country Power Plants found',
      );
      expect(mockGetData).toHaveBeenCalled();
    });
  });
});
