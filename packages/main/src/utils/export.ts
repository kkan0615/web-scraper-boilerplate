// https://www.npmjs.com/package/exceljs
import execljs from 'ExcelJS'
import { app } from 'electron'
import fs from 'fs/promises'
import { fileNameCheck } from './file'
import puppeteer from 'puppeteer'

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

export const exportToPDF = async (page: puppeteer.Page) => {
  let filePath = `${app.getPath('downloads')}/awesome-test-pdf.pdf`
  let i = 0
  while (await fileNameCheck(filePath)) {
    filePath = `${app.getPath('downloads')}/awesome-test-pdf (${++i}).pdf`
  }
  const pdf = await page.pdf({
    path: filePath,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  })

  return pdf
}

export const exportToPDFWithStr = async (str: string) => {
  // const pdf = new jsPDF()
  let filePath = `${app.getPath('downloads')}/awesome-test-pdf.pdf`
  let i = 0
  while (await fileNameCheck(filePath)) {
    filePath = `${app.getPath('downloads')}/awesome-test-pdf (${++i}).pdf`
  }

  const htmlEl = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>PDF</title>
      </head>
      <body>
        <div>
          body text
        </div>
      </body>
      <style>
        body {
        color: black;
        }
      </style>
    </html>
  `
  // Create a browser instance
  const browser = await puppeteer.launch()

  // Create a new page
  const page = await browser.newPage()

  //Get HTML content from HTML file
  // const html = fs.readFileSync('sample.html', 'utf-8');
  await page.setContent(htmlEl, { waitUntil: 'domcontentloaded' })

  // To reflect CSS used for screens instead of print
  await page.emulateMediaType('screen')

  // Downlaod the PDF
  const pdf = await page.pdf({
    path: filePath,
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  })

  // Close the browser instance
  await browser.close()
}
