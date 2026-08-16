let products = [
    {name: "Standard 4-inch Hollow-Blocks", price: 16, unit: "piece"},
    {name: "Standard 6-inch Hollow-Blocks", price: 18, unit: "piece"},
    {name: "Reinforced 4-inch Hollow-Blocks", price: 18, unit: "piece"},
    {name: "Reinforced 6-inch Hollow-Blocks", price: 20, unit: "piece"}
]

let container = document.getElementById("products-list");
let html = "";
products.forEach(function(product){
    html += `<div class = "bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)] rounded-lg flex flex-col sm:flex-row justify-between p-4 hover:bg-gray-200 mt-4">
                <p class ="font-semibold text center sm:text-left font-arial">${product.name}</p>
                <p class = "text-sm text-gray-800">php${product.price} / ${product.unit}</p>
                    <button class = "rounded-lg bg-gray-300 p-2 shadow-[0_0_10px_rgba(0,0,0,0.2)] hover:bg-gray-400">Add to Cart</button>

            </div>`

})

container.innerHTML = html;