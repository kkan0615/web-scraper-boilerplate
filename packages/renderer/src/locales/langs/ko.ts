const common = {
  test: 'Hello World',
  commons: {
    tooltips: {
      add: '추가',
      search: '검색',
      edit: '수정',
      delete: '삭제',
      ok: '확인',
      back: '뒤로가기'
    },
    btns: {
      add: '추가',
      create: '생성',
      save: '저장',
      cancel: '취소',
      edit: '수정',
      delete: '삭제',
      search: '검색',
      send: '보내기',
      reset: '초기화',
      copyURL: 'URL 복사',
      start: '시작',
    },
    titles: {
      version: '버전',
      currentVersion: '현재 버전',
      cancel: '취소',
      delete: '삭제',
      total: '총',
      attachment: '첨부파일',
      comment: '댓글',
      information: '정보',
      overview: '개요',
      language: '언어',
      about: 'about',
    },
    messages: {
      saved: '성공적으로 저장되었습니다',
      saveFailed: '저장에 실패했습니다',
      unAuthUser: '권한이 없는 사용자',
      error: '에러가 발생했습니다',
      noImg: '이미지가 없습니다',
      noData: '데이터가 없습니다',
      notMatched: '일치하지 않습니다',
      validations: {
        required: '{field} 항목은 필수 입니다',
        lengthMin: '최소 {length} 입니다',
        lengthMax: '최대 {length} 입니다',
        integer: '0 보다 큰 숫자가 필요합니다.',
        notMatched: '{field1} 필드와 {field2} 필드가 일치 하지 않습니다',
        passwordRule1: '최소 하나의 특수문자가 필요합니다.',
        passwordRule2: '최소 하나의 대문자가 필요합니다.',
      },
      questions: {
        delete: '삭제 하시겠습니까?',
      }
    },
    placeholders: {
      noData: '데이터가 없습니다.',
    },
    labels: {
      action: '행동',
      languages: {
        en: 'English',
        ko: '한국어'
      },
      dayOfWeek:{
        sunday: '일요일',
        monday: '월요일',
        tuesday: '화요일',
        wednesday: '수요일',
        thursday: '목요일',
        friday: '금요일',
        saturday: '토요일',
        short: {
          sunday: '일',
          monday: '월',
          tuesday: '화',
          wednesday: '수',
          thursday: '목',
          friday: '금',
          saturday: '토',
        }
      },
    },
    types: {
      models: {
        views: {
          item  : {
            name: '이름',
          },
        },
      },
    },
  },
}

const own = {
  tooltips: {
    startScrapping: 'Scrap 시작',
    fileExts: {
      downloads: {
        pdf: '.pdf 형식으로 다운로드',
        csv: '.csv 형식으로 다운로드',
        xlsx: '.xlsx 형식으로 다운로드',
        txt: '.text 형식으로 다운로드',
      }
    },
    menus: {
      setting: '설정 페이지로 이동',
    }
  },
  titles: {
    menus: {
      settingGeneral: '일반',
      SettingScrap: '스크랩',
      SettingSchedule: '스케쥴',
      settingVersion: '버전',
    },

  },
  types: {
    appSetting: {
      autoLaunch: '자동 시작',
      downloadPath: '다운로드 경로',
      labels: {
        autoLaunch: '컴퓨터 부팅시 자동 시작',
        trayOnLaunch: '프로그램 오픈시 Tray 모드로 열기',
        trayExit: '윈도우 종료시 Tray 모드 활성화',
      }
    },
    schedule: {
      hour: '시',
      minute: '분',
      day: '요일',
      isOn: '활성화',
      scraps: '이벤트',
      exts: {
        time: 'time',
      },
    },
    scrap: {
      xlsx: '액셀',
      csv: 'csv',
      pdf: 'pdf',
      pdfWithTemplate: 'pdf 와 템플릿',
      txt: 'txt',
      images: '이미지',
    }
  },
  views: {
    Home: {
      errorMsg: '잠시 뒤 다시 요청해주세요',
      instruction: '시작 버튼을 눌러주세요',
      pageTitle: '홈',
      scrapping: 'Scrapping'
    },
    settings: {
      general: {
        language: '언어'
      },
      scrap: {
        titles: {
          fileNames: '파일 명'
        }
      },
    }
  },
}

export default {
  ...common,
  ...own,
}
