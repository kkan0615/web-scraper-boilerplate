import { getSchedules } from '../stores/scheduler'
import { scheduledJobs, scheduleJob } from 'node-schedule'

export const initSchedules = () => {
  cancelAllSchedules()

  const schedules = getSchedules()
  schedules.filter(schedule => schedule.isOn).map(schedule => {
    scheduleJob(`0 ${schedule.minute} ${schedule.hour} * * ${schedule.day}`, () => {
      console.log(`Testing: ${JSON.stringify(schedule)}`)
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
