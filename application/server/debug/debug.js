// This is vars for debug
const TESTMENU_CORRECT = {
    restautrantId: 11,
    price: 10,
    originalPrice: 16,
    name: "pasta"
}

const TESTMENU_WRONG = {
    restautrantId: 1,
    price: 10,
    orignalPrice: 16,
    name: "pasta"
}

const TEST_DELETE_MENU_CORRECT = {
    restaurantId:11, 
    menuId: 7
}

const TEST_DELETE_MENU_WRONG1 = {
    restaurantId:1, 
    menuId: 2
}

const TEST_DELETE_MENU_WRONG2 = {
    restaurantId:11, 
    menuId: 2
}

const TEST_DELETE_MENU_WRONG3 = {
    restaurantId:11, 
    menuId: 9999
}

const TEST_SET_MENU_CORRECT = {
    restaurantId:11, 
    menuId:8, 
    quantity:7
}

// correct
const TEST_SET_MENU_WRONG1 = {
    restaurantId:11, 
    menuId:8, 
    quantity:6
}

// no change
const TEST_SET_MENU_WRONG2 = {
    restaurantId:11, 
    menuId:8, 
    quantity:6
}

// diff rest
const TEST_SET_MENU_WRONG3 = {
    restaurantId:11, 
    menuId:4, 
    quantity:6
}

// menu not exist
const TEST_SET_MENU_WRONG4 = {
    restaurantId:11, 
    menuId:9999, 
    quantity:6
}


const PROFILE_UPDATE1 = {
    id: 1,
    username: "restaurant513",
    password: "sample1!",
    email: "rest1@sam.ple",
    phone: "12312345678",
    city: "San Francisco"
}

const PROFILE_UPDATE2 = {
    id: 2,
    username: "rest2"
}
