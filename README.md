# Electron + vite3.0 + vue 3

# :rocket: Getting started
## Dev
```shell
yarn dev
```
## Build
```shell
yarn build
```

# Dependencies
- eslint
- vitest: Unit test
- [Husky 8](https://github.com/typicode/husky)

## Electron
- electron-builder: Builder
- electron-is-dev: Check development
- electron-updater: auto-update

## Renderer
- sass/scss
- [vue-use](https://vueuse.org/): vue utils
- [vueuse/electron](https://vueuse.org/electron/readme.html#vueuse-electron): Electron vue-use

## Scapping and export
- [puppeteer]()
- [cheerio]()
- [exceljs](https://www.npmjs.com/package/exceljs)
- [xlsx](https://www.npmjs.com/package/xlsx): Alternative (not using in here)
- 

# :file_folder: Directory Structure
```
├─ dist/                  # Contain compiled output from each package.
│  ├─ renderer/           # Compiled output of renderer process.
│  ├─ main/               # Compiled output of main process.
│  ├─ preload/            # Compiled output of preload process.
├─ node_modules/
├─ packages/
│  ├─ renderer/           # Contains renderer process source-code.
│  │  ├─ src/
│  │  ├─ index.html       # Index html
│  │  ├─ vite.config.ts   # Vite config for renderer source-code
│  │  ├─ tsconfig.json    # Specific TypeScript config.
│  ├─ main/               # Contains main process source-code.
│  │  ├─ src/
│  │  ├─ vite.config.ts   # Vite config for main source-code.
│  │  ├─ tsconfig.json    # Specific TypeScript config.
│  ├─ preload/            # Contains preload script source-code.
│  │  ├─ src/
│  │  ├─ vite.config.ts   # Vite config for preload source-code.
│  │  ├─ tsconfig.json    # Specific TypeScript config.
├─ release/               # Contain output of program such as exe file.
├─ scripts/               # Custom scripts, we will create one for the dev-server with Electron later.
│  ├─ devSever.ts         # Execute development evnviroment
│  ├─ build.ts            # Execute build packages with production evnviroment
├─ tests/                 # Contains unit test files
├─ .eslintrc.js           # Eslint
├─ package.json
├─ tsconfig.node.json     # Root file TypeScript config generated by Vite CLI.
```
## Vue structure (Renderer)
```
├─ index.html               # Index html
├─ src/
│  ├─ assets/                   # Assets for renderer.
│  ├─ components/               # Contain global components.
│  ├─ locales/                  # i18n, locaels.
│  │   ├─ langs/                # Lanuges collection.
│  │   ├─ index.ts/             # i18n config.
│  ├─ router/                   # Router.
│  │   ├─ routes/               # Modulized router.
│  │   ├─ index.ts/             # router config.
│  ├─ store/                    # Pinina or vue-store.
│  │   ├─ modules/              # Modulized store.
│  │   ├─ index.ts/             # store config.
│  ├─ styles/                   # Global Styles.
│  ├─ types/                    # Types.
│  ├─ utils/                    # Contain utilites.
│  ├─ views/                    # Contain View pages.
│  ├─ main.ts/                  # vue3 main file.
│  ├─ App.vue/                  # App.vue.
├─ vite.config.ts           # Vite config for renderer source-code
├─ tsconfig.json            # Specific TypeScript config.
```
## main/utils/scrap.ts
Handle scrap result

## main/utils/export.ts
Handle export to file

# Refs
## Electron
- [cawa-93](https://github.com/cawa-93/vite-electron-builder)
- [blog 1](https://blog.totominc.io/blog/electron-with-typescript-and-vite-as-a-build-system)
- [twstyled](https://github.com/twstyled/electron-vite-react)

# Todo
## Main
- Add electron-store
  - schedules
    - Add field for scrap schedule
- Scrapping Examples
- schedule feature
- Export
  - video
- Tray
  - Open program with double click
- Schedules
  - Run specific scrap based on schedule 
## Renderer
- i18n - Korean
- Move schedule logic to store
- setting page
  - Schedule
    - Add what scrap will do on this schedule
