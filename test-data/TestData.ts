import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';


function bindRow<T extends Record<string, any>>(row: T): T {
  return new Proxy(row, {
    get(target, prop, receiver) {
      // Allow symbols (inspect, util, etc.)
      if (typeof prop === 'symbol') {
        return Reflect.get(target, prop, receiver);
      }

      // Prevent await / thenable issues
      if (prop === 'then') {
        return undefined;
      }

      // Allow default object methods
      if (prop in Object.prototype) {
        return Reflect.get(target, prop, receiver);
      }

      if (!(prop in target)) {
        throw new Error(
          `Excel column "${String(prop)}" not found. Available columns: ${Object.keys(target).join(', ')}`
        );
      }

      return target[prop];
    },
  });
}


function readExcelRow(
  sheetName: string,
  rowIndex = 0
): Record<string, any> {
  const excelPath = path.resolve(process.env.DATA_PATH!);

  if (!fs.existsSync(excelPath)) {
    throw new Error(`Excel file not found at ${excelPath}`);
  }

  const workbook = XLSX.readFile(excelPath);
  const sheet = workbook.Sheets[sheetName];

  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found in TestData.xlsx`);
  }

  const rows = XLSX.utils.sheet_to_json<Record<string, any>>(sheet, {
    defval: '',
  });

  if (!rows[rowIndex]) {
    throw new Error(
      `Row ${rowIndex + 1} not found in sheet "${sheetName}"`
    );
  }

  return rows[rowIndex];
}


export function useData(
  sheetName: string,
  rowIndex = 0
) {
  const row = readExcelRow(sheetName, rowIndex);
  return bindRow(row);
}
