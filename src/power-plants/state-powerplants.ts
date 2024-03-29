import {Inject, NotFoundException} from '@nestjs/common';
import {IStateObject} from './interfaces/state-powerplants.interface';
import {IState} from './interfaces/state-powerplants.interface';
import {AbstractPowerPlant} from './abstract-powerplant';
import {ICountryPowerPlants} from './interfaces/country-powerplants.interface';
import {CustomError} from '../error';

export class StatePowerPlants extends AbstractPowerPlant implements IState {
  constructor(
    @Inject('STATE_POWER_PLANTS_JSON_PATH') private readonly statesJsonPath: string,
    @Inject('STATE_ABBREVIATION_KEY') private readonly stateAbrv: string,
    @Inject('STATES_ABSOLUTE_ANNUAL_NET_GENERATION_KEY') private readonly stateAnnualNetGeneration: string,
    @Inject('CountryPowerPlant') private readonly countryPowerPlants: ICountryPowerPlants,
  ) {
    super(statesJsonPath);
  }

  /**
   * @description
   * reads data from the states powerplants sheet and returns
   * the absoluteAnnualNetGeneration value for that state
   * @param string
   * @returns Promise<number>
   */
  async absoluteAnnualNetGeneration(stateAbr: string): Promise<number> {
    const data = await this.getData();
    if (data && data.length > 0) {
      const stateAbrvKey = this.stateAbrv;
      const stateAnnualNetGeneration = this.stateAnnualNetGeneration;
      const absoluteValueRow = data.find((row) => row[`${stateAbrvKey}`] === stateAbr);
      return absoluteValueRow[`${stateAnnualNetGeneration}`] as number;
    }
    throw new CustomError('No data for State Power Plants found!');
  }

  /**
   * @description
   * reads data from the countries powerplants sheet and calculates
   * the percentage of annualNetGen of the federal state out of country
   * @param number
   * @returns Promise<number>
   */
  async statesAnnualNetGenerationPercentage(stateAnnualNetGen: number): Promise<number> {
    const countrylAnnualNetGen = await this.countryPowerPlants.absoluteAnnualNetGeneration();
    return (stateAnnualNetGen / countrylAnnualNetGen) * 100;
  }

  /**
   * @description
   * returns the absolute value and the percentage as stats for the federal state
   * @param string
   * @returns Promise<IStateObject>
   */
  async calculateStats(stateAbr: string): Promise<IStateObject> {
    const stateAnnualNetGen = await this.absoluteAnnualNetGeneration(stateAbr);
    const stateAnnualNetGenPerc = await this.statesAnnualNetGenerationPercentage(stateAnnualNetGen);
    return {absoluteNetGen: stateAnnualNetGen, stateNetGenPerc: stateAnnualNetGenPerc};
  }
}
