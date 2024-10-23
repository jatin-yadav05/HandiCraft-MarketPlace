import { trees, all, importedVases, wallMirrors, homeDecors, tableDecors, threeDMurals } from "./data/products";

import { removeItemFromCart } from "./cart";


let wholeCartPrice = 0;

export function renderCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items-container');

    // Clear existing items
    cartContainer.innerHTML = '';

    // Check if cart is empty
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="text-center text-gray-600">Your cart is empty.</p>';
        return;
    }

    // Generate HTML for each cart item
    cart.forEach(item => {
        let itemData;
        let itemId = parseInt(item.id);
        if (item.cartCategory === 'all') {
            itemData = all.find(product => product.id === itemId);
        } else if (item.cartCategory === 'imported-vases') {
            itemData = importedVases.find(product => product.id === itemId);
        } else if (item.cartCategory === 'wall-mirrors') {
            itemData = wallMirrors.find(product => product.id === itemId);
        }
        else if (item.cartCategory === 'home-decors') {
            itemData = homeDecors.find(product => product.id === itemId);
        }
        else if (item.cartCategory === 'table-decors') {
            itemData = tableDecors.find(product => product.id === itemId);
        }
        else if (item.cartCategory === '3d-murals') {
            itemData = threeDMurals.find(product => product.id === itemId);
        }
        else {
            itemData = trees.find(product => product.id === itemId);
        }
        console.log(itemData);
        wholeCartPrice += itemData.price*item.quantity;


        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item bg-white p-4 rounded-lg shadow-md flex flex-col';
        itemElement.innerHTML = `
            <img src="${itemData.image || './images/product-placeholder.png'}" alt="${itemData.name}" class="w-full h-72 object-cover mb-4">
            <h3 class="text-xl font-semibold mb-2">${itemData.name}</h3>
            <p class="text-gray-600 mb-4">${itemData.description}</p>
            <div class="flex justify-between items-center mt-auto">
            <div class="flex items-center">
                <label for="quantity-${itemData.id}" class="mr-2 text-gray-600">Qty:</label>
                <input type="number" id="quantity-${itemData.id}" name="quantity" min="1" value="${item.quantity}" class="w-16 p-1 border rounded text-center">
            </div>
            <span class="text-lg font-bold text-amber-800">₹${itemData.price}</span>
            </div>
            <div class="flex justify-between items-center mt-4">
            <span data-total-price="${(itemData.price * item.quantity).toFixed(2)}" class="text-lg font-bold text-amber-800">Total: ₹${(itemData.price * item.quantity).toFixed(2)}</span>
            <button data-id="${item.id}" data-category="${item.cartCategory}" data class="bg-[#994200] remove-from-cart-js text-white px-4 py-2 rounded hover:bg-[#ac5b1c] transition duration-300">Remove</button>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });
    document.querySelector('.cart-total').innerHTML = `${wholeCartPrice.toFixed(2)}`;
}

// Call renderCartItems when the document is loaded
document.addEventListener('DOMContentLoaded', renderCartItems);

document.addEventListener('click', e => {
    if (e.target.matches('.remove-from-cart-js')) {
        const itemId = e.target.dataset.id;
        const category = e.target.dataset.category;
        console.log(e.target.dataset);
        removeItemFromCart(itemId, category);
        console.log("Before",wholeCartPrice);
        console.log(e.target.parentElement.querySelector('span').dataset.totalPrice);
        wholeCartPrice-=e.target.parentElement.querySelector('span').dataset.totalPrice;
        console.log("After",wholeCartPrice);
        renderCartItems();
    }
});