import scrapUtil from '../utils/scrap'
import { exportToExcel } from '../utils/export'
import { getScrapSetting } from '../stores/setting'

export const scrapXLSXTestService = async () => {
  try {
    const scrapSetting = getScrapSetting()
    const result = await scrapUtil.scrapTableForTest()

    await exportToExcel({
      fileName: scrapSetting.fileNames.xlsx,
      fileExt: 'xlsx',
      sheets: result,
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

    await exportToExcel({
      fileName: scrapSetting.fileNames.csv,
      fileExt: 'csv',
      sheets: result,
    })

    return true
  } catch (e) {
    console.error(e)
    throw e
  }
}

export default {
  scrapXLSXTestService,
  scrapCSVTestService,
}
