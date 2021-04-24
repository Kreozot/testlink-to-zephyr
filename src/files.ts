import * as fs from 'fs';
import { parseStringPromise } from 'xml2js';
import * as csvStringify from 'csv-stringify';

export async function parseXml(xmlString: string) {
  return parseStringPromise(xmlString);
}

export function openXml(filename: string): string {
  return String(fs.readFileSync(filename));
}

export async function stringify(csvStrings: string[][]): Promise<string> {
  return new Promise((resolve, reject) => {
    const data = [];
    const stringifier = csvStringify({
      delimiter: ';',
    });
    stringifier.on('readable', function() {
      let row;
      while (row = stringifier.read()) {
        data.push(row);
      }
    });
    stringifier.on('error', function(err) {
      reject(err);
    });
    stringifier.on('finish', function() {
      resolve(data.join(''));
    });
    csvStrings.forEach((csvString) => stringifier.write(csvString));
    stringifier.end();
  });
}

export function save(csv, filename) {
  fs.writeFileSync(filename, csv, 'utf8');
}