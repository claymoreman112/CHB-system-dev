let products = [
    {name: "Standard 4-inch Hollow-Blocks", price: 16, unit: "piece", stock: 500},
    {name: "Standard 6-inch Hollow-Blocks", price: 18, unit: "piece", stock: 500},
    {name: "Reinforced 4-inch Hollow-Blocks", price: 18, unit: "piece", stock: 500},
    {name: "Reinforced 6-inch Hollow-Blocks", price: 20, unit: "piece", stock: 500},
    {name: "Concrete Hollow-Blocks", price: 22, unit: "piece", stock: 500}
]



let container = document.getElementById("products-list");
let cartContainer = document.getElementById("cart-list");

function renderProducts(){
let html = "";
products.forEach(function(product, index,){
    html += `<div class = "bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg flex flex-col sm:flex-row justify-between p-4 hover:bg-gray-200 mt-4">
                <p class ="font-semibold text center sm:text-left font-arial">${product.name}</p>
                <p class = "text-sm text-gray-800">₱${product.price} / ${product.unit}</p>
                <p class = "text-sm text-gray-800 font-semibold">Stock:${product.stock}</p>
                    <button class = "rounded-lg bg-gray-300 p-2 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:bg-gray-400" data-index="${index}">Add</button>

            </div>`

})
container.innerHTML = html;
}

renderProducts();

let cart = [];
let orderHistory = [];
let orderCounter = 1;

cartContainer.addEventListener("click", function(event){
    if(event.target.dataset.removeIndex !== undefined){
        let index = event.target.dataset.removeIndex;
        cart.splice(index, 1);
        renderCart();
    }
});

container.addEventListener("click", function(event){
    if(event.target.tagName === "BUTTON"){
        let index = parseInt(event.target.dataset.index);
        let product = products[index];

        let qty = prompt("How many " + product.unit + "(s) of " + product.name + "?");

  

        if(qty === null){ return; }

              qty = parseInt(qty);

        

        if(isNaN(qty) || qty <= 0){
            alert("Please enter a valid quantity.");
            return;
        }

        if(qty > product.stock){
            alert("Only " + product.stock + " " + product.unit + "(s) available")
            return;
        }

        cart.push({name: product.name, price: product.price, unit: product.unit, quantity: qty, productIndex: index});
        renderCart();
    }
});

function renderCart(){
    let cartContainer = document.getElementById("cart-list");
    let cartHtml = "";
    let total = 0;

    cart.forEach(function(item, index){
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartHtml += `<div class = " bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg  flex flex-col sm:flex-row justify-between p-4 hover:bg-gray-200 mt-4">
            <p class = "text-xl font-semibold m-4">${item.name} (${item.quantity} ${item.unit})</p>
            <p class = "text-2xl font-extrabold m-4">₱${subtotal}</p>
            <button data-remove-index="${index}" class="text-red-600 font-bold p-2 rounded-lg text-2xl hover:bg-red-100">X</button>
        </div>`
    });

    cartContainer.innerHTML = cartHtml;
    document.getElementById("cart-total").innerText = "Total: ₱" + total;
}

function renderOrderHistory(){
    let historyCounter = document.getElementById("order-history-list");
    let historyHtml = "";

    orderHistory.forEach(function(order){
        let itemsList = order.items.map(function(item){
            return item.name + "(" + item.quantity + ")";
        }).join(",");
        
        historyHtml += `<div class="p-4">
        <div class="flex justify-between font-semibold">
        <p>Order #${order.id}</p>
        <p>₱${order.total}</p>
        </div>
        <p class="text-sm text-gray-600">${order.date}</p>
        <p class="text-sm text-gray-800 mt-1">${itemsList}</p>
        </div>`


    })

    historyCounter.innerHTML = historyHtml;
}

let checkoutBtn = document.getElementById("checkout-btn");
let receiptModal = document.getElementById("receipt-modal");
let receiptList = document.getElementById("receipt-list");
let newOrderBtn = document.getElementById("new-order-btn");


checkoutBtn.addEventListener("click", function(){
    if(cart.length === 0){
        alert("Order is empty. Add Products before checking out");
        return;
    }

    let receiptHtml = "";
    let total = 0;

    cart.forEach(function(item){
        let subtotal = item.price * item.quantity
        total += subtotal;

        products[item.productIndex].stock -= item.quantity;

        receiptHtml += `<div class ="flex justify-between py-2">
        <p>${item.name} (${item.quantity} ${item.unit})</p>
        <p class="font-semibold">₱${subtotal}</p>
    </div>`
    });

    renderProducts();

    let order ={
    id: orderCounter,
    date: new Date().toLocaleString(),
    items: [...cart],
    total: total
};

orderHistory.push(order);
orderCounter++;


    receiptList.innerHTML = receiptHtml;
    document.getElementById("receipt-total").innerText = "Total: ₱" + total;

    receiptModal.classList.remove("hidden");
    renderOrderHistory();
});

newOrderBtn.addEventListener("click", function(){
    cart = [];
    renderCart();
    receiptModal.classList.add("hidden");
});


