const { I } = inject();
export class LoginPage {
   
    public userNameTxtbox = {
        android: "~User Name",
        ios: "//XCUIElementTypeTextField[@name=\"UserName\"]",
    };

    public passwordTxtbox = {
        android: "~Password",
        ios: "//XCUIElementTypeSecureTextField[@name=\"PassWord\"]",
    };

    public loginBtn = {
        android: "~Button Login",
        ios: "~LoginButton",
    };

    public alertMessageText = {
        android: "//android.widget.TextView[@text=\"Invalid UserName or Password.\"]",
        ios: "~Invalid Username or Password.",
    };

    public okBtn = {
        android: "//android.widget.Button[@text=\"OK\"]",
        ios: "~OK",
    };
 
    public async login(userName: string, password: string) {
        await I.waitForElement(this.userNameTxtbox, 20);
        await I.enter(this.userNameTxtbox, userName);
        await I.enter(this.passwordTxtbox, password);
        await I.tap(this.loginBtn);
    }

    public async checkAlertMessage() {
        await I.checkControlExist(this.alertMessageText);
        await I.tap(this.okBtn);
    }
}
export default new LoginPage();
