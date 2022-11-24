// https://www.npmjs.com/package/exceljs
import execljs from 'ExcelJS'
import { app } from 'electron'
import fs from 'fs/promises'
import { fileNameCheck } from './file'
import puppeteer from 'puppeteer'
import path from 'path'
import { getAppSetting } from '../stores/setting'
import { testTemplate } from '../templates/test'

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
  const appSetting = getAppSetting()
  const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')
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
  let fileNameWithPath = `${filePath}/${arg.fileName}.${arg.fileExt}`
  let i = 0
  while (await fileNameCheck(fileNameWithPath)) {
    fileNameWithPath = `${filePath}/${arg.fileName} (${++i}).txt`
  }
  let buf = undefined
  if(arg.fileExt === 'xlsx') {
    // It returns Array buffer. Look at the documents
    buf = await workbook.xlsx.writeBuffer()
  } else if (arg.fileExt === 'csv') {
    // It returns Array buffer. Look at the documents
    buf = await workbook.csv.writeBuffer()
  }
  if (buf)
    await fs.writeFile(fileNameWithPath, Buffer.from(buf))
}

export const exportToTxt = async (data: any[]) => {
  const appSetting = getAppSetting()
  const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')

  let fileContent = ''
  for (let i = 0; i < data.length; i++) {
    fileContent += data[i].toString()
    fileContent += '\n'
  }
  let fileNameWithPath = `${filePath}/${'awesome-test'}.txt`
  let i = 0
  while (await fileNameCheck(fileNameWithPath)) {
    fileNameWithPath = `${filePath}/${'awesome-test'} (${++i}).txt`
  }
  await fs.writeFile(fileNameWithPath, fileContent)
}

export const exportToPDF = async (page: puppeteer.Page) => {
  const appSetting = getAppSetting()
  const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')

  let fileNameWithPath = `${filePath}/awesome-test-pdf.pdf`
  let i = 0
  while (await fileNameCheck(fileNameWithPath)) {
    fileNameWithPath = `${filePath}/awesome-test-pdf (${++i}).pdf`
  }
  const pdf = await page.pdf({
    path: fileNameWithPath,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  })

  return pdf
}

export const exportToPDFWithTemplate = async () => {
  const appSetting = getAppSetting()
  const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')
  // const pdf = new jsPDF()
  let fileNameWithPath = `${filePath}/awesome-test-pdf.pdf`
  let i = 0
  while (await fileNameCheck(fileNameWithPath)) {
    fileNameWithPath = `${filePath}/awesome-test-pdf (${++i}).pdf`
  }

  const htmlEl = testTemplate
  // Create a browser instance
  const browser = await puppeteer.launch()

  // Create a new page
  const page = await browser.newPage()

  //Get HTML content from HTML file
  await page.setContent(htmlEl, { waitUntil: 'domcontentloaded' })

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen')

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: fileNameWithPath,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  })

  // Close the browser instance
  await browser.close()
}
