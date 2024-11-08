import { trees, all, importedVases, wallMirrors, homeDecors, tableDecors, threeDMurals } from "./data/products";

import { removeItemFromCart, updateItemQuantity } from "./cart";



export let wholeCartPrice = 0;

export function renderCartItems() {
    wholeCartPrice = 0;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.querySelector('.cart-items-container');

    // Clear existing items
    cartContainer.innerHTML = '';

    // Check if cart is empty
    if (cart.length === 0) {
        cartContainer.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'min-h-[60vh]');
        document.querySelector('.cart-title').style.display = 'none';
        cartContainer.classList.remove('grid', 'grid-cols-3', 'gap-4');
        cartContainer.innerHTML = `
            <div class="text-center mb-10">
                <img src="./images/empty-cart.svg" alt="Empty Cart" class="w-52 h-52 mx-auto mb-6">
                <h1 class="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
                <p class="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <a href="./products.html" class="bg-[#994200] text-white px-6 py-3 rounded-lg hover:bg-[#ac5b1c] transition duration-300">
                    Start Shopping
                </a>
            </div>`;
        // Set cart total to 0 when cart is empty
        document.querySelector('.cart-total-container').style.display = 'none';
        return;
    }

    // Generate HTML for each cart item
    if(cart.length > 0){
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
                <input type="number" data-id="${itemData.id}" id="quantity-${itemData.id}" name="quantity" min="1" value="${item.quantity}" class="w-16 p-1 update-quantity-js border rounded text-center">
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
    }
    document.querySelector('.cart-total').innerHTML = `${wholeCartPrice.toFixed(2)}`;
}

// Call renderCartItems when the document is loaded
document.addEventListener('DOMContentLoaded', renderCartItems);

document.addEventListener('click', e => {
    if (e.target.matches('.remove-from-cart-js')) {
        const itemId = e.target.dataset.id;
        const category = e.target.dataset.category;
        removeItemFromCart(itemId, category);
        renderCartItems();
    }
});

function updateQuantity(e) {
    const itemId = e.target.dataset.id;
    const quantity = e.target.value;
    console.log(itemId, quantity);
    updateItemQuantity(itemId, quantity);
}

document.addEventListener('change', e => {
    if (e.target.matches('.update-quantity-js')) {
        updateQuantity(e);
        renderCartItems();  
    }
});

document.querySelector('.direct-to-checkout').addEventListener('click', () => {
    window.location.href = `./checkout.html?cartPrice=${wholeCartPrice}`;
});
