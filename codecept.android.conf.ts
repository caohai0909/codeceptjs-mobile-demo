export const config: CodeceptJS.MainConfig = {
  tests: './src/**/*_test.ts',
  output: './output',
  helpers: {
    Appium: {
      app: './AUT/CarRental.apk',
      port: 4724,
      desiredCapabilities: {
        platformName: "android",
        deviceName: "emulator",
        udid: "emulator-5554",
        automationName: "UiAutomator2",
        newCommandTimeout: 600
      }
  },
  Mochawesome: {
    uniqueScreenshotNames: "true"
    }
  },
  plugins: {
    screenshotOnFail: {
      enabled: "true"
    }
  },
  mocha: {
    reporterOptions: {
      reportDir: "results",
      inlineAssets: true,
      timestamp: "isoDateTime",
      reportFilename: "CodeceptJS_Report_Android",
      autoOpen: true,
      reportPageTitle: "CodecepJS Test Result - Android"
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'demo-codeceptjs'
}