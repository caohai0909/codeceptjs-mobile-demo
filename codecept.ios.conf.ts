export const config: CodeceptJS.MainConfig = {
  tests: './src/**/*_test.ts',
  output: './output',
  helpers: {
    Appium: {
      app: './AUT/CarRental.ipa',
      port: 4725,
      desiredCapabilities: {
        platformName: "ios",
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
      reportFilename: "CodeceptJS_Report_iOS",
      autoOpen: true,
      reportPageTitle: "CodecepJS Test Result - iOS"
    }
  },
  include: {
    I: './steps_file'
  },
  name: 'demo-codeceptjs'
}