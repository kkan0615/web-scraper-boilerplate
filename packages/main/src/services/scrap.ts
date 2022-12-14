import scrapUtil from '../utils/scrap'
import {
  ExcelArgSheet,
  exportToExcel,
  exportToImages,
  exportToPDF,
  exportToPDFWithTemplate,
  exportToTxt
} from '../utils/export'
import { getScrapSetting } from '../stores/setting'

export const scrapXLSXTestService = async () => {
  try {
    const scrapSetting = getScrapSetting()
    const result = await scrapUtil.scrapTableForTest()

    const sheets: ExcelArgSheet[] = [{
      name: 'NCS-Chill',
      columns: [
        { key: 'audio', header: 'audio', width: 50 },
        { key: 'image', header: 'image', width: 50 },
        { key: 'name', header: 'name', width: 35 },
        { key: 'author', header: 'author', width: 35 },
        { key: 'releaseDate', header: 'release date', width: 15 },
        { key: 'tags', header: 'tags', width: 60 },
      ],
      data: result,
    } as ExcelArgSheet]
    await exportToExcel(scrapSetting.fileNames.xlsx, {
      fileExt: 'xlsx',
      sheets: sheets,
    })

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const scrapCSVTestService = async () => {
  try {
    const scrapSetting = getScrapSetting()
    const result = await scrapUtil.scrapTableForTest()

    const sheets: ExcelArgSheet[] = [{
      name: 'NCS-Chill',
      columns: [
        { key: 'audio', header: 'audio', width: 50 },
        { key: 'image', header: 'image', width: 50 },
        { key: 'name', header: 'name', width: 35 },
        { key: 'author', header: 'author', width: 35 },
        { key: 'releaseDate', header: 'release date', width: 15 },
        { key: 'tags', header: 'tags', width: 60 },
      ],
      data: result,
    } as ExcelArgSheet]
    await exportToExcel(scrapSetting.fileNames.csv, {
      fileExt: 'csv',
      sheets: sheets,
    })

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const scrapTextTestService = async () => {
  try {
    const scrapSetting = getScrapSetting()
    const result = await scrapUtil.scrapTableForTest()

    await exportToTxt(scrapSetting.fileNames.txt, result)

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const scrapPDFTestService = async () => {
  try {
    const scrapSetting = getScrapSetting()
    const { page: result, browser } = await scrapUtil.scrapPageForTest()

    await exportToPDF(scrapSetting.fileNames.pdf, result)

    await browser.close()
    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const scrapPDFTWithTemplateService = async () => {
  try {
    const scrapSetting = getScrapSetting()
    const result = await scrapUtil.scrapAmazonProductsForTest()

    await exportToPDFWithTemplate(scrapSetting.fileNames['pdf-with-template'], result)

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const scrapImagesTestService = async () => {
  try {
    const scrapSetting = getScrapSetting()
    const result = await scrapUtil.scrapImagesForTest()

    await exportToImages(scrapSetting.fileNames['images'], result)

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export default {
  scrapXLSXTestService,
  scrapCSVTestService,
  scrapTextTestService,
  scrapPDFTestService,
  scrapPDFTWithTemplateService,
  scrapImagesTestService,
}
