let products = [
    {name: "Standard 4-inch Hollow-Blocks", price: 16, unit: "piece"},
    {name: "Standard 6-inch Hollow-Blocks", price: 18, unit: "piece"},
    {name: "Reinforced 4-inch Hollow-Blocks", price: 18, unit: "piece"},
    {name: "Reinforced 6-inch Hollow-Blocks", price: 20, unit: "piece"}
]



let container = document.getElementById("products-list");
let html = "";
products.forEach(function(product, index,){
    html += `<div class = "bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg flex flex-col sm:flex-row justify-between p-4 hover:bg-gray-200 mt-4">
                <p class ="font-semibold text center sm:text-left font-arial">${product.name}</p>
                <p class = "text-sm text-gray-800">php${product.price} / ${product.unit}</p>
                    <button class = "rounded-lg bg-gray-300 p-2 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:bg-gray-400" data-index="${index}">Add to Cart</button>

            </div>`

})

container.innerHTML = html;

let cart = [];

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

    cart.forEach(function(item){
        let subtotal = item.price * item.quantity;
        total += subtotal;

        cartHtml += `<div class = "flex justify-between p-2">
            <p>${item.name} (${item.quantity} ${item.unit})</p>
            <p>php${subtotal}</p>
        </div>`
    });

    cartContainer.innerHTML = cartHtml;
    document.getElementById("cart-total").innerText = "Total: php" + total;
}