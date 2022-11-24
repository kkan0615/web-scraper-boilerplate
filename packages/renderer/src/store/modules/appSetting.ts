// stores/counter.js
import { defineStore } from 'pinia'
import { AppSetting } from '@/types/appSetting'

type State = AppSetting

export const useAppSettingStore = defineStore('appSetting', {
  state: (): State => {
    return {
      autoLaunch: false,
      trayExit: true,
      downloadPath: ''
    }
  },
  actions: {
    setState(args: AppSetting) {
      this.autoLaunch = args.autoLaunch
      this.trayExit = args.trayExit
      this.downloadPath = args.downloadPath
    },
  },
})
