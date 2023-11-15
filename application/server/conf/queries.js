export const getCurrentOrdersById = "SELECT * FROM orders WHERE customer_id = ? AND status = 0;"
export const getPastOrdersById = "SELECT * FROM orders WHERE invoice_id = ? AND status > 0;"
export const getInvoicesById = "SELECT * FROM invoices WHERE customer_id = ? ORDER BY created_at DESC;"

export const getCustomerById = "SELECT * FROM customers WHERE id = ?;"

export const getMenusById = "SELECT * FROM menus WHERE id = ?;"
