export const config: CodeceptJS.MainConfig = {
  tests: 'src/*_test.ts',
  output: './output',
  helpers: {
    Appium: {
      app: 'http://localhost',
      platform: 'Android',
      device: 'emulator'
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'demo-codeceptjs'
}