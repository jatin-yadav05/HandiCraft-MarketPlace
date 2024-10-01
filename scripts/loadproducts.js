import { addItemToCart } from "./cart";
import { products } from "./data/products";

function loadProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card bg-white relative p-4 rounded-lg shadow-lg';

        productCard.innerHTML = `
        <div class="relative w-full aspect-square bg-pink-200 rounded-lg flex items-center justify-center mb-4">
            <img src="${product.image || '/images/default-product.jpg'}" alt="${product.name}" class="max-w-full max-h-full object-contain rounded-lg">
        </div>
        <div style="top:1.5rem;right:1.5rem;" class="absolute">
            <img src="/images/heart.svg" alt="Favorite" class="w-7 h-7 aspect-square cursor-pointer">
        </div>
        <hr class="border-t-2 w-[70%] border-[#ac5b1c] mb-4 mt-4 opacity-50">
        <h3 class="text-lg font-semibold mb-2">${product.name}</h3>
        <p class="text-gray-700 text-sm mb-4">${product.description}</p>
        <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">$${product.price}</p>
        </div>
        <button data-productid="${product.id}" class="add-to-cart w-full py-2 bg-[#994200] hover:bg-[#ac5b1c] text-white font-semibold rounded transition duration-300">
            Add to Cart
        </button>
    `;

        productsGrid.appendChild(productCard);
    });

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            console.log(event.target.dataset);
            const itemId = event.target.dataset.productid;
            const quantity = 1;
            addItemToCart(itemId, quantity);
            const button = event.target;
            button.innerText = 'Added!';
            button.classList.add('bg-green-500');
            setTimeout(() => {
                button.innerText = 'Add to Cart';
                button.classList.remove('bg-green-500');
            }, 1000);
        });
    });
}



document.addEventListener('DOMContentLoaded', () => {
    loadProducts(products);
});