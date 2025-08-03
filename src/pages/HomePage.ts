const { I } = inject();

export class HomePage {
  
    public newOrder = {
        android: "~Button New Order",
        ios: "//XCUIElementTypeButton[@name=\"ButtonNewOrder\"]",
    };

    public async openNewOrder() {
        await I.waitForElement(this.newOrder, 5);
        await I.tap(this.newOrder);
    }

    public async checkOpened() {
        await I.seeElement(this.newOrder);
    }

    public async checkNotOpened() {
        await I.dontSeeElement(this.newOrder);
    }
}
export default new HomePage();
