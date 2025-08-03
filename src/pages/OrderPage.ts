const { I } = inject();
import { config } from "codeceptjs";
import utilities from "../utilities/utility";

export class OrderPage {
    
    public commonPicker = { className: "XCUIElementTypePickerWheel" };
    
    public monthPicker = {
        android: { xpath: "//android.widget.NumberPicker[1]" },
        ios: { xpath: "//XCUIElementTypePickerWheel[1]" },
    };
    
    public datePicker = {
        android: { xpath: "//android.widget.NumberPicker[2]" },
        ios: { xpath: "//XCUIElementTypePickerWheel[2]" },
    };
    
    public yearPicker = {
        android: { xpath: "//android.widget.NumberPicker[3]" },
        ios: { xpath: "//XCUIElementTypePickerWheel[3]" },
    };
    
    public doneBtn = {
        android: "//android.widget.Button[@text=\"Set\"]",
        ios: "~Done",
    };
    
    public pickDate = {
        android: "~Text View Current Date",
        ios: "~pickupDate",
    };
    
    public returnCalendar = {
        android: "~Return Date Calendar",
        ios: "~returnDate",
    };
    
    public pickState = {
        android: "#com.logigear:id/spinStates",
        ios: "~pickupState",
    };
    
    public pickCity = {
        android: "~Pickup City",
        ios: "~pickupCityText",
    };
    
    public returnState = {
        android: "#com.logigear:id/spinStates",
        ios: "~returnState",
    };
    
    public returnCity = {
        android: "~Return City",
        ios: "~returnCityText",
    };
    
    public nextButton = {
        android: "~Button Next",
        ios: "~btn next",
    };
    
    public nextButtonId = {
        android: "#com.logigear:id/btnNext",
        ios: "~btn next",
    };
    
    public customerFirstName = {
        android: "~First Name",
        ios: "~firstname",
    };
    
    public customerLastName = {
        android: "~Last Name",
        ios: "~lastname",
    };
    
    public returnSameLocation = {
        android: "~Return at same location",
        ios: "//XCUIElementTypeButton[@name=\"returnAtSameLocation\"]",
    };
    
    public customerLicense = {
        android: "~Driver License",
        ios: "~driverlicence",
    };
    
    public customerPassport = "~passport";
    
    public customerPhoneNo = "~phonenumber";
    
    public paymentInfo = {
        android: "PAYMENT INFORMATION",
        ios: "//XCUIElementTypeButton[@name=\"Payment\"]",
    };
    
    public totalPayment = {
        android: "~Total Payment",
        ios: "//XCUIElementTypeStaticText[@name=\"Total Payment\"]"
            + "/following-sibling::XCUIElementTypeStaticText",
    };
    
    public time = {
        android: "PAYMENT INFORMATION",
        ios: "//XCUIElementTypeButton[@name=\"Payment\"]",
    };
    
    public carNumber = {
        android: "~Number Car Rent",
        ios: "//XCUIElementTypeButton[@name=\"icon dropdown\"]",
    };
 
    public async enterPickUpInfo(pickUpInfo: any) {
        const platform = config.get().helpers.Appium.desiredCapabilities.platformName;
        console.log(`Running on platform: ${platform}`);
        await I.tap({
            android: `~Pickup ${pickUpInfo.country}`,
            ios: `~pickupCountry_${pickUpInfo.country}`,
        });
        await this.select(this.pickState, pickUpInfo.state);
        await I.enter(this.pickCity, pickUpInfo.city);
        await I.tap({ android: "~Text View Pickup City", ios: "~Pickup City" });
        if (platform.toLowerCase() === "android") {
            await I.tap(this.nextButtonId);
        }
    }

    public async enterReturnInfo(returnInfo: any) {
        // The default return date already +1 day
        if (returnInfo.duration !== 1) {
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + returnInfo.duration);
            await this.setCalendar(this.returnCalendar, returnDate);
        }
        if (!returnInfo.sameAsPickup) {
            await I.tap(this.returnSameLocation);
            await I.tap({
                android: `~Return ${returnInfo.country}`,
                ios: `~returnCountry_${returnInfo.country}`,
            });
            await this.select(this.returnState, returnInfo.state);
            await I.enter(this.returnCity, returnInfo.city);
        }
        await I.tap(this.nextButtonId);
    }

    public async selectCar(carName: string, number: any) {
        // Car selection page
        await I.tap({
            android: carName,
            ios: `~${carName}`,
        });
        const platform = config.get().helpers.Appium.desiredCapabilities.platformName;
        console.log(`Running on platform: ${platform}`);
        if (platform.toLowerCase() === "android") {
            await I.enter(this.carNumber, number.toString());
        }
        if (platform.toLowerCase() === "iOS") {
            await this.select(this.carNumber, number.toString());
        }
        await I.tap(this.nextButtonId);
    }

    public async enterCustomerInfo(customerName: string) {
        const customer = await utilities.getUserInfo(customerName);
        await I.enter(this.customerFirstName, customer.firstName);
        await I.enter(this.customerLastName, customer.lastName);
        await I.enter(this.customerLicense, customer.driverLicense);
        const platform = config.get().helpers.Appium.desiredCapabilities.platformName;
        console.log(`Running on platform: ${platform}`);
        if (platform.toLowerCase() !== "android") {
            // iOS needs below fields be filled to continue
            await I.enter(this.customerPassport, customer.passport);
            await I.enter(this.customerPhoneNo, customer.phoneNumber);
        }
        await I.tap(this.nextButtonId);
    }

    public async selectOptions(options: string | string[]) {
        await I.wait(1);
        if (options && options !== "N/A") {
            if (typeof (options) === "string") {
                await this.selectOption(options);
            }
            else {
                await Promise.all(options.map(async (option) => {
                    await this.selectOption(option);
                }));
            }
        }
        await I.tap(this.nextButtonId);
    }

    public async selectOption(option: string) {
        await I.tap({
            android: `//android.widget.TextView[@text="${option}"]` +
                "/following-sibling::android.widget.CheckBox",
            ios: `//XCUIElementTypeStaticText[@name="${option}"]` +
                "/following-sibling::XCUIElementTypeImage",
        });
    }

    public async selectPrice(priceOption: string) {
        await I.waitForElement(this.nextButtonId, 5);
        await I.tap({
            android: priceOption,
            ios: `//XCUIElementTypeStaticText[@name="${priceOption}"]` +
                "/preceding-sibling::XCUIElementTypeButton",
        });
        await I.tap(this.nextButtonId);
    }

    public async checkTotalPrice(price: any) {
        let strPrice;
        if (typeof price === "number") {
            strPrice = price.toFixed(2);
        }
        else {
            strPrice = price;
        }
        await I.waitForElement(this.paymentInfo, 5);
        await I.tap(this.paymentInfo);
        const platform = config.get().helpers.Appium.desiredCapabilities.platformName;
        console.log(`Running on platform: ${platform}`);
        if (platform.toLowerCase() === "android") {
            await I.checkControlProperty(this.totalPayment, "text", strPrice);
        }
        else {
            await I.checkControlProperty(this.totalPayment, "value", strPrice);
        }
    }

    public async select(list: any, value: any) {
        interface ElementBounds {
            left: number;
            top: number;
            width: number;
            height: number;
          }
        const platform: string = config.get().helpers.Appium.desiredCapabilities.platformName;
        console.log(`Running on platform: ${platform}`);
      
        if (platform.toLowerCase() === 'android') {
          await I.tap(list);
          await I.tap(value);
        } else if (platform.toLowerCase() === 'ios') {
          const listBound: ElementBounds = await I.grabElementBoundingRect(list);
          await I.swipe(
            listBound.left + 5,
            listBound.top + (listBound.height / 2),
            -(listBound.width),
            0
          );
          await I.executeScript('mobile: selectPickerWheelValue', {
            element: this.commonPicker,
            value
          });
          await I.tap(this.doneBtn);
        }
    }

    public async setCalendar(calendar: any, date: any) {
        const platform = config.get().helpers.Appium.desiredCapabilities.platformName;
        console.log(`Running on platform: ${platform}`);
        if (platform.toLowerCase()  === "android") {
            await I.tap(calendar);
            await I.waitForElement(this.yearPicker.android, 10);
            await I.selectOption(this.datePicker.android, ("0" + date.getDate()).slice(-2));
        }
        if (platform.toLowerCase()  === "iOS") {
            let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            let calendarBound = await I.getElementBounds(calendar);
            await I.swipeByCoordinates(calendarBound.left + 2, calendarBound.top + (calendarBound.height / 2), -(calendarBound.width), 0);
            await I.waitForElement(this.yearPicker, 10);
            await I.setPickerValue(this.datePicker, date.getDate().toString());
            await I.setPickerValue(this.monthPicker, monthNames[date.getMonth()]);
            await I.setPickerValue(this.yearPicker, date.getFullYear().toString());
        }
        await I.tap(this.doneBtn);
    }
}
export default new OrderPage();
