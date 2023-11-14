 # LASTCALL Backend SIDE

## RESTAURANTS: 

1. Path: */restaurants/info/:id*
    - To get restaurants info
    - @params hold restaurants id
    - @method GET
 


2. Path: */restaurants/profile/update*
    - To update rest's profile
    - @method PUT
    - @body mush hold id 
    - @body optional: username, password, email, phone, restName, street, city, zipcode, state, cuisine
 


3. Path:   */restaurants/profile/:id(\\d+)*
    - To get restaurants profile
    - @params hold restaurants id
    - @method GET

4. Path:   */restaurants/menu/add*
    - To add new menu for restaurant 
    - @Post
    - @Body must hold restautrantId, price, orignalPrice, name 
    - @Options img, desc
    - @method post

5. Path:  * /restaurants/menu/list/:id(\\d+)*
    - To get all the menus from restaurants
    - @params hold restaurantsId
    - @method GET

6. Path:   */restaurants/menu/delete*
    - To delete menu
    - @body hold restaurantId, menuId (which menu are you going to delete)
    - @method DELETE

7. Path:   */restaurants/menu/setqauntity*
    - To set up quantity for menu
    - @method POST
    - @body must holds restaurantId, menuId, quantity(to update)

8. Path:   */restaurants/order/current/:id(\\d+)*
    - To get current order for restaurants
    - @method GET
    - @params id (restaurant id)

9. Path:   */restaurants/menu/edit*
    - To edit menu
    - @method PUT
    - @body must contain menuId
    - @body optional: name, desc, img, quantity, price, originalPrice

## CUSTOMERS:

1. Path:   */customers/order/current/:id(\\d+)*
    - To get curreent order menus list for customer
    - @params customerId
    - @method GET

2. Path:   */customers/order/past/:id(\\d+)*
    - To get past order menus list for customer
    - @params customerId
    - @method GET

3. Path:   */customers/order/cart/:id(\\d+)*
    - To get list of cart
    - @params customerId
    - @method GET

4. Path:   */customers/order/cart/checkout*
    - To checkout cart and create order
    - @body holds customerId
    - @method POST
    - order status: 0: current, 1: done, 2: declined

5. Path:  */customers/order/cart/add*
    - To add menu in the cart
    - @body holds menuId, customerId, restaurantId, quantity
    - @method POST

6. Path:   */customers/order/cart/delete/menu*
    - To delete one menu in the cart
    - @body holds menuId and customerId
    - @method DELETE

7. Path:   */customers/order/cart/delete*
    - To delete all the menu in the cart
    - @body holds customer detail
    - @method DELETE

8. Path:   */customers/order/cart/edit*
    - To edit item in carts
    - @method PUT
    - @body cartId, quantity
 