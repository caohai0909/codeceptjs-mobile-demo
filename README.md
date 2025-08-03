# Mobile Demo - CodeceptJS with Appium

This project contains end-to-end (E2E) tests for mobile applications (Android and iOS) using CodeceptJS with Appium. The setup supports parallel testing on Android (port 4724) and iOS (port 4725).

## Prerequisites

Before setting up the project, ensure you have the following installed:

- **Node.js** (version 16 or higher):
  - Download and install from [nodejs.org](https://nodejs.org).
  - Verify: `node -v` and `npm -v`.
- **Appium** (version 2.x):
  - Install globally: `npm install -g appium`.
  - Verify: `appium --version`.
- **Appium Drivers**:
  - Android: `appium driver install uiautomator2`
  - iOS: `appium driver install xcuitest`
- **Android Environment**:
  - Install [Android Studio](https://developer.android.com/studio) and set up an emulator.
  - Verify emulator: `adb devices` (should list devices, e.g., `emulator-5554`).
- **iOS Environment** (macOS only):
  - Install [Xcode](https://developer.apple.com/xcode/) and set up a simulator.
  - Verify simulator: `xcrun simctl list devices` (should list simulators, e.g., `iPhone 14`).
- **Java Development Kit (JDK)**:
  - Required for Android testing. Install JDK 11 or higher.
  - Set `JAVA_HOME` environment variable.
- **Project Dependencies**:
  - Ensure `package.json` includes `codeceptjs`, `@codeceptjs/appium`, `appium`, `typescript`, `ts-node`, and `@types/node`.

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd mobile-demo
   ```

2. **Install Dependencies**:
   - Run the following command to install all libraries listed in `package.json` (`dependencies` and `devDependencies`) into the `node_modules` directory:
     ```bash
     npm install
     ```
   - This installs `codeceptjs`, `@codeceptjs/appium`, `appium`, `typescript`, `ts-node`, and other required packages.

3. **Configure Appium Servers**:
   - **For Android** (port 4724):
     - Start the Appium server with the `/wd/hub` base path:
       ```bash
       appium --port 4724 --base-path /wd/hub
       ```
     - Verify: Open `http://localhost:4724/wd/hub/status` in a browser (should return a JSON with `ready` status).
   - **For iOS** (port 4725):
     - Start a second Appium server with a different port:
       ```bash
       appium --port 4725 --base-path /wd/hub
       ```
     - Verify: Open `http://localhost:4725/wd/hub/status`.

   **Note**: Ensure the ports (4724, 4725) are not in use. Check with:
   ```bash
   netstat -aon | findstr :4724
   netstat -aon | findstr :4725
   ```
   If occupied, stop the process: `taskkill /PID <process-id> /F`.

4. **Prepare Devices**:
   - **Android**:
     - Start an emulator:
       ```bash
       emulator -avd <your-emulator-name>
       ```
       (Find `<your-emulator-name>` with `emulator -list-avds`).
     - Verify: `adb devices` (should list `emulator-5554` or similar).
   - **iOS** (macOS only):
     - Start a simulator:
       ```bash
       xcrun simctl boot "iPhone 14"
       ```
       (Replace `iPhone 14` with your simulator name from `xcrun simctl list devices`).

5. **Configure CodeceptJS**:
   - Ensure the following configuration files are set up:
     - `codecept.android.conf.ts`: Configured for Android testing (port 4724).
     - `codecept.ios.conf.ts`: Configured for iOS testing (port 4725).
   - Example `codecept.android.conf.ts`:
     ```typescript
     export const config: CodeceptJS.MainConfig = {
       tests: './*_test.ts',
       output: './output',
       helpers: {
         Appium: {
           platform: 'Android',
           app: 'path/to/your/app.apk', // Replace with your .apk path
           device: 'emulator-5554', // Replace with your device name
           host: 'localhost',
           port: 4724,
           path: '/wd/hub',
           desiredCapabilities: {
             platformName: 'Android',
             deviceName: 'emulator-5554',
             app: 'path/to/your/app.apk',
             automationName: 'UiAutomator2',
           },
         },
       },
       include: {
         I: './steps_file.ts',
       },
       name: 'mobile-demo',
     };
     ```
   - Example `codecept.ios.conf.ts`:
     ```typescript
     export const config: CodeceptJS.MainConfig = {
       tests: './*_test.ts',
       output: './output',
       helpers: {
         Appium: {
           platform: 'iOS',
           app: 'path/to/your/app.ipa', // Replace with your .ipa path
           device: 'iPhone 14', // Replace with your simulator name
           host: 'localhost',
           port: 4725,
           path: '/wd/hub',
           desiredCapabilities: {
             platformName: 'iOS',
             deviceName: 'iPhone 14',
             app: 'path/to/your/app.ipa',
             automationName: 'XCUITest',
             platformVersion: '16.0',
           },
         },
       },
       include: {
         I: './steps_file.ts',
       },
       name: 'mobile-demo',
     };
     ```

## Running Tests

1. **Start Appium Servers**:
   - For Android:
     ```bash
     appium --port 4724 --base-path /wd/hub
     ```
   - For iOS:
     ```bash
     appium --port 4725 --base-path /wd/hub
     ```

2. **Run Test Scripts**:
   - Scripts are defined in `package.json` under the `scripts` section. Example:
     ```json
     {
       "scripts": {
         "android:build": "npx codeceptjs run --config codecept.android.conf.ts",
         "ios:build": "npx codeceptjs run --config codecept.ios.conf.ts"
       }
     }
     ```
   - Run Android tests:
     ```bash
     npm run android:build
     ```
   - Run iOS tests:
     ```bash
     npm run ios:build
     ```

3. **View Results**:
   - Test results, logs, and screenshots are stored in the `./output` directory.

## Troubleshooting

- **Port conflicts**:
  - Check if ports 4724 or 4725 are in use:
    ```bash
    netstat -aon | findstr :4724
    netstat -aon | findstr :4725
    ```
  - Stop conflicting processes:
    ```bash
    taskkill /PID <process-id> /F
    ```
- **Appium server not responding**:
  - Verify server status: `curl http://localhost:4724/wd/hub/status` or `curl http://localhost:4725/wd/hub/status`.
  - Ensure drivers are installed: `npx appium driver list`.
- **Missing dependencies**:
  - Reinstall dependencies:
    ```bash
    rm -rf node_modules package-lock.json
    npm install
    ```
- **TypeScript errors**:
  - Ensure `tsconfig.json` exists. Create if missing:
    ```bash
    npx tsc --init
    ```
  - Update `tsconfig.json`:
    ```json
    {
      "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "outDir": "./output",
        "rootDir": "./"
      }
    }
    ```

## Additional Notes

- Ensure the `.apk` (Android) or `.ipa` (iOS) file paths in `codecept.android.conf.ts` and `codecept.ios.conf.ts` are correct.
- For real devices, update `deviceName` and `udid` in the configurations.
- Contact the project maintainer for specific `.apk` or `.ipa` files if not provided.