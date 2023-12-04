//Get
const getCustomerById = "SELECT * FROM customers WHERE id = ?;"

const getCurrentOrdersById = "SELECT invoices.id as invoice_id, menus.name as name, menus.price as price, menus.original_price as original_price, orders.quantity as quantity, menus.img_path as img_path, menus.description as description FROM invoices JOIN orders ON invoices.id = orders.invoice_id JOIN menus ON menus.id = orders.menu_id WHERE orders.status > 0 AND orders.customer_id = ?;"

const getPastOrdersByInvoiceId = "SELECT menus.name as name, menus.price as price, menus.original_price as original_price, orders.quantity as quantity, menus.img_path as img_path, menus.description as description FROM orders JOIN menus on orders.menu_id = menus.id WHERE invoice_id = ? AND orders.status > 0;"

const getOrdersByMenuId = "SELECT * FROM orders WHERE menu_id = ?;"

const getInvoicesByCustId = "SELECT * FROM invoices WHERE customer_id = ? ORDER BY created_at DESC;"

const getRestaurantsById = "SELECT * FROM restaurants WHERE id = ?;"

const getRestInfoById = "SELECT id,name,address,city,state,zipcode,phone,cuisine,img_path,status,open_at,close_at FROM restaurants WHERE id = ?;"

const getMenuById = "SELECT * FROM menus WHERE id = ?;"

const getMenusByRestId = "SELECT * FROM menus WHERE restaurant_id = ?;"

// const getMnusForCart = "SELECT id, description, img_path, name, price, original_price, quantity as leftover FROM menus WHERE id = ?;"

const getCartsByMenuId = "SELECT * FROM carts WHERE menu_id = ?;"

const getCustCartsById = "SELECT menus.id, menus.description, menus.img_path, carts.id as cart_id, menus.name, menus.price, menus.original_price, menus.quantity as leftover, carts.quantity as quantity, restaurants.name as restaurant FROM menus JOIN restaurants ON menus.restaurant_id = restaurants.id JOIN carts ON carts.menu_id = menus.id WHERE carts.customer_id=?;"

const getCartsByCustId = "SELECT * FROM carts WHERE customer_id = ?;"

const getCartsByCustMenuId = "SELECT * FROM carts WHERE customer_id = ? AND menu_id = ?;"

const getRestCurrentOrdersById = "SELECT * from orders LEFT JOIN menus ON orders.menu_id = menus.id WHERE menus.restaurant_id = ? AND orders.status = 0 ORDER BY created_at;"

//Add
const addMenu = "INSERT INTO menus (restaurant_id,price,original_price,name,description) VALUES(?,?,?,?,?);"

const addInvoice = "INSERT INTO invoices(customer_id, created_at, price) VALUES(?,NOW(),?);"

const addOrder = "INSERT INTO orders(created_at, status, menu_id, customer_id, invoice_id, quantity) VALUES(NOW(), 0, ?,?,?,?);"

const addCart = "INSERT INTO carts (menu_id,customer_id,quantity) VALUES(?,?,?);"

//Update
const updateRestProfile = "UPDATE restaurants SET username = ?, email = ?, password = ?, phone = ?, city = ?, address = ?, name = ?, zipcode = ?, state = ?, cuisine = ? WHERE id = ?;"

const updateRestImgById = "UPDATE restaurants SET img_path=?, updated_at = NOW() WHERE id = ?;"

const updateMenuImgById = "UPDATE menus SET img_path=? WHERE id = ?;"

const updateMenuInfo = "UPDATE menus SET name = ?, price = ?, quantity = ?, original_price = ?, status = 1, description = ? WHERE id = ?;"

const updateMenuQuantityById = "UPDATE menus SET quantity=? WHERE id = ?;"

const updateCartItemById = "UPDATE carts SET quantity = ? WHERE id = ?;"

//Delete

const deleteCartsByMenuId = "DELETE FROM carts WHERE menu_id = ?;"

const deleteOrdersByMenuId = "DELETE FROM orders WHERE menu_id = ?;"

const deleteMenuById = "DELETE FROM menus WHERE id = ?;"

const deleteCartById = "DELETE FROM carts WHERE id = ?;"

module.exports = {getCurrentOrdersById, getMenusByRestId, getInvoicesByCustId, getCartsByMenuId,
    getCustomerById, getRestaurantsById,getRestInfoById,updateRestProfile,updateRestImgById,addMenu,getMenuById,
    deleteCartsByMenuId,getOrdersByMenuId,deleteOrdersByMenuId,deleteMenuById,updateMenuQuantityById,getRestCurrentOrdersById,
    getPastOrdersByInvoiceId,getCustCartsById,getCartsByCustId,addInvoice,addOrder,deleteCartById,getCartsByCustMenuId,
    updateCartItemById,addCart,updateMenuInfo,updateMenuImgById
}