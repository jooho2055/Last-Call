# LASTCALL Backend SIDE

## RESTAURANTS: 

 # To get restaurants info
 # @params hold restaurants id
 # @Path /restaurants/info/:id
 # @method GET
 


 # To update rest's profile
 # @method PUT
 # @body mush hold id 
 # @body optional: username, password, email, phone, restName, street, city, zipcode, state, cuisine
 # @Path /restaurants/profile/update
 


 # To get restaurants profile
 # @params hold restaurants id
 # @Path /restaurants/profile/:id(\\d+)
 # @method GET
 


 #  To add new menu for restaurant 
 #  @Post
 #  @Body must hold restautrantId, price, orignalPrice, name 
 #  @Options img, desc
 #  @path /restaurants/menu/add
 #  @method post
 


 # To get all the menus from restaurants
 # @params hold restaurantsId
 # @path /restaurants/menu/list/:id(\\d+)
 # @method GET
 


 # To delete menu
 # @body hold restaurantId, menuId (which menu are you going to delete)
 # @path /restaurants/menu/delete
 # @method DELETE
 


 # To set up quantity for menu
 # @method POST
 # @body must holds restaurantId, menuId, quantity(to update)
 # @path /restaurants/menu/setqauntity
 


 # To get current order for restaurants
 # @method GET
 # @params id (restaurant id)
 # @path /restaurants/order/current/:id(\\d+)
 


 # To edit menu
 # @method PUT
 # @body must contain menuId
 # @body optional: name, desc, img, quantity, price, originalPrice
 # @path /restaurants/menu/edit
 

## CUSTOMERS:


 # To get curreent order menus list for customer
 # @params customerId
 # @path /customers/order/current/:id(\\d+)
 # @method GET
 


 # To get past order menus list for customer
 # @params customerId
 # @path customers//order/past/:id(\\d+)
 # @method GET
 


 # To get list of cart
 # @params customerId
 # @path /customers//order/cart/:id(\\d+)
 # @method GET
 


 # To checkout cart and create order
 # @body holds customerId
 # @path /customers/order/cart/checkout
 # @method POST
 # order status: 0: current, 1: done, 2: declined
 


 # To add menu in the cart
 # @body holds menuId, customerId, restaurantId, quantity
 # @path /customers//order/cart/add
 # @method POST
 


 # To delete one menu in the cart
 # @body holds menuId and customerId
 # @path /customers/order/cart/delete/menu
 # @method DELETE
 


 # To delete all the menu in the cart
 # @body holds customer detail
 # @path /customers/order/cart/delete
 # @method DELETE
 


 # To edit item in carts
 # @method PUT
 # @body cartId, quantity
 # @path /customers/order/cart/edit
 