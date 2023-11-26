//Get
const getCustomerById = "SELECT * FROM customers WHERE id = ?;"

const getCurrentOrdersById = "SELECT * FROM orders WHERE customer_id = ? AND status = 0;"

const getPastOrdersByInvoiceId = "SELECT * FROM orders WHERE invoice_id = ? AND status > 0;"

const getOrdersByMenuId = "SELECT * FROM orders WHERE menu_id = ?;"

const getInvoicesByCustId = "SELECT * FROM invoices WHERE customer_id = ? ORDER BY created_at DESC;"

const getRestaurantsById = "SELECT * FROM restaurants WHERE id = ?;"

const getRestInfoById = "SELECT id,name,address,city,state,zipcode,phone,cuisine,img_path,status,open_at,close_at FROM restaurants WHERE id = ?;"

const getMenuById = "SELECT * FROM menus WHERE id = ?;"

const getMenusByRestId = "SELECT * FROM menus WHERE restaurant_id = ?;"

// const getMnusForCart = "SELECT id, description, img_path, name, price, original_price, quantity as leftover FROM menus WHERE id = ?;"

const getCartsByMenuId = "SELECT * FROM carts WHERE menu_id = ?;"

const getCustCartsById = "SELECT menus.id, menus.description, menus.img_path, menus.name, menus.price, menus.original_price, menus.quantity as leftover, carts.quantity as quantity, restaurants.name as restaurant FROM menus JOIN restaurants ON menus.restaurant_id = restaurants.id JOIN carts ON carts.menu_id = menus.id WHERE carts.customer_id=?;"

// const getCartsByCustId = "SELECT * FROM carts WHERE customer_id = ?;"

const getRestCurrentOrdersById = "SELECT * from orders LEFT JOIN menus ON orders.menu_id = menus.id WHERE menus.restaurant_id = ? AND orders.status = 0 ORDER BY created_at;"

//Add
const addMenu = "INSERT INTO menus (restaurant_id,price,original_price,name,description) VALUES(?,?,?,?,?);"


//Update
const updatRestProfile = "UPDATE restaurants SET username = ?, email = ?, phone = ?, city = ?, address = ?, name = ?, zipcode = ?, state = ?, cuisine = ? WHERE id = ?;"

const updateRestImgById = "UPDATE restaurants SET img_path=?, updated_at = NOW() WHERE id = ?;"

const updateMenuImgById = "UPDATE menus SET img_path=? WHERE id = ?;"

const updateMenuInfo = "UPDATE menus SET name = ?, price = ?, quantity = ?, original_price = ?, status = 1, description = ? WHERE id = ?;"

const updateMenuQuantityById = "UPDATE menus SET quantity=? WHERE id = ?;"

//Delete

const deleteCartsByMenuId = "DELETE FROM carts WHERE menu_id = ?;"

const deleteOrdersByMenuId = "DELETE FROM orders WHERE menu_id = ?;"

const deleteMenuById = "DELETE FROM menus WHERE id = ?;"

module.exports = {getCurrentOrdersById, getMenusByRestId, getInvoicesByCustId, getCartsByMenuId,
    getCustomerById, getRestaurantsById,getRestInfoById,updatRestProfile,updateRestImgById,addMenu,getMenuById,
    deleteCartsByMenuId,getOrdersByMenuId,deleteOrdersByMenuId,deleteMenuById,updateMenuQuantityById,getRestCurrentOrdersById,
    getPastOrdersByInvoiceId,getCustCartsById
}