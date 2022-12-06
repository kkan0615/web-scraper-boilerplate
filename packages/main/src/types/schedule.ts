export interface Schedule {
  id: string
  hour: number // 0 to 23
  minute: number // 0 to 59
  day: number // 0 is Monday 7 is Sunday
  isOn: boolean
  isDefault: boolean
}

/**
 * Change the schedules that user wants
 */
export const defaultSchedules: Schedule[] = [
  {
    id: 'DEFAULT-1',
    hour: 20,
    minute: 50,
    day: 4,
    isOn: true,
    isDefault: true
  },
]
