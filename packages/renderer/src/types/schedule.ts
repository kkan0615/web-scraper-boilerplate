export interface Schedule {
  id: string
  hour: number // 0 to 23
  minute: number // 0 to 59
  day: number // 0 is Monday 7 is Sunday
  isOn: boolean
  scraps: string[],
  isDefault: boolean
}

export const DayMap: Record<number, string> = {
  0: 'sunday',
  1: 'monday',
  2: 'tuesday',
  3: 'wednesday',
  4: 'thursday',
  5: 'friday',
  6: 'saturday',
}
