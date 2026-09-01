let products = [
    {id: 1, name: "Standard 4-inch Hollow-Blocks", price: 16, unit: "piece", stock: 500},
    {id: 2, name: "Standard 6-inch Hollow-Blocks", price: 18, unit: "piece", stock: 500},
    {id: 3, name: "Reinforced 4-inch Hollow-Blocks", price: 18, unit: "piece", stock: 500},
    {id: 4, name: "Reinforced 6-inch Hollow-Blocks", price: 20, unit: "piece", stock: 500},
    {id: 5, name: "Concrete Hollow-Blocks", price: 22, unit: "piece", stock: 500}
]



let container = document.getElementById("products-list");
let cartContainer = document.getElementById("cart-list");



function renderProducts(){
let html = "";
products.forEach(function(product, index,){
if(isAdminMode){
    html += `<div class="item-card-edit">
            <input type="text" value="${product.name}" data-field="name" data-row-index="${index}" class="form-input flex-1"/>
            <input type="number" value="${product.price}" data-field="price" data-row-index="${index}" class="form-input w-20"/>
            <input type="number" value="${product.stock}" data-field="stock" data-row-index="${index}" class="form-input w-20"/>
            <button data-save-index="${index}" class="btn btn-sm btn-neutral">Save</button>
            <button data-delete-index="${index}" class="btn btn-sm btn-danger">Delete</button>
            </div>`
} else {
html += `<div class="item-card">
<p class="font-semibold text-center sm:text-left">${product.name}</p>
<p class="text-sm text-slate-600">₱${product.price} / ${product.unit}</p>
<p class="text-sm text-slate-600 font-semibold">Stock: ${product.stock}</p>
<button class="btn btn-neutral" data-id="${product.id}">Add</button>
</div>`
}
})
container.innerHTML = html;
}



let cart = [];
let orderHistory = [];
let orderCounter = 1;
let isAdminMode = false;
let productCounter = 6;
let isAddingProduct = false;

let adminToggleBtn = document.getElementById("admin-toggle-btn");
adminToggleBtn.addEventListener("click", function(){
    isAdminMode =  !isAdminMode;
    renderProducts();
    addProductBtn.classList.toggle("hidden");
})

renderProducts();

let addProductBtn = document.getElementById("add-product-btn");
let addProductForm = document.getElementById("add-product-form");

addProductBtn.addEventListener("click", function(){
    isAddingProduct = !isAddingProduct;
    addProductForm.classList.toggle("hidden");
});

let createProductBtn = document.getElementById("create-product-btn");

createProductBtn.addEventListener("click", function(){
    let newName = document.getElementById("new-product-name").value.trim();
    let newPrice = parseFloat(document.getElementById("new-product-price").value);
    let newUnit = document.getElementById("new-product-unit").value.trim();
    let newStock = parseInt(document.getElementById("new-product-stock").value);

    if(newName === ""){
        alert("Product name cannot be empty.");
        return;
    }

    if(isNaN(newPrice) || newPrice <= 0){
        alert("Please enter a valid price.");
        return;
    }

    if(newUnit === ""){
        alert("Please enter a unit.");
        return;
    }

    if(isNaN(newStock) || newStock < 0){
        alert("Please enter a valid stock amount.");
        return;
    }

    let newProduct = {
        id: productCounter,
        name: newName,
        price: newPrice,
        unit: newUnit,
        stock: newStock
    };

    products.push(newProduct);
    productCounter++;

    document.getElementById("new-product-name").value = "";
    document.getElementById("new-product-price").value = "";
    document.getElementById("new-product-unit").value = "";
    document.getElementById("new-product-stock").value = "";

    isAddingProduct = false;
    addProductForm.classList.add("hidden");

    renderProducts();
});


cartContainer.addEventListener("click", function(event){
    if(event.target.dataset.removeIndex !== undefined){
        let index = event.target.dataset.removeIndex;
        cart.splice(index, 1);
        renderCart();
    }
});



container.addEventListener("click", function(event){
    if(event.target.dataset.id !== undefined){
        let id = parseInt(event.target.dataset.id);
        let product = products.find(function(p){ return p.id === id;});

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

        cart.push({name: product.name, price: product.price, unit: product.unit, quantity: qty, productId: id});
        renderCart();
    }

    if(event.target.dataset.saveIndex !== undefined){
        let index = parseInt(event.target.dataset.saveIndex);
        let row = event.target.closest("div");

        let newName = row.querySelector('input[data-field="name"]').value.trim();
        let newPrice = parseFloat(row.querySelector('input[data-field="price"]').value); 
        let newStock = parseInt(row.querySelector('input[data-field="stock"]').value);

        if(newName === ""){
            alert("Product name cannot be empty");
            return;
        }

        if(isNaN(newPrice) || newPrice <= 0){
            alert("Please enter a valid price");
            return;
        }

        if(isNaN(newStock) || newStock < 0){
            alert("Please enter a valid stock");
            return;
        }

        products[index].name = newName;
        products[index].price = newPrice;
        products[index].stock = newStock;


        renderProducts();

    }

if(event.target.dataset.deleteIndex !== undefined){ 
    let index = event.target.dataset.deleteIndex
    let product = products[index];

    if(!confirm("Delete \"" + product.name + "\"? This cannot be undone.")){
        return;
    }
    products.splice(index, 1);
    renderProducts();
}
});



function renderCart(){
    let cartHtml = "";
    let total = 0;
        
    cart.forEach(function(item, index){
        let subtotal = item.price * item.quantity;
        total += subtotal;

         

       cartHtml += `<div class="item-card">
    <p class="text-lg font-semibold">${item.name} (${item.quantity} ${item.unit})</p>
    <p class="text-xl font-extrabold text-slate-800">₱${subtotal}</p>
    <button data-remove-index="${index}" class="text-red-600 font-bold text-2xl rounded-full p-2 hover:bg-red-100 transition-colors duration-150">×</button>
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
        
       historyHtml += `<div class="history-entry">
<div class="flex justify-between font-semibold text-slate-800">
<p>Order #${order.id}${order.orderName ? " - " + order.orderName : ""}</p>
<p>₱${order.total}</p>
</div>
<p class="text-sm text-slate-500">${order.date} • ${order.workerName} • ${order.paymentMethod}</p>
<p class="text-sm text-slate-700 mt-1">${itemsList}</p>
${order.notes ? `<p class="text-sm text-slate-500 italic mt-1">Note: ${order.notes}</p>` : ""}
</div>`


    })

    historyCounter.innerHTML = historyHtml;
}

let checkoutBtn = document.getElementById("checkout-btn");
let receiptModal = document.getElementById("receipt-modal");
let receiptList = document.getElementById("receipt-list");
let summarizeBtn = document.getElementById("summarize-order");


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

        receiptHtml += `<div class ="flex justify-between py-2">
        <p>${item.name} (${item.quantity} ${item.unit})</p>
        <p class="font-semibold">₱${subtotal}</p>
    </div>`
    });

    receiptList.innerHTML = receiptHtml;
    document.getElementById("receipt-total").innerText = "Total: ₱" + total;

    receiptModal.classList.remove("hidden");
});


summarizeBtn.addEventListener("click", function(){
    let orderName = document.getElementById("order-name").value.trim();
    let workerName = document.getElementById("worker-name").value.trim();
    let paymentMethod = document.getElementById("payment-method").value;
    let orderNotes = document.getElementById("order-notes").value.trim();

    if(workerName === ""){
        alert("Please enter the worker's name.");
        return;
    }

    let total = 0;
    let missingProducts = [];
    cart.forEach(function(item){
        let subtotal = item.price * item.quantity;
        total += subtotal;

        let product = products.find(function(p){ return p.id === item.productId; });
        if(product === undefined){
            missingProducts.push(item.name);
            return; 
        }
        product.stock -= item.quantity;
    });

    if(missingProducts.length > 0){
        alert("Item removed from catalog")
    }

    renderProducts();

    let order = {
        id: orderCounter,
        date: new Date().toLocaleString(),
        items: [...cart],
        total: total,
        orderName: orderName,
        workerName: workerName,
        paymentMethod: paymentMethod,
        notes: orderNotes
    };

    orderHistory.push(order);
    orderCounter++;
    renderOrderHistory();
    renderSummary();

    cart = [];
    renderCart();

    document.getElementById("order-name").value = "";
    document.getElementById("worker-name").value = "";
    document.getElementById("order-notes").value = "";

    receiptModal.classList.add("hidden");
})

let summaryToggleBtn = document.getElementById("summary-toggle-btn");
let summaryPanel = document.getElementById("summary-panel");

summaryToggleBtn.addEventListener("click", function(){
    summaryPanel.classList.toggle("hidden");
    renderSummary();
});

function renderSummary(){
    if(orderHistory.length === 0){
        summaryPanel.innerHTML = `<p class="text-gray-600">No orders yet.</p>`;
        return;
    }

    let productTotals = {};
    let revenueByDate = {};
    let overallRevenue = 0;

    orderHistory.forEach(function(order){
        overallRevenue += order.total;

        let dateOnly = order.date.split(",")[0];

        if(revenueByDate[dateOnly] === undefined){
            revenueByDate[dateOnly] = 0;
        }
        revenueByDate[dateOnly] += order.total;

        order.items.forEach(function(item){
            if(productTotals[item.name] === undefined){
                productTotals[item.name] = 0;
            }
            productTotals[item.name] += item.quantity;
        });
    });

    let bestSellers = Object.keys(productTotals).map(function(name){
        return { name: name, quantity: productTotals[name] };
    });

    bestSellers.sort(function(a, b){
        return b.quantity - a.quantity;
    });

    let topFive = bestSellers.slice(0, 5);

    let bestSellersHtml = "";
    topFive.forEach(function(product, index){
      bestSellersHtml += `<div class="summary-row">
    <p>${index + 1}. ${product.name}</p>
    <p class="font-semibold text-slate-800">${product.quantity} sold</p>
</div>`;
    });

    let revenueByDateHtml = "";
    Object.keys(revenueByDate).forEach(function(date){
        revenueByDateHtml += `<div class="summary-row">
    <p>${date}</p>
    <p class="font-semibold text-slate-800">₱${revenueByDate[date]}</p>
</div>`;
    });

 summaryPanel.innerHTML = `
    <div>
        <h3 class="font-bold text-lg border-b border-slate-200 pb-1 mb-2 text-slate-800">Best-Selling Products</h3>
        ${bestSellersHtml}
    </div>
    <div>
        <h3 class="font-bold text-lg border-b border-slate-200 pb-1 mb-2 text-slate-800">Revenue by Day</h3>
        ${revenueByDateHtml}
    </div>
    <div class="text-right font-bold text-xl border-t border-slate-200 pt-2 text-slate-800">
        Total Revenue: ₱${overallRevenue}
    </div>
`;
}