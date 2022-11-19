const common = {
  test: 'Hello World',
  commons: {
    tooltips: {
      search: 'search',
      edit: 'edit',
      delete: 'delete',
      ok: 'ok',
      back: 'back'
    },
    btns: {
      create: 'create',
      save: 'save',
      cancel: 'cancel',
      edit: 'edit',
      delete: 'delete',
      search: 'search',
      send: 'send',
      copyURL: 'copy URL',
      start: 'start',
    },
    titles: {
      cancel: 'cancel',
      delete: 'delete',
      total: 'total',
      attachment: 'attachment',
      comment: 'comment',
      information: 'information',
      overview: 'overview',
      language: 'language'
    },
    messages: {
      cancelSave: 'Would you like to cancel save?',
      saved: 'Success to saved',
      saveFailed: 'Fail to save',
      unAuthUser: 'unauthorized user',
      error: 'There is an error',
      startWorkFailed: 'Fail to start to work',
      offWorkFailed: 'Fail to get off the work',
      noImg: 'No Image',
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
      settingScrapping: 'scrapping',
    }
  },
  views: {
    Home: {
      pageTitle: 'home',
      scrapping: 'Scrapping'
    },
  },
}

const enDictionary = {
  ...common,
  ...own,
}

export default enDictionary
