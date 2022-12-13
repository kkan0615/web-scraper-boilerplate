import { Notification } from 'electron'
import { getSchedules } from '../stores/scheduler'
import { scheduledJobs, scheduleJob } from 'node-schedule'
import scrapService from '../services/scrap'

export const initSchedules = () => {
  cancelAllSchedules()

  const schedules = getSchedules()
  schedules.filter(schedule => schedule.isOn).map(schedule => {
    scheduleJob(`0 ${schedule.minute} ${schedule.hour} * * ${schedule.day}`, async () => {
      try {
        await Promise.all(schedule.scraps.map(async (scrap) => {
          if (scrap === 'xlsx') {
            await scrapService.scrapXLSXTestService()
          } else if (scrap=== 'csv') {
            await scrapService.scrapCSVTestService()
          } else if (scrap === 'pdf') {
            await scrapService.scrapPDFTestService()
          } else if (scrap === 'pdfWithTemplate') {
            await scrapService.scrapPDFTWithTemplateService()
          } else if (scrap === 'txt') {
            await scrapService.scrapTextTestService()
          } else if (scrap === 'images') {
            await scrapService.scrapImagesTestService()
          }
        }))
      } catch (e) {
        console.error(e)
        new Notification({
          title: 'Error to scrap',
          body: 'Error to scrap in schedule'
        }).show()
      }
    })
  })
}

/**
 * Cancel all jobs
 */
export const cancelAllSchedules = () => {
  // Cancel all jobs
  const jobs = scheduledJobs
  for (const job in jobs ) {
    jobs[job].cancel()
  }
}
