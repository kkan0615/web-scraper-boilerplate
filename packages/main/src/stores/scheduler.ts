import { electronStore } from './index'
import { defaultSchedules, Schedule } from '../types/schedule'

export const getSchedules = (): Schedule[] => {
  const schedules = electronStore.get('schedules') as Schedule[] | undefined

  if (schedules) {
    // Add default schedules
    defaultSchedules.map(defaultSchedule => {
      const index = schedules.findIndex(schedule => schedule.id === defaultSchedule.id)
      if (index === -1)
        schedules.push(defaultSchedule)
    })
    return schedules
  }

  return defaultSchedules
}

export const addSchedule = (schedule: Omit<Schedule, 'id' | 'isDefault' | 'isOn'>) => {
  const schedules = getSchedules()
  const newId = new Date().toISOString()

  electronStore.set('schedules', schedules.concat([{
    id: new Date().toISOString(),
    ...schedule,
    isOn: true,
    isDefault: false,
  }]))

  return newId
}

export const updateSchedule = (schedule: Partial<Schedule>) => {
  const schedules = getSchedules()
  const index = schedules.findIndex(el => el.id === schedule.id)
  if (index === -1)
    throw new Error('schedule is not found by id')

  schedules[index] = {
    ...schedules[index],
    ...schedule,
  }

  electronStore.set('schedules', schedules)

  return 1
}

export const deleteSchedule = (id: string) => {
  const schedules = getSchedules()

  electronStore.set('schedules', schedules.filter((schedule) => schedule.id !== id))

  return 1
}
