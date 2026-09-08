
function renderProductsEditable(products, container) {
    let html = "";

    products.forEach(function(product, index){
        html += `<div class="item-card-edit">
            <input type="text" value="${product.name}" data-field="name" data-row-index="${index}" class="form-input flex-1"/>
            <input type="number" value="${product.price}" data-field="price" data-row-index="${index}" class="form-input w-20"/>
            <input type="number" value="${product.stock}" data-field="stock" data-row-index="${index}" class="form-input w-20"/>
            <button data-save-index="${index}" class="btn btn-sm btn-neutral">Save</button>
            <button data-delete-index="${index}" class="btn btn-sm btn-danger">Delete</button>
        </div>`;
    });

    container.innerHTML = html;
}

function renderProductsBrowse(products, container, options) {
    options = options || {};
    let showAddToCart = !!options.showAddToCart;
    let html = "";

    products.forEach(function(product){
        html += `<div class="item-card">
            <p class="font-semibold text-center sm:text-left">${product.name}</p>
            <p class="text-sm text-slate-600">₱${product.price} / ${product.unit}</p>
            <p class="text-sm text-slate-600 font-semibold">Stock: ${product.stock}</p>
            ${showAddToCart ? `<button class="btn btn-neutral" data-id="${product.id}">Add</button>` : ""}
        </div>`;
    });

    container.innerHTML = html;
}

function renderCart(cart, cartContainer, cartTotalEl) {
    let cartHtml = "";
    let total = 0;

    cart.forEach(function(item, index){
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartHtml += `<div class="item-card">
            <p class="text-lg font-semibold">${item.name} (${item.quantity} ${item.unit})</p>
            <p class="text-xl font-extrabold text-slate-800">₱${subtotal}</p>
            <button data-remove-index="${index}" class="text-red-600 font-bold text-2xl rounded-full p-2 hover:bg-red-100 transition-colors duration-150">×</button>
        </div>`;
    });

    cartContainer.innerHTML = cartHtml;
    cartTotalEl.innerText = "Total: ₱" + total;
}

function buildReceiptHtml(cart) {
    let html = "";
    let total = 0;

    cart.forEach(function(item){
        let subtotal = item.price * item.quantity;
        total += subtotal;

        html += `<div class="flex justify-between py-2">
            <p>${item.name} (${item.quantity} ${item.unit})</p>
            <p class="font-semibold">₱${subtotal}</p>
        </div>`;
    });

    return { html: html, total: total };
}

function renderOrderHistory(orders, container, options) {
    options = options || {};
    let showDelete = !!options.showDelete;
    let html = "";

    orders.forEach(function(order){
        let itemsList = order.items.map(function(item){
            return item.name + "(" + item.quantity + ")";
        }).join(",");

        let operatorDisplay = order.processedBy || order.workerName || "Unknown";

        html += `<div class="history-entry">
            <div class="flex justify-between font-semibold text-slate-800">
                <p>Order #${order.id}${order.orderName ? " - " + order.orderName : ""}</p>
                <p>₱${order.total}</p>
            </div>
            <p class="text-sm text-slate-500">${order.date} • ${operatorDisplay} • ${order.paymentMethod}</p>
            <p class="text-sm text-slate-700 mt-1">${itemsList}</p>
            ${order.notes ? `<p class="text-sm text-slate-500 italic mt-1">Note: ${order.notes}</p>` : ""}
            ${showDelete ? `<div class="flex justify-end mt-2"><button data-delete-order-id="${order.id}" class="btn btn-sm btn-danger">Delete</button></div>` : ""}
        </div>`;
    });

    container.innerHTML = html;
}

function renderSummary(orders, panelEl) {
    if (orders.length === 0) {
        panelEl.innerHTML = `<p class="text-gray-600">No orders yet.</p>`;
        return;
    }

    let productTotals = {};
    let revenueByDate = {};
    let overallRevenue = 0;

    orders.forEach(function(order){
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

    panelEl.innerHTML = `
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