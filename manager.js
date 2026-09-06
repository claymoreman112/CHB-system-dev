// manager.js — page controller for manager.html
// Requires authguard.js, storage.js, dashboard-common.js loaded first.

const session = getSession();
const canEdit = !!session.canEditProducts;

let products = loadProducts();
let productCounter = loadProductCounter();
let orderHistory = loadOrderHistory();

const productsContainer = document.getElementById("products-list");
const orderHistoryContainer = document.getElementById("order-history-list");

const addProductBtn = document.getElementById("add-product-btn");
const addProductForm = document.getElementById("add-product-form");
const createProductBtn = document.getElementById("create-product-btn");

const summaryToggleBtn = document.getElementById("summary-toggle-btn");
const summaryPanel = document.getElementById("summary-panel");

function renderManagerProducts(){
    if(canEdit){
        renderProductsEditable(products, productsContainer);
    } else {
        renderProductsBrowse(products, productsContainer, { showAddToCart: false });
    }
}

renderManagerProducts();
renderOrderHistory(orderHistory, orderHistoryContainer, { showDelete: false });

if(canEdit){
    addProductBtn.classList.remove("hidden");
}

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
    renderManagerProducts();
});

productsContainer.addEventListener("click", function(event){
    if(!canEdit){ return; }

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
        renderManagerProducts();
    }

    if(event.target.dataset.deleteIndex !== undefined){
        let index = event.target.dataset.deleteIndex;
        let product = products[index];

        if(!confirm("Delete \"" + product.name + "\"? This cannot be undone.")){
            return;
        }
        products.splice(index, 1);
        saveProducts(products);
        renderManagerProducts();
    }
});

summaryToggleBtn.addEventListener("click", function(){
    summaryPanel.classList.toggle("hidden");
    renderSummary(orderHistory, summaryPanel);
});