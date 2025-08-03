import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import OrderPage from "../pages/OrderPage";
import carReservations from "../data/carReservations.json";
Feature("Car Reservation");

Data(carReservations).Scenario("Validate Car Reservation", async (current: any) => {
    await LoginPage.login("john", "");
    // Input car reservation information
    await HomePage.openNewOrder();
    await OrderPage.enterPickUpInfo(current.pickup);
    await OrderPage.enterReturnInfo(current.return);
    await OrderPage.selectCar(current.car, current.number);
    await OrderPage.enterCustomerInfo(current.customer);
    await OrderPage.selectOptions(current.options);
    await OrderPage.selectPrice("Check lowest price");
    // Check total payment
    await OrderPage.checkTotalPrice(current.totalPayment);
});