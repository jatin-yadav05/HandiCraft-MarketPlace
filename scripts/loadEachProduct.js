import { trees, importedVases, wallMirrors, homeDecors, tableDecors, threeDMurals,products,all } from "./data/products";
import { addItemToCart } from "./cart";

// console.log(products);
console.log(all);
let productCategory = "all";

function getProductById(id, category) {
    if (category === 'kalparvriksha') {
        productCategory='trees';
        return trees.find(product => product.id === parseInt(id));
    } else if (category === 'imported-vases') {
        productCategory='importedVases';
        return importedVases.find(product => product.id === parseInt(id));
    } else if (category === 'wall-mirrors') {
        productCategory='wallMirrors';
        return wallMirrors.find(product => product.id === parseInt(id));
    }else if (category === 'home-decors') {
        productCategory='homeDecors';
        return homeDecors.find(product => product.id === parseInt(id));
    }else if (category === 'table-decor') {
        productCategory='tableDecors';
        return tableDecors.find(product => product.id === parseInt(id));
    }else if (category === '3d-murals') {
        productCategory='threeDMurals';
        return threeDMurals.find(product => product.id === parseInt(id));
    }else if(category === 'products'){
        productCategory='products';
        return products.find(product => product.id === parseInt(id));
    }else if(category === 'all'){
        console.log('hi');
        productCategory='all';
        return all.forEach((product) => {
            console.log(product.id,product.category);
            if(product.id === parseInt(id) && product.category === category){
                return product;
            }
        });
    }
    return null;
}
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const category = urlParams.get('category');
const product = getProductById(productId, category);

function renderProduct(product) {
    console.log(product);
    if (!product) {
        document.querySelector('main').innerHTML = "<p>Product not found</p>";
        return;
    }
    
    document.querySelector('main').innerHTML = `
        <section class="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-lg shadow-md">
            <div class="md:flex-1">
                <img src="${product.image}" alt="${product.name}" class="w-full h-auto rounded-lg">
            </div>
            <div class="md:flex-1">
                <div class="flex justify-center h-5 mb-4">
                    <img src="./images/ratings/rating-${Math.floor(product.rating)}0.png" alt="Product Rating">
                </div>
                <h1 class="text-center text-2xl font-bold mb-4">${product.name}</h1>
                <p class="mb-4">${product.description}</p>
                <div class="space-y-6">
                    <div class="bg-gray-100 p-4 rounded-lg">
                        <div class="flex justify-between items-center mb-4">
                            <span class="text-lg font-semibold text-gray-700">Quantity</span>
                            <div class="flex items-center border border-gray-300 rounded-md overflow-hidden">
                                <button class="px-3 py-2 decrease bg-white text-gray-600 hover:bg-gray-100 transition duration-150 ease-in-out decrease">-</button>
                                <input type="number" value="${product.qty}" min="1" class="w-16 text-center border-x border-gray-300 py-2 quantity-selector">
                                <button class="px-3 increase py-2 bg-white text-gray-600 hover:bg-gray-100 transition duration-150 ease-in-out increase">+</button>
                            </div>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-lg font-semibold text-gray-700">Total Price</span>
                            <span class="text-2xl font-bold text-blue-900 price-total">₹${product.price}</span>
                        </div>
                    </div>
                    <div class="flex space-x-4">
                        <button data-id="${product.id}" data-category="${productCategory}" class="flex-1 add-product-to-cart px-6 py-3 bg-blue-900 text-white rounded-md font-semibold add-to-bag hover:bg-blue-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            ADD TO BAG
                        </button>
                        <button class="px-6 py-3 bg-white border-2 border-blue-900 text-blue-900 rounded-md font-semibold save hover:bg-blue-50 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            ♡ SAVE
                        </button>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="mt-8 bg-white p-8 rounded-lg shadow-md">
            <div class="flex border-b border-gray-300 mb-4">
                <button class="px-4 py-2 border-b-2 border-blue-900 tab-btn active" data-tab="description">DESCRIPTION</button>
                <button class="px-4 py-2 tab-btn" data-tab="reviews">REVIEWS</button>
            </div>
            <div>
                <div id="description" class="tab-pane">
                    <div class="mb-4">${product.fullDescription}</div>
                </div>
                <div id="reviews" class="tab-pane hidden">
                    ${product.reviews.map(review => `
                        <div class="border-b pb-4 mb-4">
                            <div class="flex items-center mb-2">
                                <span class="text-yellow-500 mr-2"><img class="h-5" src="./images/ratings/rating-${review.rating}0.png" alt=""></span>
                                <span class="font-bold">${review.name}</span>
                            </div>
                            <p>${review.comment}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}

renderProduct(product);


document.querySelector('.add-product-to-cart').addEventListener('click', (e) => {
        const productId = e.target.getAttribute('dataset-id');
        const productCategory = e.target.getAttribute('dataset-category');
        console.log(productId,productCategory);
        addItemToCart(productId,productCategory);
});