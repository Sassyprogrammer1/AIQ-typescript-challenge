export interface IStateObject {
  absoluteNetGen: number;
  stateNetGenPerc: number;
}

export interface IState {
  absoluteAnnualNetGeneration(stateAbr: string): Promise<number>;
  statesAnnualNetGenerationPercentage(stateAnnualNetGen: number): Promise<number>;
  calculateStats(stateAbr: string): Promise<IStateObject>;
}
