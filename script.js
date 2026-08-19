let products = [
    {name: "Standard 4-inch Hollow-Blocks", price: 16, unit: "piece"},
    {name: "Standard 6-inch Hollow-Blocks", price: 18, unit: "piece"},
    {name: "Reinforced 4-inch Hollow-Blocks", price: 18, unit: "piece"},
    {name: "Reinforced 6-inch Hollow-Blocks", price: 20, unit: "piece"},
    {name: "Concrete Hollow-Blocks", price: 22, unit: "piece"}
]



let container = document.getElementById("products-list");
let cartContainer = document.getElementById("cart-list");
let html = "";
products.forEach(function(product, index,){
    html += `<div class = "bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg flex flex-col sm:flex-row justify-between p-4 hover:bg-gray-200 mt-4">
                <p class ="font-semibold text center sm:text-left font-arial">${product.name}</p>
                <p class = "text-sm text-gray-800">php${product.price} / ${product.unit}</p>
                    <button class = "rounded-lg bg-gray-300 p-2 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:bg-gray-400" data-index="${index}">Add</button>

            </div>`

})

container.innerHTML = html;

let cart = [];

cartContainer.addEventListener("click", function(event){
    if(event.target.dataset.removeIndex !== undefined){
        let index = event.target.dataset.removeIndex;
        cart.splice(index, 1);
        renderCart();
    }
});

container.addEventListener("click", function(event){
    if(event.target.tagName === "BUTTON"){
        let index = event.target.dataset.index;
        let product = products[index];

        let qty = prompt("How many " + product.unit + "(s) of " + product.name + "?");

  

        if(qty === null){ return; }

              qty = parseInt(qty);

        

        if(isNaN(qty) || qty <= 0){
            alert("Please enter a valid quantity.");
            return;
        }

        cart.push({name: product.name, price: product.price, unit: product.unit, quantity: qty});
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
            <p class = "text-2xl font-extrabold m-4">php${subtotal}</p>
            <button data-remove-index="${index}" class="text-red-600 font-bold px-3 py-1 rounded-lg hover:bg-red-100">Remove</button>
        </div>`
    });

    cartContainer.innerHTML = cartHtml;
    document.getElementById("cart-total").innerText = "Total: php" + total;
}