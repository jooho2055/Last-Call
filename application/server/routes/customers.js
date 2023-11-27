var express = require('express');
var router = express.Router();
var db = require('../conf/database');
const path = require("path");
const {isLoggedIn, isCustomers, isMyPage} = require('../middleware/auth')
const multer = require('multer')
const {customerStorage} = require('../conf/multer')
const customerUpload = multer({ storage: customerStorage });
const {getCurrentOrdersById,getInvoicesByCustId,getCustCartsById,getCartsByCustId,getMenuById,addInvoice,
  addOrder,deleteCartById,getCartsByCustMenuId,updateCartItemById,addCart
} = require('../conf/queries')

/**
 To get curreent order menus list for customer
 @params customerId
 @path '/customers/order/current/:id(\\d+)'
 @method GET
 */
router.get(`/order/current/:id(\\d+)`, /*isLoggedIn, isCustomers, isMyPage,*/  async function(req, res){
    const {id} = req.params
    try{
        const [results, _ ] = await db.execute(getCurrentOrdersById,[id]);
        if(results.length < 1){
          return res.status(400).json({message: "no current orders"})
        }
        console.log(results)
        return res.status(200).json(results)
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to get current order"})
    }
})

/**
 * To get past order menus list for customer
 * @params customerId
 * @path customers//order/past/:id(\\d+)
 * @method GET
 */
router.get(`/order/past/:id(\\d+)`, /*isLoggedIn, isCustomers, isMyPage,*/ async function(req,res){
    const {id} = req.params
    try{
        const [results, _ ] = await db.execute(getInvoicesByCustId,[id]);
        if(results.length < 1){
            return res.status(400).json({message: "no results"})
        }
        let orderHistory = []
        const orderHis = results.map(async (res,count)=>{
            const [orders, _ ] = await db.execute(getPastOrdersByInvoiceId, [res.id])
            if(orders.length>1){
              orderHistory.push(orders);
            }
        })
        await Promise.all(orderHis)
        
        // console.log(orderHistory.length)

        return res.status(200).json({orders: orderHistory})
    }catch(err){
       console.log(err)
        return res.status(400).json({message: "fail to get current order"})
    }
})

/**
 * To get list of cart
 * @params customerId
 * @path `/customers/order/cart/:id(\\d+)`
 * @method GET
 */
router.get(`/order/cart/:id(\\d+)`, /*isLoggedIn, isCustomers, isMyPage,*/ async function(req,res){
    const {id} = req.params
    try{
        const [results, _ ] = await db.execute(getCustCartsById, [id])
        if(results.length < 1){
            return res.status(400).json({message: "cart is empty"})
        }
        
        return res.status(200).json({orders: results})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to get cart"})
    }
})

/// need to rewrite

/**
 * To checkout cart and create order
 * @body holds customerId
 * @path `/customers/order/cart/checkout`
 * @method POST
 * order status: 0: current, 1: done, 2: declined
 */
router.post(`/order/cart/checkout`, /*isLoggedIn, isCustomers,*/ async function(req, res){
    const {customerId} = req.body

    // if(req.session.user.userId !== customerId){
    //     return res.status(400).json({message: "wrong access!"})
    // }

    try{
        const [carts, _ ] = await db.execute(getCartsByCustId, [customerId])
        let flag = true;
        let errMes = [];
        let price = 0;
        const getMenu = carts.map(async (item,i)=>{
          const [quantity, _ ] = await db.execute(getMenuById,[item.menu_id])
          // console.log("cart q: ", carts[i].quantity, " menu q:", quantity[0].quantity, " ", quantity[0].name)
          if(quantity[0].quantity < carts[i].quantity){
            flag = false;
            errMes.push(`Cannot order ${quantity[0].name} more than ${quantity[0].quantity}`)
          }
          price += (carts[i].quantity * quantity[0].price)
        })
        await Promise.all(getMenu);

        if(!flag){
          return res.status(400).json({message: errMes})
        }
        
        const [newInvoice] = await db.execute(addInvoice,[customerId,price]);
        const invoice_id = newInvoice.insertId;

        const moveCart = carts.map(async (item,i)=>{
          const [addOrders] = await db.execute(addOrder,[item.menu_id,customerId,invoice_id,item.quantity])
          const [deleteCart] = await db.execute(deleteCartById,[item.id])
        })
        await Promise.all(moveCart)

        return res.status(200).json({message: "items are checked out"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to checkout"})
    }
})

DEBUG_CART_ADD = {
  customerId:1, 
  menuId:1, 
  restaurantId:1,
  quantity:3
}

/**
 * To add menu in the cart
 * @body holds menuId, customerId, restaurantId, quantity
 * @path `/customers//order/cart/add`
 * @method POST
 */
router.post('/order/cart/add', /*isLoggedIn, isCustomers,*/ async function(req,res){
    const {customerId, menuId, restaurantId, quantity} = req.body
    
    // const {customerId, menuId, restaurantId, quantity} = DEBUG_CART_ADD;
    // if(req.session.user.userId !== customerId){
    //     return res.status(400).json({message: "wrong access!"})
    // }

    try{
        const [menus, _ ] = await db.execute(getMenuById,[menuId])
        if(menus.length < 1 || menus[0].restaurant_id !== restaurantId){
            return res.status(400).json({message: "menu does not exist"})
        }

        let [cart] = await db.execute(getCartsByCustMenuId,[customerId,menuId]);
        let result = []
        if(cart.length> 0){
          result = await db.execute(updateCartItemById,[cart[0].quantity+quantity, cart[0].id])
        }else{
          result = await db.execute(addCart,[menuId, customerId,quantity])
        }
        return res.status(200).json({message: "new item is added!", item: result})
    }catch(err){
        console.log(err)
        return res.status(400).json({message: "fail to add item into cart"})
    }
})

DEBUG_CART_DELETE_MENU = {
  customerId:1, 
  menuId:1, 
  restaurantId:1
}
/**
 * To delete one menu in the cart
 * @body holds menuId and customerId
 * @path `/customers/order/cart/delete/menu`
 * @method DELETE
 */
router.delete(`/order/cart/delete/menu`, /*isLoggedIn, isCustomers,*/ async function(req,res){
    const {menuId, customerId} = req.body
    // const {menuId, customerId} = DEBUG_CART_DELETE_MENU
    
    // if(req.session.user.userId !== customerId){
    //     return res.status(400).json({message: "wrong access!"})
    // }

    try{
        var [item, _ ] = await db.execute(`SELECT * FROM carts WHERE menu_id = ? AND customer_id = ?;`, 
        [menuId, customerId]);
        
        if( item.length < 1){
          return res.status(400).json({message: "item does not exist"})
        }

        var [result, _ ] = await db.execute(`DELETE FROM carts WHERE menu_id = ? AND customer_id = ?;`,
        [menuId, customerId])
        console.log(result)

        return res.status(200).json({message: "Item is deleted"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message:"fail to delete menu"})
    }

})

DEBUG_CART_DELETE = {
  customerId: 1
}
/**
 * To delete all the menu in the cart
 * @body holds customerId
 * @path `/customers/order/cart/delete`
 * @method DELETE
 */
router.delete('/order/cart/delete', /*isLoggedIn, isCustomers,*/ async function(req,res){
    const { customerId } = req.body
    // const {customerId} = DEBUG_CART_DELETE

    // if(req.session.user.userId !== customerId){
    //     return res.status(400).json({message: "wrong access!"})
    // }

    try{
        let [items] = await db.execute(`SELECT * FROM carts WHERE customer_id = ?;`, 
        [customerId]);

        if( items.length < 1){
            return res.status(400).json({message: "item does not exist"})
        }
        
        let [result] = await db.execute(`DELETE FROM carts WHERE customer_id = ?;`,
        [customerId])

        return res.status(200).json({message: "cart is deleted"})
    }catch(err){
        console.log(err)
        return res.status(400).json({message:"fail to empty cart"})
    }
})



const EDIT_CART = {
  cartId:10,
  quantity:10,
}
/**
 * To edit item in carts
 * @method PUT
 * @body cartId, quantity
 * @path /customers/order/cart/edit
 */
router.put(`/order/cart/edit`, /*isLoggedIn, isCustomers,*/ async function(req, res){
    const {cartId, quantity } = req.body
    // const {cartId, quantity } = EDIT_CART;
    try{
      const [ cart, _ ] = await db.execute(`SELECT * FROM carts WHERE id = ?;`, [cartId]);
      if(cart.length < 1){
          return res.status(400).json({message: "Item does not exist in the cart."})
      }

      const [result] = await db.execute(`UPDATE carts SET quantity = ? WHERE id = ?`,[quantity, cartId])

      return res.status(200).json({message:"cart updated"})
    }catch(err){
      return res.status(400).json({message: err.message})
    }
})


router.get('/getUserProfile', async (req, res) => {
  const { username } = req.query;
  try {
    const customerId = await getCustomerIdByUsername(username);

    if (customerId === null) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    //  information on the customer ID from the database
    const userProfile = await getUserProfile(customerId);

    if (userProfile) {
      res.status(200).json(userProfile);
    } else {
      res.status(404).json({ error: 'User profile not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

  async function getUserProfile(customerId) {
    try {
      const [profile] = await db.query('SELECT * FROM customers WHERE id = ?', [customerId]);
  
      if (profile && profile.length > 0) {
        return profile[0];
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  async function updateCustomerBio(customerId, bio) {
    try {
      if (bio) {
        const [result] = await db.query(
          'UPDATE customers SET bio = ? WHERE id = ?;',
          [bio, customerId]
        );

        if (result.affectedRows > 0) {
          return { message: 'Bio updated successfully' };
        } else {
          return { error: 'Customer not found' };
        }
      } else {
        return { error: 'Missing bio parameter' };
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }


  async function getCustomerIdByUsername(username) {
    try {
      const [customer] = await db.query(
        'SELECT id FROM customers WHERE username = ?',
        [username]
      );
  
      if (customer && customer.length > 0) {
        return customer[0].id;
      } else {
        return null; // Return null if the username is not found
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
   
// updateCustomerBio(1, 'lalala');
  

async function updateCustomerEmail(customerId, newEmail) {
  try {
    if (!newEmail) {
      return { error: 'Missing new email parameter' };
    }

    // Check if another customer already has the new email
    const [emailCheckResult] = await db.query(
      'SELECT id FROM customers WHERE email = ? AND id <> ?',
      [newEmail, customerId]
    );

    if (emailCheckResult.length > 0) {
      return { error: 'Email is already in use by another customer' };
    }

    const [result] = await db.query(
      'UPDATE customers SET email = ? WHERE id = ?',
      [newEmail, customerId]
    );

    if (result.affectedRows > 0) {
      return { message: 'Email updated successfully' };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

// updateCustomerEmail(1, "leslie@example.com")

async function updateCustomerName(customerId, newName) {
  try {

    const [result] = await db.query(
      'UPDATE customers SET firstname = ? WHERE id = ?',
      [newName, customerId]
    );

    if (result.affectedRows > 0) {
      return { message: 'Name updated successfully' };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
// updateCustomerName(1, "Lais")



async function updateCustomerLastName(customerId, newLastName) {
  try {
    const [result] = await db.query(
      'UPDATE customers SET lastname = ? WHERE id = ?',
      [newLastName, customerId]
    );

    if (result.affectedRows > 0) {
      return { message: 'Last name updated successfully' };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error; 
  }
}

// updateCustomerLastName(1, "a")

async function updateCustomerPhoneNumber(customerId, phoneNumber) {
  try {
    const [result] = await db.query(
      'UPDATE customers SET phone = ? WHERE id = ?',
      [phoneNumber, customerId]
    );

    if (result.affectedRows > 0) {
      return { message: 'Phone number updated successfully' };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function updateCustomerProfileTimestamp(customerId) {
  try {
    const [result] = await db.query(
      'UPDATE customers SET updated_at = NOW() WHERE id = ?',
      [customerId]
    );

    if (result.affectedRows > 0) {
      const updatedTime = new Date().toLocaleString(); // Get the updated timestamp

      return { updated_at: updatedTime };
    } else {
      return { error: 'Customer not found' };
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


router.post('/edit', async (req, res) => {
  const { username, email, bio, name, lastName, phoneNumber } = req.body;

  try {
    const customerId = await getCustomerIdByUsername(username);

    if (customerId === null) {
      res.status(400).json({ error: 'Customer not found' });
      return;
    }

    // Fetch the user's profile data
    const userProfile = await getUserProfile(customerId);

    // Create an object to store the update data
    const updateData = {};

    // Compare incoming data 
    if (email && email !== userProfile.email) {
      const emailUpdateResult = await updateCustomerEmail(customerId, email);
      updateData.email = emailUpdateResult;
    }

    if (bio && bio !== userProfile.bio) {
      const bioUpdateResult = await updateCustomerBio(customerId, bio);
      updateData.bio = bioUpdateResult;
    }

    if (name && name !== userProfile.name) {
      const nameUpdateResult = await updateCustomerName(customerId, name);
      updateData.name = nameUpdateResult;
    }

    if (lastName && lastName !== userProfile.lastName) {
      const lastNameUpdateResult = await updateCustomerLastName(customerId, lastName);
      updateData.lastName = lastNameUpdateResult;
    }

    if (phoneNumber && phoneNumber !== userProfile.phoneNumber) {
      const phoneNumberUpdateResult = await updateCustomerPhoneNumber(customerId, phoneNumber);
      updateData.phoneNumber = phoneNumberUpdateResult;
    }

    // Update the updated_at timestamp in the user's profile
    const updateProfileResult = await updateCustomerProfileTimestamp(customerId);

    // Merge the user profile data with the update results
    const updatedUserProfile = { ...userProfile, ...updateData, ...updateProfileResult };

    res.status(200).json(updatedUserProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;