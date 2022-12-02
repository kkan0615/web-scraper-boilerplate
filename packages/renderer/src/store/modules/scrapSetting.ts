// stores/counter.js
import { defineStore } from 'pinia'
import { ScrapSetting } from '@/types/scrapSetting'

type State = ScrapSetting

export const useScrapSettingStore = defineStore('scrapSetting', {
  state: (): State => {
    return {
      fileNames: {
        xlsx: '',
        csv: '',
        pdf: '',
        'pdf-with-template': '',
        txt: '',
        videos: '',
        images: ''
      }
    }
  },
  actions: {
    setState(args: ScrapSetting) {
      this.fileNames = args.fileNames
    },
  },
})
