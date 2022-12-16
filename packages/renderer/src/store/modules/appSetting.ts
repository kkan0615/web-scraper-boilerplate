import { defineStore } from 'pinia'
import { AppSetting } from '@/types/appSetting'

type State = AppSetting

export const useAppSettingStore = defineStore('appSetting', {
  state: (): State => {
    return {
      autoLaunch: false,
      trayOnLaunch: false,
      trayExit: true,
      downloadPath: '',
      language: '',
    }
  },
  actions: {
    setState(args: AppSetting) {
      this.autoLaunch = args.autoLaunch
      this.trayOnLaunch = args.trayOnLaunch
      this.trayExit = args.trayExit
      this.downloadPath = args.downloadPath
      this.language = args.language
    },
  },
})
