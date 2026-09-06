
const PRODUCTS_KEY = "chb_products";
const PRODUCT_COUNTER_KEY = "chb_product_counter";
const ORDER_HISTORY_KEY = "chb_order_history";
const ORDER_COUNTER_KEY = "chb_order_counter";

const DEFAULT_PRODUCTS = [
    {id: 1, name: "Standard 4-inch Hollow-Blocks", price: 16, unit: "piece", stock: 500},
    {id: 2, name: "Standard 6-inch Hollow-Blocks", price: 18, unit: "piece", stock: 500},
    {id: 3, name: "Reinforced 4-inch Hollow-Blocks", price: 18, unit: "piece", stock: 500},
    {id: 4, name: "Reinforced 6-inch Hollow-Blocks", price: 20, unit: "piece", stock: 500},
    {id: 5, name: "Concrete Hollow-Blocks", price: 22, unit: "piece", stock: 500}
];

function loadProducts(){
    let raw = localStorage.getItem(PRODUCTS_KEY);

    if(raw === null){
        saveProducts(DEFAULT_PRODUCTS);
        saveProductCounter(DEFAULT_PRODUCTS.length + 1);
        return DEFAULT_PRODUCTS;
    }

    try{
        return JSON.parse(raw);
    } catch(error){
        console.error("Corrupted product data in localStorage, resetting to defaults.", error);
        saveProducts(DEFAULT_PRODUCTS);
        saveProductCounter(DEFAULT_PRODUCTS.length + 1);
        return DEFAULT_PRODUCTS;
    }
}

function saveProducts(productsToSave){
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(productsToSave));
}

function loadProductCounter(){
    let raw = localStorage.getItem(PRODUCT_COUNTER_KEY);
    return raw === null ? DEFAULT_PRODUCTS.length + 1 : parseInt(raw);
}

function saveProductCounter(counter){
    localStorage.setItem(PRODUCT_COUNTER_KEY, String(counter));
}

function loadOrderHistory(){
    let raw = localStorage.getItem(ORDER_HISTORY_KEY);

    if(raw === null){
        return [];
    }

    try{
        return JSON.parse(raw);
    } catch(error){
        console.error("Corrupted order history in localStorage, resetting.", error);
        return [];
    }
}

function saveOrderHistory(historyToSave){
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(historyToSave));
}

function loadOrderCounter(){
    let raw = localStorage.getItem(ORDER_COUNTER_KEY);
    return raw === null ? 1 : parseInt(raw);
}

function saveOrderCounter(counter){
    localStorage.setItem(ORDER_COUNTER_KEY, String(counter));
}