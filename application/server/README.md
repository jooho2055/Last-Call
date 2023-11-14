 # LASTCALL Backend SIDE

## RESTAURANTS: 

#  Path: /restaurants/info/:id
To get restaurants info
@params hold restaurants id
@method GET
 


# Path: /restaurants/profile/update
 To update rest's profile
 @method PUT
 @body mush hold id 
 @body optional: username, password, email, phone, restName, street, city, zipcode, state, cuisine
 


# Path:   /restaurants/profile/:id(\\d+)
  To get restaurants profile
  @params hold restaurants id
  @method GET
 


   # Path:   /restaurants/menu/add
   To add new menu for restaurant 
   @Post
   @Body must hold restautrantId, price, orignalPrice, name 
   @Options img, desc
   @method post
 


  # Path:   /restaurants/menu/list/:id(\\d+)
  To get all the menus from restaurants
  @params hold restaurantsId
  @method GET
 


  # Path:   /restaurants/menu/delete
  To delete menu
  @body hold restaurantId, menuId (which menu are you going to delete)
  @method DELETE
 


  # Path:   /restaurants/menu/setqauntity
  To set up quantity for menu
  @method POST
  @body must holds restaurantId, menuId, quantity(to update)
 


  # Path:   /restaurants/order/current/:id(\\d+)
  To get current order for restaurants
  @method GET
  @params id (restaurant id)
 


  # Path:   /restaurants/menu/edit
  To edit menu
  @method PUT
  @body must contain menuId
  @body optional: name, desc, img, quantity, price, originalPrice
 

 ## CUSTOMERS:


  # Path:   /customers/order/current/:id(\\d+)
  To get curreent order menus list for customer
  @params customerId
  @method GET
 


  # Path:   customers//order/past/:id(\\d+)
  To get past order menus list for customer
  @params customerId
  @method GET
 


  # Path:   /customers//order/cart/:id(\\d+)
  To get list of cart
  @params customerId
  @method GET
 


  # Path:   /customers/order/cart/checkout
  To checkout cart and create order
  @body holds customerId
  @method POST
  order status: 0: current, 1: done, 2: declined
 


  # Path:   /customers//order/cart/add
  To add menu in the cart
  @body holds menuId, customerId, restaurantId, quantity
  @method POST
 


  # Path:   /customers/order/cart/delete/menu
  To delete one menu in the cart
  @body holds menuId and customerId
  @method DELETE
 


  # Path:   /customers/order/cart/delete
  To delete all the menu in the cart
  @body holds customer detail
  @method DELETE
 


  # Path:   /customers/order/cart/edit
  To edit item in carts
  @method PUT
  @body cartId, quantity
 