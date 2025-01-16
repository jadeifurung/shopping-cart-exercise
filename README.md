<h3>Code Summary</h3>

The main object, ShoppingCart, accepts PricingRules when created.

PricingRules makes the ShoppingCart more flexible and needs to be supplied 3 objects when created:

(1) Products - List of products where you can edit their price. <br/>
(2) Promotions - List of promotions its settings. Settings are not uniform and are only specific to a promotion. <br/>
(3) Promo Codes - List of promo codes. You can add other codes manually. <br/>

Items are added to the shopping cart one by one. There is a list that tracks the items added and 
a separate list for items expected and both are printed along with the total price every time calculating
the total. 

<br/>

<h3>Running the program</h3>

<h4>Option 1 (Using Visual Studio Code):</h4>

(1) Install node on local machine <br/>
(2) In Visual Studio Code, install the Code Runner extension <br/>
(2) Open the cart.js file and hit the Run Code button <br/>

<h4>Option 2 (Using an online compiler):</h4>
(1) Go to https://www.programiz.com/javascript/online-compiler/ <br/>
(2) Paste the code from cart.js and hit the Run button <br/>

<br/>

<h3>Testing the code</h3>

At the end of cart.js, scenarios 1 to 4 are simulated. You have to
uncomment the specific scenario that you want to test and comment out the rest
(only one scenario at a time).

You can copy & edit the values to test other scenarios.

<br/>

<h3>Limitations</h3>

i. The code assumes there are only 3 promos that will ever exist: <br/><br/>
  (1) XforY - 3 for 2 deal in the exercise <br/>
  (2) Free Item - Free other item for every item sold <br/>
  (2) Bulk discount - Discount is applied when you buy a certain quantity of item <br/>

ii. Promotions only exist with items that have these product codes: <br/><br/>
  (1) ult_small <br/>
  (2) ult_medium <br/>
  (3) ult_large <br/>

iii. Promo code only applies to the total price, not individual items.

iv. Adding and editing of product & promo settings is manually done.
  
