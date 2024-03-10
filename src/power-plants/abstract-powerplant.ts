// abstract-data-provider.ts
import {readFileAsStream} from '../utils/read-file';
import {PowerPlantResponseObject} from './types/PlantsDataType';
import {FILE_PATHS} from './constants';
import {CustomError} from '../error';

export abstract class AbstractPowerPlant {
  protected filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async getData(): Promise<PowerPlantResponseObject> {
    if (FILE_PATHS.includes(this.filePath)) {
      const fileStream = await readFileAsStream(this.filePath);
      if (fileStream) {
        const jsonFile = JSON.parse(fileStream);
        return jsonFile;
      }
    } else {
      throw new CustomError('file does not exist!');
    }
  }
}
