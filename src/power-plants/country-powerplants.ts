import {Inject, NotFoundException} from '@nestjs/common';
import {AbstractPowerPlant} from './abstract-powerplant';
import {ICountryPowerPlants} from './interfaces/country-powerplants.interface';
import {CustomError} from '../error';

export class CountryPowerPlants extends AbstractPowerPlant implements ICountryPowerPlants {
  constructor(
    @Inject('COUNTRY_POWER_PLANTS_JSON_PATH') private readonly countryJsonPath: string,
    @Inject('USA_ABSOLUTE_ANNUAL_NET_GENERATION_KEY')
    private readonly USAAnnualNetGenerationKey: string,
  ) {
    super(countryJsonPath);
  }

  async absoluteAnnualNetGeneration(): Promise<number> {
    const data = await this.getData();
    if (data && data.length > 0) {
      const countryAnnualNetGenKey = this.USAAnnualNetGenerationKey;
      return data[0][`${countryAnnualNetGenKey}`] as number;
    }
    throw new CustomError('No data for Country Power Plants found!');
  }
}
