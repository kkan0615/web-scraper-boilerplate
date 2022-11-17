// https://www.npmjs.com/package/exceljs
import execljs from 'ExcelJS'
import { app } from 'electron'
import fs from 'fs/promises'
import { fileNameCheck } from './file'

interface ExcelArgSheet {
  name: string
  columns?: any[]
  data: any[]
}

interface ExcelArg {
  fileName: string
  fileExt: 'xlsx' | 'csv'
  sheets: ExcelArgSheet[]
}

export const exportToExcel = async (arg: ExcelArg) => {
  // Create workbook
  const workbook = new execljs.Workbook()
  workbook.created = new Date()
  arg.sheets.map((sheetEl: ExcelArgSheet) => {
    // Create sheet
    const sheet = workbook.addWorksheet(sheetEl.name)
    // Add columns
    if (sheetEl.columns) {
      sheet.columns = sheetEl.columns
    }
    sheet.addRows(sheetEl.data)
  })
  // Output xlsx type
  let filePath = `${app.getPath('downloads')}/${arg.fileName}.${arg.fileExt}`
  let i = 0
  while (await fileNameCheck(filePath)) {
    filePath = `${app.getPath('downloads')}/${arg.fileName} (${++i}).txt`
  }
  if(arg.fileExt === 'xlsx') {
    await workbook.xlsx.writeFile(filePath)
  } else if (arg.fileExt === 'csv') {
    await workbook.csv.writeFile(filePath)
  }
}

export const exportToTxt = async (arg: {fileName: string, data: any[]}) => {
  let fileContent = ''
  for (let i = 0; i < arg.data.length; i++) {
    fileContent += arg.data[i].toString()
    fileContent += '\n'
  }
  let filePath = `${app.getPath('downloads')}/${arg.fileName}.txt`
  let i = 0
  while (await fileNameCheck(filePath)) {
    filePath = `${app.getPath('downloads')}/${arg.fileName} (${++i}).txt`
  }
  await fs.writeFile(filePath, fileContent)
}
