// https://www.npmjs.com/package/exceljs
import execljs from 'ExcelJS'
import { app } from 'electron'

interface ExcelArgSheet<T> {
  name: string
  data: T[]
}

interface ExcelArg<T> {
  sheet: Record<string, ExcelArgSheet<T>>
}

export const exportToExcel = async (fileName: string, data: any[]) => {
  // Create workbook
  const workbook = new execljs.Workbook()
  workbook.created = new Date()
  // Create sheet
  const sheet = workbook.addWorksheet('test sheet')
  sheet.columns = [
    { header: '에이', key: 'a' },
    { header: '비', key: 'b' },
  ]
  // Add data
  for (let i = 0; i < data.length; i++) {
    console.log(data[i])
    sheet.insertRow(1, data[i])
  }
  // const cell = sheet.getCell('C3')
  // cell.value = new Date(1968, 5, 1)
  // Output xlsx type
  await workbook.xlsx.writeFile(`${app.getPath('downloads')}/${fileName}`)
}
