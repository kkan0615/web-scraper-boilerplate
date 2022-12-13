const common = {
  test: 'Hello World',
  commons: {
    tooltips: {
      add: 'add',
      search: 'search',
      edit: 'edit',
      delete: 'delete',
      ok: 'ok',
      back: 'back'
    },
    btns: {
      add: 'add',
      create: 'create',
      save: 'save',
      cancel: 'cancel',
      edit: 'edit',
      delete: 'delete',
      search: 'search',
      send: 'send',
      reset: 'reset',
      copyURL: 'copy URL',
      start: 'start',
    },
    titles: {
      version: 'version',
      currentVersion: 'current version',
      cancel: 'cancel',
      delete: 'delete',
      total: 'total',
      attachment: 'attachment',
      comment: 'comment',
      information: 'information',
      overview: 'overview',
      language: 'language',
      about: 'about',
    },
    messages: {
      saved: 'Success to saved',
      saveFailed: 'Fail to save',
      unAuthUser: 'unauthorized user',
      error: 'There is an error',
      noImg: 'no Image',
      noData: 'no data',
      notMatched: 'It is not matched',
      validations: {
        required: '{field} field is required',
        lengthMin: '{length} is minimum',
        lengthMax: '{length} is maximum',
        integer: 'Type number more than 0',
        notMatched: '{field1} is not matched with {field2}',
        passwordRule1: 'Password must include special character',
        passwordRule2: 'Password must include at least one capital letter',
      },
      questions: {
        delete: 'Would you like to delete?',
      }
    },
    placeholders: {
      noData: 'No data',
    },
    labels: {
      action: 'action',
      languages: {
        en: 'English',
        ko: '한국어'
      },
      dayOfWeek:{
        sunday: 'sunday',
        monday: 'monday',
        tuesday: 'tuesday',
        wednesday: 'wednesday',
        thursday: 'thursday',
        friday: 'friday',
        saturday: 'saturday',
        short: {
          sunday: 'sun',
          monday: 'mon',
          tuesday: 'tue',
          wednesday: 'wed',
          thursday: 'thu',
          friday: 'fri',
          saturday: 'sat',
        }
      },
    },
    types: {
      models: {
        views: {
          item  : {
            name: 'name',
          },
        },
      },
    },
  },
}

const own = {
  tooltips: {
    startScrapping: 'start to scrapping',
    fileExts: {
      downloads: {
        pdf: 'download as .pdf',
        csv: 'download as .csv',
        xlsx: 'download as .xlsx',
        txt: 'download as .text',
      }
    },
    menus: {
      setting: 'go to setting page',
    }
  },
  titles: {
    menus: {
      settingGeneral: 'general',
      SettingScrap: 'scrap',
      SettingSchedule: 'schedule',
      settingVersion: 'version',
    },

  },
  types: {
    appSetting: {
      autoLaunch: 'auto launch',
      downloadPath: 'download path',
      labels: {
        autoLaunch: 'Launch App when you boot computer',
        trayExit: 'Use tray mode when exit the window',
      }
    },
    schedule: {
      hour: 'hour',
      minute: 'minute',
      day: 'day',
    }
  },
  views: {
    Home: {
      errorMsg: 'Please try again some times later',
      instruction: 'press button to start',
      pageTitle: 'home',
      scrapping: 'Scrapping'
    },
    settings: {
      general: {
        language: 'language'
      }
    }
  },
}

export default {
  ...common,
  ...own,
}
