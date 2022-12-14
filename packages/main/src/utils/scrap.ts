import puppeteer from 'puppeteer'
import $ from 'cheerio'
import isDev from 'electron-is-dev'

export const scrapAmazonProductsForTest = async () => {
  // Launch browser
  const browser = await puppeteer.launch({
    // devtools: isDev
    // headless: true,
  })
  // Open page
  const page = await browser.newPage()
  // Move to url
  await page.goto('https://www.amazon.ca', {
    waitUntil: 'networkidle2',
  })

  /* Search with input */
  /* Search with input */
  await page.waitForSelector('#twotabsearchtextbox')
  // Add input data to serach input field
  await page.$eval('#twotabsearchtextbox', el => (el as HTMLInputElement).value = 'silent red switches')
  // Press search button
  await page.click('#nav-search-submit-button')
  await page.waitForNavigation({
    waitUntil: 'networkidle2'
  })
  // Get the page DOM
  const pageHTML = await page.evaluate(() => document.body.innerHTML)
  // Use Cheerio to phaser DOM
  const result: Record<string, any>[] = []
  $('div[data-component-type="s-search-result"]', pageHTML).each((i, el) => {
    // Get price symbol
    const priceSymbol = $(el).find('.a-price-symbol').text()
    // Get sale and original price
    const foundPriceWhole = $(el).find('.a-offscreen')
    const priceWhole = foundPriceWhole.length >= 2 ? foundPriceWhole.last().text() : ''
    const salePriceWhole = foundPriceWhole.length >= 2 ? foundPriceWhole.first().text() : foundPriceWhole.text()
    // Get the name
    const name = $(el).find('[class="a-size-base-plus a-color-base a-text-normal"]').text()

    result.push({
      name,
      priceSymbol,
      salePriceWhole,
      priceWhole,
    })
  })

  await browser.close()

  return result
}

/**
 * Scrap NCS Chill pages with pagination
 */
export const scrapTableForTest = async () => {
  // Launch browser
  const browser = await puppeteer.launch({
    // devtools: isDev
    // headless: true,
  })
  // Open page
  const page = await browser.newPage()
  // Move to url
  await page.goto('https://ncs.io/music-search?q=&genre=2&mood=', {
    waitUntil: 'networkidle2',
  })
  // Get the page DOM
  let pageHTML = await page.evaluate(() => document.body.innerHTML)
  // Use Cheerio to phaser DOM
  let result: any[] = []

  let maxPagination = $('.pagination > li', pageHTML).length || 1
  if (maxPagination > 2) {
    // Remove prev and next
    maxPagination -= 2
  }
  for (let i = 0; i < maxPagination; i++) {
    const tbodyTrEls = $('article:nth-child(3) > div > table > tbody > tr', pageHTML)
    tbodyTrEls.each((tri, el) => {
      const tdEls = $(el).find('td')
      const data = []
      data.push($(tdEls[0]).find('a').attr('data-url') || '')
      data.push($(tdEls[2]).find('a > img').attr('src') || '')
      data.push($(tdEls[3]).find('a > p').text())
      data.push($(tdEls[3]).find('span').text())
      data.push($(tdEls[5]).text())
      const tags: string[] = []
      $('a', tdEls[4]).each((j, tagAel) => {
        tags.push($(tagAel).text())
      })
      data.push(tags.join(', '))
      result.push(data)
    })

    const nextHref = $('a[rel="next"]', pageHTML).attr('href') || ''
    if (nextHref) {
      await page.goto(nextHref, {
        waitUntil: 'networkidle2',
      })

      // Get the page DOM
      pageHTML = await page.evaluate(() => document.body.innerHTML)
    }
  }

  await browser.close()
  return result
}

export const scrapImagesForTest = async () => {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      devtools: isDev,
      headless: true,
    })
    // Open page
    const page = await browser.newPage()
    // Move to url
    await page.goto('https://www.freepik.com/search?format=search&last_filter=selection&last_value=1&query=coffee&selection=1', {
      waitUntil: 'networkidle2',
    })

    let result: string[] = []
    // Get the page DOM
    const pageHTML = await page.evaluate(() => document.body.innerHTML)
    $('.row > .showcase__item', pageHTML).map( async (i, el) => {
      // Get price symbol
      let src = $(el).attr('data-image')
      if(src && src.split('.')[1] !== 'svg') {
        result.push(src)
      }
    })

    await browser.close()
    return result
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const scrapPageForTest = async () => {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      // devtools: isDev
      // headless: true,
    })
    // Open page
    const page = await browser.newPage()
    // Move to url
    await page.goto('https://stackoverflow.com/questions/18191893/generate-pdf-from-html-in-div-using-javascript', {
      waitUntil: 'networkidle2',
    })

    return { page, browser }
  } catch (e) {
    console.error(e)
    throw e
  }
}
export const scrapingPDFWithTemplate = async () => {
  try {
    // Launch browser
    const browser = await puppeteer.launch({
      // devtools: isDev
      // headless: true,
    })
    // Open page
    const page = await browser.newPage()
    // Move to url
    await page.goto('https://stackoverflow.com/questions/18191893/generate-pdf-from-html-in-div-using-javascript', {
      waitUntil: 'networkidle2',
    })
    // const pageHTML = await page.evaluate(() => document.body.innerHTML)
    // await exportToPDFWithTemplate('as')
    await browser.close()
    return 'success'
  } catch (e) {
    console.error(e)
    throw e
  }
}

export default {
  scrapAmazonProductsForTest,
  scrapTableForTest,
  scrapPageForTest,
  scrapImagesForTest,
}
