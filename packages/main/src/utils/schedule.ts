import { getSchedules } from '../stores/scheduler'
import { scheduleJob } from 'node-schedule'

export const initSchedules = () => {
  const schedules = getSchedules()
  schedules.filter(schedule => schedule.isOn).map(schedule => {
    scheduleJob(`0 ${schedule.minute} ${schedule.hour} * * ${schedule.day}`, () => {
      console.log(`Testing: ${JSON.stringify(schedule)}`)
    })
  })
}
