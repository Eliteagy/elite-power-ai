# Using application test mode
Context: Discord developer reference: Using application test mode
[Source](purchases-and-premium-responses-index.md) / [Owning endpoint, event, object or procedure conditions](types-of-one-time-purchases.md) / [Previous source section](testing-your-one-time-purchase-implementation.md)
<a id="source-using-application-test-mode"></a>

### Using Application Test Mode

 Application Test Mode allows free test purchases of One-Time Purchase SKUs for the app. You can test consumable and durable item purchases through the In-App Purchase flow without card charges, although a valid payment method still must be on file. It is not charged at checkout. To enable the mode, first confirm a payment method exists in `User Settings -> Billing`, then:
1. Open up the Discord app
2. Select the Settings cog in the lower-left corner
3. Open `Advanced` under App Settings
4. Turn **on** both Developer Mode and Application Test Mode, then enter the application ID. Leave other settings unchanged.
5. Exit user settings
 After Application Test Mode is enabled, the app name appears in an orange bar at the top of the screen. Use the Store page to buy one-time purchase items without being charged. Entitlements from Application Test Mode purchases have `type` value 4, representing `TEST_MODE_PURCHASE`. The Go To SKU button is currently unavailable; purchase the SKU from the Store page while testing.
