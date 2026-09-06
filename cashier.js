// cashier.js — page controller for cashier.html
// Requires authguard.js, storage.js, dashboard-common.js loaded first.

const session = getSession();

let products = loadProducts();
let cart = [];
let orderHistory = loadOrderHistory();
let orderCounter = loadOrderCounter();
let myOrders = orderHistory.filter(function(o){ return o.processedBy === session.username; });

const productsContainer = document.getElementById("products-list");
const cartContainer = document.getElementById("cart-list");
const cartTotalEl = document.getElementById("cart-total");
const orderHistoryContainer = document.getElementById("order-history-list");

const checkoutBtn = document.getElementById("checkout-btn");
const receiptModal = document.getElementById("receipt-modal");
const receiptList = document.getElementById("receipt-list");
const summarizeBtn = document.getElementById("summarize-order");
const processedByDisplay = document.getElementById("processed-by-display");

const summaryToggleBtn = document.getElementById("summary-toggle-btn");
const summaryPanel = document.getElementById("summary-panel");

renderProductsBrowse(products, productsContainer, { showAddToCart: true });
renderCart(cart, cartContainer, cartTotalEl);
renderOrderHistory(myOrders, orderHistoryContainer, { showDelete: false });

processedByDisplay.textContent = "Processed by: " + (session.displayName || session.username);

productsContainer.addEventListener("click", function(event){
    if(event.target.dataset.id === undefined){ return; }

    let id = parseInt(event.target.dataset.id);
    let product = products.find(function(p){ return p.id === id; });

    let qty = prompt("How many " + product.unit + "(s) of " + product.name + "?");
    if(qty === null){ return; }

    qty = parseInt(qty);
    if(isNaN(qty) || qty <= 0){
        alert("Please enter a valid quantity.");
        return;
    }
    if(qty > product.stock){
        alert("Only " + product.stock + " " + product.unit + "(s) available");
        return;
    }

    cart.push({ name: product.name, price: product.price, unit: product.unit, quantity: qty, productId: id });
    renderCart(cart, cartContainer, cartTotalEl);
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
    renderProductsBrowse(products, productsContainer, { showAddToCart: true });

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

    myOrders = orderHistory.filter(function(o){ return o.processedBy === session.username; });

    renderOrderHistory(myOrders, orderHistoryContainer, { showDelete: false });
    renderSummary(myOrders, summaryPanel);

    cart = [];
    renderCart(cart, cartContainer, cartTotalEl);

    document.getElementById("order-name").value = "";
    document.getElementById("order-notes").value = "";

    receiptModal.classList.add("hidden");
});

summaryToggleBtn.addEventListener("click", function(){
    summaryPanel.classList.toggle("hidden");
    renderSummary(myOrders, summaryPanel);
});