// https://www.npmjs.com/package/exceljs
import execljs from 'ExcelJS'
import { app } from 'electron'

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
  const filePath = `${app.getPath('downloads')}/${arg.fileName}.${arg.fileExt}`
  if(arg.fileExt === 'xlsx') {
    await workbook.xlsx.writeFile(filePath)
  } else if (arg.fileExt === 'csv') {
    await workbook.csv.writeFile(filePath)
  }

}
