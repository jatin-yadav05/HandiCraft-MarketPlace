import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore"; // Firestore methods
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getAllOrders } from '../scripts/orders.js';
import { trees, all, importedVases, wallMirrors, homeDecors, tableDecors, threeDMurals } from "../scripts/data/products.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmk9UfbIvxX68GbpK_wbTyxe_Bh9tl6c0",
    authDomain: "handicraft-marketplace-63df1.firebaseapp.com",
    projectId: "handicraft-marketplace-63df1",
    storageBucket: "handicraft-marketplace-63df1.appspot.com",
    messagingSenderId: "34989980332",
    appId: "1:34989980332:web:de98a27de1c702dafd3d09",
    measurementId: "G-2EC4QFTCM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app); // Firestore instance
const auth = getAuth(app); // Initialize Firebase Auth

// Load user profile from Firestore
async function loadUserProfile(userId) {
    const userRef = doc(firestore, 'users', userId); // Firestore document reference
    const userSnap = await getDoc(userRef); // Fetch user data

    if (userSnap.exists()) {
        const userData = userSnap.data(); // Get user data

        // Update the DOM with user data
        document.getElementById('full-name').innerText = userData.fullName || '-not added-';
        document.getElementById('mobile-no').innerText = userData.mobileNo || '-not added-';
        document.getElementById('email-id').innerText = userData.emailId || '-not added-';
        document.getElementById('hint-name').innerText = userData.hintName || '-not added-';
        document.getElementById('alternate-mobile').innerText = userData.alternateMobile || '-not added-';
        document.getElementById('location').innerText = userData.location || '-not added-';
        document.getElementById('date-of-birth').innerText = userData.dateOfBirth || '-not added-';
        document.getElementById('gender').innerText = userData.gender || 'MALE';

        // Set input fields for editing
        document.getElementById('edit-full-name').value = userData.fullName || '';
        document.getElementById('edit-mobile-no').value = userData.mobileNo || '';
        document.getElementById('edit-email-id').value = userData.emailId || '';
        document.getElementById('edit-hint-name').value = userData.hintName || '';
        document.getElementById('edit-alternate-mobile').value = userData.alternateMobile || '';
        document.getElementById('edit-location').value = userData.location || '';
        document.getElementById('edit-date-of-birth').value = userData.dateOfBirth || '';
        document.getElementById('edit-gender').value = userData.gender || 'MALE';
    } else {
        console.log('No user data found!');
    }
}

// Auth state change listener
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in, show logout button and hide login/signup
        const userId = user.uid; // Get the currently signed-in user ID
        loadUserProfile(userId); // Load user profile from Firestore
        document.getElementById('imported-link').style.display = 'inline';
        document.getElementById('login-nav').style.display = 'none';
          document.getElementById('signup-nav').style.display = 'none';
          document.getElementById('extra-link').style.display = 'inline';
      } else {
          // No user is logged in, show login/signup and hide logout
          window.location.href = 'login.html'; // Redirect to login page if not logged in
          document.getElementById('imported-link').style.display = 'inline';
          document.getElementById('login-nav').style.display = 'inline';
          document.getElementById('signup-nav').style.display = 'inline';
          document.getElementById('extra-link').style.display = 'none';
      }
});

// Logout functionality
document.getElementById("logout").addEventListener("click", async function () {
    await signOut(auth);
    console.log('Sign-out successful.');
    window.location.href = './login.html'; // Redirect to login page after logout
});

// Edit Profile
function editProfile() {
    document.querySelector('.edit-button').classList.add('hidden');
    document.querySelector('.save-button').classList.remove('hidden');

    var profileItems = document.querySelectorAll('.profile-item');
    profileItems.forEach(item => {
        item.querySelector('span').classList.add('hidden');
        item.querySelector('input, select').classList.remove('hidden');
    });
}

// Save Profile
async function saveProfile() {
    const userId = auth.currentUser.uid; // Get the currently signed-in user ID
    const userRef = doc(firestore, 'users', userId); // Firestore reference

    const updatedData = {
        fullName: document.getElementById('edit-full-name').value,
        mobileNo: document.getElementById('edit-mobile-no').value,
        emailId: document.getElementById('edit-email-id').value,
        hintName: document.getElementById('edit-hint-name').value,
        alternateMobile: document.getElementById('edit-alternate-mobile').value,
        location: document.getElementById('edit-location').value,
        dateOfBirth: document.getElementById('edit-date-of-birth').value,
        gender: document.getElementById('edit-gender').value
    };

    await updateDoc(userRef, updatedData) // Update Firestore document
        .then(() => {
            alert('Profile updated successfully!');

            // Update displayed values
            for (const key in updatedData) {
                document.getElementById(key.replace(/([A-Z])/g, '-$1').toLowerCase()).innerText = updatedData[key] || '-not added-';
            }

            // Hide input fields and show edit button
            const inputs = document.querySelectorAll('#account-dashboard input, #account-dashboard select');
            inputs.forEach(input => {
                input.classList.add('hidden');
            });

            document.querySelector('.edit-button').classList.remove('hidden');
            document.querySelector('.save-button').classList.add('hidden');

            var profileItems = document.querySelectorAll('.profile-item');
            profileItems.forEach(item => {
                item.querySelector('span').classList.remove('hidden');
                item.querySelector('input, select').classList.add('hidden');

                var input = item.querySelector('input, select');
                var span = item.querySelector('span');
                span.textContent = input.value;
            });
        })
        .catch(error => {
            console.error('Error updating profile:', error);
        });

        document.querySelectorAll('.profile-item span').forEach(span => span.classList.remove('hidden'));
            document.querySelectorAll('.profile-item input, .profile-item select').forEach(input => input.classList.add('hidden'));
            document.querySelector('.edit-button').classList.remove('hidden');
            document.querySelector('.save-button').classList.add('hidden');
            document.querySelector('.cancel-button').classList.add('hidden');
}

// Scroll event for navbar background change
window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    const navBar = document.querySelector('.nav-bar');
    const hasScrolled = window.scrollY > 50;

    topBar.classList.toggle('bg-none', hasScrolled);
    topBar.classList.toggle('bg-[#994200]', !hasScrolled);
    navBar.classList.toggle('shadow-xl', hasScrolled);
});

// DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.edit-button').addEventListener('click', editProfile);
    document.querySelector('.save-button').addEventListener('click', saveProfile);
});

// Add this function to get product details
function getProductDetails(itemId, category) {
    let itemData;
    const id = parseInt(itemId);
    
    if (category === 'all') {
        itemData = all.find(product => product.id === id);
    } else if (category === 'imported-vases') {
        itemData = importedVases.find(product => product.id === id);
    } else if (category === 'wall-mirrors') {
        itemData = wallMirrors.find(product => product.id === id);
    } else if (category === 'home-decors') {
        itemData = homeDecors.find(product => product.id === id);
    } else if (category === 'table-decors') {
        itemData = tableDecors.find(product => product.id === id);
    } else if (category === '3d-murals') {
        itemData = threeDMurals.find(product => product.id === id);
    } else {
        itemData = trees.find(product => product.id === id);
    }
    return itemData;
}

// Add modal functions
function openModal() {
    document.getElementById('orderModal').classList.remove('hidden');
    document.getElementById('orderModal').classList.add('z-50')
    document.getElementById('orderModal').classList.add('flex');
}

function closeModal() {
    document.getElementById('orderModal').classList.add('hidden');
    document.getElementById('orderModal').classList.remove('z-50');
    document.getElementById('orderModal').classList.remove('flex');
}

// Add function to show order details
function showOrderDetails(order) {
    const orderDetails = document.getElementById('orderDetails');
    
    // Get product details for each item
    const itemsWithDetails = order.items.map(item => {
        const productDetails = getProductDetails(item.id, item.cartCategory);
        return { ...item, details: productDetails };
    });

    orderDetails.innerHTML = `
        <div class="space-y-6">
            <div class="border-b pb-4">
                <h2 class="text-2xl font-bold text-gray-800">Order #${order.id.slice(0, 8)}</h2>
                <p class="text-gray-600">${new Date(order.date).toLocaleString()}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                    <h3 class="font-semibold text-gray-800">Customer Details</h3>
                    <p><span class="font-medium">Name:</span> ${order.customerDetails.fullName}</p>
                    <p><span class="font-medium">Email:</span> ${order.customerDetails.email}</p>
                    <p><span class="font-medium">Address:</span> ${order.customerDetails.address}</p>
                    <p><span class="font-medium">City:</span> ${order.customerDetails.city}</p>
                    <p><span class="font-medium">ZIP:</span> ${order.customerDetails.zip}</p>
                </div>

                <div class="space-y-2">
                    <h3 class="font-semibold text-gray-800">Order Status</h3>
                    <p class="inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                    }">
                        ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                </div>
            </div>

            <div class="space-y-4">
                <h3 class="font-semibold text-gray-800">Order Items</h3>
                <div class="grid grid-cols-1 gap-4">
                    ${itemsWithDetails.map(item => `
                        <div class="border rounded-lg p-4 flex items-center space-x-4">
                            <img src="${item.details?.image || './images/product-placeholder.png'}" 
                                 alt="${item.details?.name || 'Product'}" 
                                 class="w-24 h-24 object-cover rounded">
                            <div class="flex-1">
                                <h4 class="font-medium text-gray-800">${item.details?.name || 'Product Name Unavailable'}</h4>
                                <p class="text-gray-600">${item.details?.description || 'No description available'}</p>
                                <div class="flex justify-between mt-2">
                                    <p class="text-gray-700">Quantity: ${item.quantity}</p>
                                    <p class="font-medium text-gray-800">₹${(item.details?.price * item.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="border-t pt-4 flex justify-between items-center">
                <span class="text-xl font-bold text-gray-800">Total Amount:</span>
                <span class="text-xl font-bold text-green-600">₹${parseFloat(order.total).toFixed(2)}</span>
            </div>
        </div>
    `;

    openModal();
}

// Update the loadOrders function to include the view details button
async function loadOrders() {
    try {
        const orders = await getAllOrders();
        const ordersContainer = document.getElementById('orders-container');
        
        orders.sort((a, b) => new Date(b.date) - new Date(a.date));

        ordersContainer.innerHTML = orders.map(order => `
            <div class="bg-white p-6 rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-gray-800">Order #${order.id.slice(0, 8)}</h3>
                    <span class="text-sm text-gray-600">${new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="mb-4 text-gray-700">
                    <p><span class="font-semibold">Customer:</span> ${order.customerDetails.fullName}</p>
                    <p><span class="font-semibold">Email:</span> ${order.customerDetails.email}</p>
                    <p><span class="font-semibold">Address:</span> ${order.customerDetails.address}, ${order.customerDetails.city}, ${order.customerDetails.zip}</p>
                </div>
                <div class="border-t border-gray-200 pt-4 mb-4">
                    <h4 class="font-semibold text-lg mb-3 text-gray-800">Items:</h4>
                    <div class="space-y-2">
                        ${order.items.map(item => `
                            <div class="flex justify-between items-center bg-gray-50 p-2 rounded">
                                <span class="text-gray-800">${item.cartCategory} (ID: ${item.id})</span>
                                <span class="font-medium text-gray-700">Qty: ${item.quantity}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="flex justify-between items-center border-t border-gray-200 pt-4">
                    <span class="text-lg font-bold text-gray-800">Total:</span>
                    <span class="text-lg font-bold text-green-600">₹${parseFloat(order.total).toFixed(2)}</span>
                </div>
                <div class="mt-4 flex justify-between items-center">
                    <div class="flex items-center gap-2">
                        <span class="px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-300 hover:shadow-lg ${
                            order.status === 'pending' ? 'bg-gradient-to-r from-yellow-300 to-yellow-400 text-yellow-900 border-2 border-yellow-500' :
                            order.status === 'processing' ? 'bg-gradient-to-r from-blue-300 to-blue-400 text-blue-900 border-2 border-blue-500' : 
                            order.status === 'completed' ? 'bg-gradient-to-r from-green-300 to-green-400 text-green-900 border-2 border-green-500' :
                            'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 border-2 border-gray-500'
                        }">
                            <div class="flex items-center">
                                <span class="mr-2 text-lg">${
                                    order.status === 'pending' ? '⏳' :
                                    order.status === 'processing' ? '⚙️' :
                                    order.status === 'completed' ? '✅' : '❔'
                                }</span>
                                ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </div>
                        </span>
                    </div>
                    <button onclick="showOrderDetails(${JSON.stringify(order).replace(/"/g, '&quot;')})" 
                            class="px-4 py-2 bg-[#994200] text-white rounded-lg hover:bg-[#ac5b1c] transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"/>
                        </svg>
                        View Details
                    </button>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading orders:', error);
        document.getElementById('orders-container').innerHTML = `
            <div class="text-red-500">Error loading orders. Please try again later.</div>
        `;
    }
}

// Make functions available globally
window.showOrderDetails = showOrderDetails;
window.closeModal = closeModal;

// Initialize
document.addEventListener('DOMContentLoaded', loadOrders);
