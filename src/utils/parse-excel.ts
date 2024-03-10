import * as path from 'path';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import {PLANTS_ANNUAL_NET_GENERATION_KEY} from 'src/power-plants/constants';

// get base dir
const baseDir = process.cwd();

/**
 * parse the excel file into 3 sheets
 * 1. PLNT21: This sheet contains the powerplants data
 * 2. ST21: This sheet contains the powerplants data by states
 * 3. US21: This sheet contains the powerplants data by country
 *  */
export async function parseSheet(filePath: string, sheetName: string, outputFilePath: string): Promise<void> {
  const fullFilePath = path.join(baseDir, filePath);
  const workbook = xlsx.readFile(fullFilePath);
  const sheet = workbook.Sheets[sheetName];
  let jsonData = xlsx.utils.sheet_to_json(sheet);

  // Filter out objects that do not contain the key 'Plant annual net generation (MWh)'
  // We need to clean the file so that sorting in the api call does not fail
  if (sheetName === 'PLNT21') {
    jsonData = jsonData.filter((obj: any) => PLANTS_ANNUAL_NET_GENERATION_KEY in obj);
  }
  jsonData.shift();
  const jsonContent = JSON.stringify(jsonData, null, 2);
  const fullOutputFilePath = path.join(baseDir, outputFilePath);

  // Write the filtered JSON content to the output file
  fs.writeFileSync(fullOutputFilePath, jsonContent, 'utf-8');
}

parseSheet('eGRID2021_data.xlsx', 'PLNT21', 'src/data-files/power_plants_data.json');
parseSheet('eGRID2021_data.xlsx', 'ST21', 'src/data-files/state_power_plants_data.json');
parseSheet('eGRID2021_data.xlsx', 'US21', 'src/data-files/country_power_plants_data.json');
