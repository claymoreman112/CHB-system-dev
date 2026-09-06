// admin.js — page controller for admin.html
// Requires authguard.js, storage.js, dashboard-common.js loaded first.

const session = getSession();

let products = loadProducts();
let productCounter = loadProductCounter();
let cart = [];
let orderHistory = loadOrderHistory();
let orderCounter = loadOrderCounter();

const productsContainer = document.getElementById("products-list");
const cartContainer = document.getElementById("cart-list");
const cartTotalEl = document.getElementById("cart-total");
const orderHistoryContainer = document.getElementById("order-history-list");

const addProductBtn = document.getElementById("add-product-btn");
const addProductForm = document.getElementById("add-product-form");
const createProductBtn = document.getElementById("create-product-btn");

const checkoutBtn = document.getElementById("checkout-btn");
const receiptModal = document.getElementById("receipt-modal");
const receiptList = document.getElementById("receipt-list");
const summarizeBtn = document.getElementById("summarize-order");
const processedByDisplay = document.getElementById("processed-by-display");

const summaryToggleBtn = document.getElementById("summary-toggle-btn");
const summaryPanel = document.getElementById("summary-panel");

// Admin always sees editable rows — no "Admin Mode" toggle on this page.
renderProductsEditable(products, productsContainer);
renderCart(cart, cartContainer, cartTotalEl);
renderOrderHistory(orderHistory, orderHistoryContainer, { showDelete: true });

processedByDisplay.textContent = "Processed by: " + (session.displayName || session.username);

addProductBtn.addEventListener("click", function(){
    addProductForm.classList.toggle("hidden");
});

createProductBtn.addEventListener("click", function(){
    let newName = document.getElementById("new-product-name").value.trim();
    let newPrice = parseFloat(document.getElementById("new-product-price").value);
    let newUnit = document.getElementById("new-product-unit").value.trim();
    let newStock = parseInt(document.getElementById("new-product-stock").value);

    if(newName === ""){ alert("Product name cannot be empty."); return; }
    if(isNaN(newPrice) || newPrice <= 0){ alert("Please enter a valid price."); return; }
    if(newUnit === ""){ alert("Please enter a unit."); return; }
    if(isNaN(newStock) || newStock < 0){ alert("Please enter a valid stock amount."); return; }

    products.push({ id: productCounter, name: newName, price: newPrice, unit: newUnit, stock: newStock });
    productCounter++;
    saveProducts(products);
    saveProductCounter(productCounter);

    document.getElementById("new-product-name").value = "";
    document.getElementById("new-product-price").value = "";
    document.getElementById("new-product-unit").value = "";
    document.getElementById("new-product-stock").value = "";

    addProductForm.classList.add("hidden");
    renderProductsEditable(products, productsContainer);
});

productsContainer.addEventListener("click", function(event){
    if(event.target.dataset.saveIndex !== undefined){
        let index = parseInt(event.target.dataset.saveIndex);
        let row = event.target.closest("div");

        let newName = row.querySelector('input[data-field="name"]').value.trim();
        let newPrice = parseFloat(row.querySelector('input[data-field="price"]').value);
        let newStock = parseInt(row.querySelector('input[data-field="stock"]').value);

        if(newName === ""){ alert("Product name cannot be empty"); return; }
        if(isNaN(newPrice) || newPrice <= 0){ alert("Please enter a valid price"); return; }
        if(isNaN(newStock) || newStock < 0){ alert("Please enter a valid stock"); return; }

        products[index].name = newName;
        products[index].price = newPrice;
        products[index].stock = newStock;

        saveProducts(products);
        renderProductsEditable(products, productsContainer);
    }

    if(event.target.dataset.deleteIndex !== undefined){
        let index = event.target.dataset.deleteIndex;
        let product = products[index];

        if(!confirm("Delete \"" + product.name + "\"? This cannot be undone.")){
            return;
        }
        products.splice(index, 1);
        saveProducts(products);
        renderProductsEditable(products, productsContainer);
    }
});

cartContainer.addEventListener("click", function(event){
    if(event.target.dataset.removeIndex !== undefined){
        let index = event.target.dataset.removeIndex;
        cart.splice(index, 1);
        renderCart(cart, cartContainer, cartTotalEl);
    }
});

checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0){
        alert("Order is empty. Add Products before checking out");
        return;
    }

    let receipt = buildReceiptHtml(cart);
    receiptList.innerHTML = receipt.html;
    document.getElementById("receipt-total").innerText = "Total: ₱" + receipt.total;

    receiptModal.classList.remove("hidden");
});

summarizeBtn.addEventListener("click", function(){
    let orderName = document.getElementById("order-name").value.trim();
    let paymentMethod = document.getElementById("payment-method").value;
    let orderNotes = document.getElementById("order-notes").value.trim();

    let total = 0;
    let missingProducts = [];

    cart.forEach(function(item){
        total += item.price * item.quantity;

        let product = products.find(function(p){ return p.id === item.productId; });
        if(product === undefined){
            missingProducts.push(item.name);
            return;
        }
        product.stock -= item.quantity;
    });

    if(missingProducts.length > 0){
        alert("Item removed from catalog");
    }

    saveProducts(products);
    renderProductsEditable(products, productsContainer);

    let order = {
        id: orderCounter,
        date: new Date().toLocaleString(),
        items: [...cart],
        total: total,
        orderName: orderName,
        processedBy: session.username,
        paymentMethod: paymentMethod,
        notes: orderNotes
    };

    orderHistory.push(order);
    orderCounter++;
    saveOrderHistory(orderHistory);
    saveOrderCounter(orderCounter);

    renderOrderHistory(orderHistory, orderHistoryContainer, { showDelete: true });
    renderSummary(orderHistory, summaryPanel);

    cart = [];
    renderCart(cart, cartContainer, cartTotalEl);

    document.getElementById("order-name").value = "";
    document.getElementById("order-notes").value = "";

    receiptModal.classList.add("hidden");
});

orderHistoryContainer.addEventListener("click", function(event){
    if(event.target.dataset.deleteOrderId !== undefined){
        let orderId = parseInt(event.target.dataset.deleteOrderId);

        if(!confirm("Delete this order? This cannot be undone.")){
            return;
        }

        let index = orderHistory.findIndex(function(o){ return o.id === orderId; });
        if(index === -1){ return; }

        orderHistory.splice(index, 1);
        saveOrderHistory(orderHistory);

        renderOrderHistory(orderHistory, orderHistoryContainer, { showDelete: true });
        renderSummary(orderHistory, summaryPanel);
    }
});

summaryToggleBtn.addEventListener("click", function(){
    summaryPanel.classList.toggle("hidden");
    renderSummary(orderHistory, summaryPanel);
});