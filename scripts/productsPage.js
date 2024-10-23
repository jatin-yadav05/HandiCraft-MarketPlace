import { trees, importedVases, wallMirrors, homeDecors,tableDecors,threeDMurals } from "./data/products";
import { addItemToCart } from "./cart";

let products = [
    {
        id: 1,
        name: "Handcrafted Ceramic Vase",
        price: 79.99,
        image: "/api/placeholder/300/300",
        rating: 4.5,
        date: "2024-03-15"
    },
    {
        id: 2,
        name: "Decorative Clay Pot",
        price: 45.99,
        image: "/api/placeholder/300/300",
        rating: 4.8,
        date: "2024-03-20"
    },
    {
        id: 3,
        name: "Artistic Wall Hanging",
        price: 129.99,
        image: "/api/placeholder/300/300",
        rating: 4.2,
        date: "2024-03-25"
    },
    {
        id: 4,
        name: "Handwoven Basket",
        price: 59.99,
        image: "/api/placeholder/300/300",
        rating: 4.7,
        date: "2024-03-18"
    },
    {
        id: 5,
        name: "Pottery Bowl Set",
        price: 89.99,
        image: "/api/placeholder/300/300",
        rating: 4.6,
        date: "2024-03-22"
    },
    {
        id: 6,
        name: "Ceramic Wind Chimes",
        price: 34.99,
        image: "/api/placeholder/300/300",
        rating: 4.3,
        date: "2024-03-28"
    },
    {
        id: 1,
        name: "Handcrafted Ceramic Vase",
        price: 79.99,
        image: "/api/placeholder/300/300",
        rating: 4.5,
        date: "2024-03-15"
    },
    {
        id: 2,
        name: "Decorative Clay Pot",
        price: 45.99,
        image: "/api/placeholder/300/300",
        rating: 4.8,
        date: "2024-03-20"
    },
    {
        id: 3,
        name: "Artistic Wall Hanging",
        price: 129.99,
        image: "/api/placeholder/300/300",
        rating: 4.2,
        date: "2024-03-25"
    },
    {
        id: 4,
        name: "Handwoven Basket",
        price: 59.99,
        image: "/api/placeholder/300/300",
        rating: 4.7,
        date: "2024-03-18"
    },
    {
        id: 5,
        name: "Pottery Bowl Set",
        price: 89.99,
        image: "/api/placeholder/300/300",
        rating: 4.6,
        date: "2024-03-22"
    },
    {
        id: 6,
        name: "Ceramic Wind Chimes",
        price: 34.99,
        image: "/api/placeholder/300/300",
        rating: 4.3,
        date: "2024-03-28"
    }
];

let productCategory = "all";

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category === "kalparvriksha") {
        products = trees;
        productCategory = "kalparvriksha";
    } else if (category === "imported-vases") {
        products = importedVases;
        productCategory = "imported-vases";
    } else if (category === "wall-mirrors") {
        products = wallMirrors;
        productCategory = "wall-mirrors";
    } else if (category === "home-decors") {
        products = homeDecors;
        productCategory = "home-decors";
    }else if (category === "table-decor") {
        products = tableDecors;
        productCategory = "table-decor";
    }else if (category === "3d-murals") {
        products = threeDMurals;
        productCategory = "3d-murals";
    }else {
        products = [...trees, ...importedVases, ...wallMirrors, ...homeDecors,...tableDecors,...threeDMurals];
    }
    console.log(productCategory);
}

getUrlParams();

function createProductCard(product) {
    return `
                <div class="bg-white rounded-lg relative shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-[90%]">
                    <a href="/eachProduct.html?id=${product.id}&category=${productCategory}" class="block h-full overflow-hidden">
                        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
                    </a>
                    <div style="top:1rem;right:1rem;" class="absolute">
                        <img src="./images/heart.svg" alt="Favorite" class="w-7 h-7 aspect-square cursor-pointer">
                    </div>
                    <div class="p-4 flex flex-col justify-between flex-grow">
                        <h3 class="text-lg font-semibold text-gray-800 mb-2">${product.name}</h3>
                        <div class="flex justify-between items-center">
                            <span class="text-xl font-semibold text-gray-900">Rs.${product.price}</span>
                            <div class="flex items-center text-center justify-center gap-1">
                                <span style="color:#eab308" class="text-2xl">★</span>
                                <span class="text-lg mt-1 text-gray-600">${product.rating}</span>
                            </div>
                        </div>
                    </div>
                    <button dataset-id="${product.id}" dataset-category="${productCategory}" class="w-full add-to-cart-js bg-amber-700 text-white py-2 px-4 rounded-md hover:bg-amber-800 transition-colors duration-300">
                        Add to Cart
                    </button>
                </div>
            `;
}

function renderProducts(sortedProducts) {
    const gridContainer = document.getElementById('products-grid');
    gridContainer.innerHTML = sortedProducts.map(product => createProductCard(product)).join('');
}

function sortProducts(sortBy) {
    let sortedProducts = [...products];

    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'rating':
            sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }

    renderProducts(sortedProducts);
}

renderProducts(products);

document.getElementById('sort-select').addEventListener('change', (e) => {
    sortProducts(e.target.value);
});


window.addEventListener('scroll', () => {
    const topBar = document.querySelector('.top-bar');
    const navBar = document.querySelector('.nav-bar');
    if (window.scrollY > 50) {
        topBar.classList.remove('bg-[#994200]');
        topBar.classList.add('bg-none');
        navBar.classList.add('shadow-xl');
    } else {
        topBar.classList.remove('bg-none');
        topBar.classList.add('bg-[#994200]');
        navBar.classList.remove('shadow-xl');
    }
});

const openSearchButton = document.getElementById('open-search');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const closeSearchButton = document.getElementById('close-search');

// Open search overlay
openSearchButton.addEventListener('click', () => {
    searchOverlay.classList.remove('hidden');
    searchOverlay.classList.add('flex');
    setTimeout(() => {
        searchInput.classList.remove('scale-95', 'opacity-0');
        searchInput.classList.add('scale-100', 'opacity-100');
    }, 50); // slight delay for smooth transition
});

// Close search overlay
closeSearchButton.addEventListener('click', () => {
    searchInput.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        searchOverlay.classList.add('hidden');
        searchOverlay.classList.remove('flex');
    }, 100); // match this to transition duration
});

// Close overlay by clicking outside the search input
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) {
        closeSearchButton.click();
    }
});

document.querySelector('.category-breadcrumb').innerHTML = productCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

document.querySelector('.category-heading').textContent = productCategory.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');


document.querySelector('#search-input').addEventListener('input', (e) => {  
    const searchValue = e.target.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchValue));
    renderProducts(filteredProducts);
});

document.querySelector('#search-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchInput.classList.add('scale-95', 'opacity-0');
        searchOverlay.classList.add('hidden');
        searchOverlay.classList.remove('flex');
    }
});

document.querySelector('#open-search').addEventListener('click', () => {
    document.querySelector('#search-input').focus();
});


document.querySelectorAll('.add-to-cart-js').forEach(button => {
    button.addEventListener('click', (e) => {
        const productId = e.target.getAttribute('dataset-id');
        const productCategory = e.target.getAttribute('dataset-category');
        addItemToCart(productId,productCategory);
    });
});

