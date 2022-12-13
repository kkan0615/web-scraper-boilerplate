export interface Schedule {
  id: string
  hour: number // 0 to 23
  minute: number // 0 to 59
  day: number // 1 is Monday 7 is Sunday
  isOn: boolean
  scraps: string[],
  isDefault: boolean
}

/**
 * Change the schedules that user wants
 */
export const defaultSchedules: Schedule[] = [
  {
    id: 'DEFAULT-1',
    hour: 15,
    minute: 44,
    day: 2,
    isOn: true,
    scraps: ['xlsx'],
    isDefault: true
  },
]
