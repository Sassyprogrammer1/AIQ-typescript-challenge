import * as fs from 'fs';

export function readFileAsStream(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath, {encoding: 'utf8'});
    let data = '';

    readStream.on('data', (chunk: string) => {
      data += chunk;
    });

    readStream.on('end', () => {
      resolve(data);
    });

    readStream.on('error', (error: Error) => {
      reject(error);
    });
  });
}
