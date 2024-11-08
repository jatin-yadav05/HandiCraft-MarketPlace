import { trees, all, importedVases, wallMirrors, homeDecors, tableDecors, threeDMurals } from "./data/products";
import { getCart } from "./cart";
import { addOrder } from "./orders";

function getCartPrice() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('cartPrice');
}

function loadCheckout() {
    const cart = getCart();
    const cartSummary = document.querySelector('.cart-summary');
    
    cart.forEach(item => {
        // Get the item data from the appropriate category
        let itemData;
        let itemId = parseInt(item.id);
        
        if (item.cartCategory === 'all') {
            itemData = all.find(product => product.id === itemId);
        } else if (item.cartCategory === 'imported-vases') {
            itemData = importedVases.find(product => product.id === itemId);
        } else if (item.cartCategory === 'wall-mirrors') {
            itemData = wallMirrors.find(product => product.id === itemId);
        } else if (item.cartCategory === 'home-decors') {
            itemData = homeDecors.find(product => product.id === itemId);
        } else if (item.cartCategory === 'table-decors') {
            itemData = tableDecors.find(product => product.id === itemId);
        } else if (item.cartCategory === '3d-murals') {
            itemData = threeDMurals.find(product => product.id === itemId);
        } else {
            itemData = trees.find(product => product.id === itemId);
        }

        const itemElement = document.createElement('div');
        itemElement.innerHTML = `
            <div class="flex justify-between">
                <span>${itemData.name} (${item.quantity}x)</span>
                <span>₹${(itemData.price * item.quantity).toFixed(2)}</span>
            </div>`;
        cartSummary.appendChild(itemElement);
    });

    const total = document.querySelector('#cart-total');
    total.innerHTML = `₹${Number(getCartPrice()).toFixed(2)}`;
}

if(getCartPrice() > 0) {
    document.addEventListener('DOMContentLoaded', loadCheckout);
}

if (getCartPrice() == '0') {
    document.querySelector('.whole-checkout').innerHTML = `
        <div class="text-center p-8">
            <img src="./images/empty-cart.svg" alt="Empty Cart" class="w-52 h-5w-52 mx-auto mb-6">
            <h1 class="text-3xl font-bold text-gray-800 mb-4">Your cart is empty</h1>
            <p class="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <a href="./products.html" class="bg-[#994200] text-white px-6 py-3 rounded-lg hover:bg-[#ac5b1c] transition duration-300">
                Start Shopping
            </a>
        </div>`;
}

if(getCartPrice() > 0) {
    document.querySelector('.place-order-js').addEventListener('click', async () => {
        // Get form values
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;

        // Validate form fields
        if (!fullName || !email || !address || !city || !zip) {
            alert('Please fill in all fields');
            return;
        }

        // Get cart items and total
        const cart = getCart();
        const total = getCartPrice();

        try {
            // Create order object
            const order = {
                customerDetails: {
                    fullName,
                    email,
                    address,
                    city,
                    zip
                },
                items: cart,
                total: total,
                status: 'pending',
                date: new Date().toISOString()
            };

            // Add order to Firestore
            await addOrder(order);

            // Clear cart
            localStorage.setItem('cart', JSON.stringify([]));

            // Show success message
            alert('Order placed successfully!');
            
            // Redirect to products page
            window.location.href = './products.html';
        } catch (error) {
            console.error('Error placing order:', error);
            alert('There was an error placing your order. Please try again.');
        }
    });
}
