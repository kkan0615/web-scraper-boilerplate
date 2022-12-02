import { electronStore } from './index'
import { defaultSchedules, Schedule } from '../types/schedule'

export const getSchedules = (): Schedule[] => {
  const schedules = electronStore.get('schedules') as Schedule[] | undefined
  if (schedules) {
    // Add default schedules
    defaultSchedules.map(defaultSchedule => {
      const index = schedules.findIndex(schedule => schedule.id === defaultSchedule.id)
      if (index === -1)
        schedules.push(schedules[index])
    })

    return schedules
  }

  return defaultSchedules
}

export const addSchedule = (schedule: Omit<Schedule, 'id'>) => {
  const schedules = electronStore.get('schedules') as Schedule[] | undefined
  return schedules || []
}

export const updateSchedule = (schedule: Partial<Schedule>) => {
  const schedules = electronStore.get('schedules') as Schedule[] | undefined
  return schedules || []
}

export const deleteSchedule = (id: string) => {
  const schedules = electronStore.get('schedules') as Schedule[] | undefined
  return schedules || []
}
