document.addEventListener('DOMContentLoaded', () => {
    // Quantity selector
    const decreaseBtn = document.querySelector('.decrease');
    const increaseBtn = document.querySelector('.increase');
    const quantityInput = document.querySelector('.quantity-selector');
    const priceTotal = document.querySelector('.price-total');
    const basePrice = 1799;

    function updatePrice() {
        const quantity = parseInt(quantityInput.value);
        priceTotal.textContent = `₹${(basePrice * quantity).toLocaleString()}`;
    }

    decreaseBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
            updatePrice();
        }
    });

    increaseBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
        updatePrice();
    });

    quantityInput.addEventListener('change', updatePrice);

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');

            // Remove active class from all buttons and hide all tab content
            tabBtns.forEach(button => button.classList.remove('active', 'border-blue-900'));
            tabPanes.forEach(pane => pane.classList.add('hidden'));

            // Add active class to clicked button and show corresponding pane
            btn.classList.add('active', 'border-blue-900');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });
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
