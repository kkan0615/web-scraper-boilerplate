// https://www.npmjs.com/package/exceljs
import execljs from 'ExcelJS'
import { app } from 'electron'
import fs from 'fs/promises'
import { fileNameCheck } from './file'
import puppeteer from 'puppeteer'
import { getAppSetting } from '../stores/setting'
import { testTemplate } from '../templates/test'
import $ from 'cheerio'
import axios from 'axios'

export interface ExcelArgSheet {
  name: string
  columns?: any[]
  data: any[]
}

export interface ExcelArg {
  fileExt: 'xlsx' | 'csv'
  sheets: ExcelArgSheet[]
}

export const exportToExcel = async (fileName: string, arg: ExcelArg) => {
  const appSetting = getAppSetting()
  const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')
  // Create workbook
  const workbook = new execljs.Workbook()
  workbook.created = new Date()
  arg.sheets.map((sheetEl: ExcelArgSheet) => {
    // Create sheet
    const sheet = workbook.addWorksheet(sheetEl.name)
    // Add columns
    sheet.columns = sheetEl.columns || []
    // Add rows
    sheet.addRows(sheetEl.data)
  })
  // Output xlsx type
  let fileNameWithPath = `${filePath}/${fileName}.${arg.fileExt}`
  let i = 0
  while (await fileNameCheck(fileNameWithPath)) {
    fileNameWithPath = `${filePath}/${fileName} (${++i}).${arg.fileExt}`
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

export const exportToTxt = async (filename: string, data: any[]) => {
  try {
    const appSetting = getAppSetting()
    const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')

    let fileContent = ''
    for (let i = 0; i < data.length; i++) {
      fileContent += JSON.stringify(data[i])
      fileContent += '\n'
    }
    let fileNameWithPath = `${filePath}/${filename}.txt`
    let i = 0
    while (await fileNameCheck(fileNameWithPath)) {
      fileNameWithPath = `${filePath}/${filename} (${++i}).txt`
    }
    await fs.writeFile(fileNameWithPath, fileContent)

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const exportToPDF = async (filename: string, page: puppeteer.Page) => {
  try {
    const appSetting = getAppSetting()
    const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')

    let fileNameWithPath = `${filePath}/${filename}.pdf`
    let i = 0
    while (await fileNameCheck(fileNameWithPath)) {
      fileNameWithPath = `${filePath}/${filename} (${++i}).pdf`
    }

    await page.pdf({
      path: fileNameWithPath,
      margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
      printBackground: true,
      format: 'A4',
    })

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const exportToPDFWithTemplate = async (filename: string, result: any) => {
  const appSetting = getAppSetting()
  const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')
  // const pdf = new jsPDF()
  let fileNameWithPath = `${filePath}/${filename}.pdf`
  let i = 0
  while (await fileNameCheck(fileNameWithPath)) {
    fileNameWithPath = `${filePath}/${filename} (${++i}).pdf`
  }

  const htmlEl = testTemplate(result)
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

export const exportToImages = async (foldername: string, images: string[]) => {
  try {
    const appSetting = getAppSetting()
    const filePath = appSetting.downloadPath ? appSetting.downloadPath : app.getPath('downloads')

    let folderPath = `${filePath}/${foldername}`
    let i = 0
    while (await fileNameCheck(folderPath)) {
      folderPath = `${filePath}/${foldername} (${++i})`
    }

    await fs.mkdir(folderPath)
    await Promise.all(images.map(async (src, i) => {
      // Get price symbol
      if(src && src.split('.')[1] !== 'svg') {
        const res = await axios.get(src, {
          responseType: 'arraybuffer'
        })

        await fs.writeFile(`${folderPath}/image (${i}).png`, res.data)
      }
    }))

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}
