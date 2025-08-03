import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
Feature("Login Validation");

Scenario("Valid login (Access granted)", async () => {
    await LoginPage.login("john", "");
    await HomePage.checkOpened();
});

Scenario("Access denied with invalid value", async () => {
    // Login with wrong password
    await LoginPage.login("john", "wrongpass");
    await LoginPage.checkAlertMessage();
    await HomePage.checkNotOpened();
    // Login with empty username and password
    await LoginPage.login("", "");
    await LoginPage.checkAlertMessage();
    await HomePage.checkNotOpened();
    // Login with not available user
    await LoginPage.login("NotAvailableUser", "");
    await LoginPage.checkAlertMessage();
    await HomePage.checkNotOpened();
});
