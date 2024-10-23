const cartKey = 'cart';
const itemsKey = 'items';

export function initCart() {
    if (!localStorage.getItem(cartKey)) {
        localStorage.setItem(cartKey, JSON.stringify([]));
    }
}

export function initItems() {
    if (!localStorage.getItem(itemsKey)) {
        localStorage.setItem(itemsKey, JSON.stringify([]));
    }
}

export function addItemToCart(itemId,category, quantity = 1) {
    const cart = JSON.parse(localStorage.getItem(cartKey));
    const itemIndex = cart.findIndex(item => item.id === itemId);
    const item = getItem(itemId);
    if (item && item.category !== category) {
        console.error(`Item category mismatch: expected ${item.category}, got ${category}`);
        return;
    }

    if (itemIndex > -1) {
        cart[itemIndex].quantity += quantity;
    } else {
        cart.push({ id: itemId, quantity,cartCategory:category });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    console.log('Cart after adding item:', cart);
}

export function removeItemFromCart(itemId,category) {
    let cart = JSON.parse(localStorage.getItem(cartKey));
    cart = cart.filter(item => item.id !== itemId || item.cartCategory !== category);
    localStorage.setItem(cartKey, JSON.stringify(cart));
    console.log('Cart after removing item:', cart);
}

export function updateItemQuantity(itemId, quantity) {
    const cart = JSON.parse(localStorage.getItem(cartKey));
    const itemIndex = cart.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity = quantity;
        localStorage.setItem(cartKey, JSON.stringify(cart));
        console.log('Cart after updating item quantity:', cart);
    }
}

export function clearCart() {
    localStorage.setItem(cartKey, JSON.stringify([]));
    console.log('Cart after clearing:', []);
}

export function getCart() {
    return JSON.parse(localStorage.getItem(cartKey));
}

export function addItem(item) {
    const items = JSON.parse(localStorage.getItem(itemsKey));
    items.push(item);
    localStorage.setItem(itemsKey, JSON.stringify(items));
    console.log('Items after adding item:', items);
}

export function removeItem(itemId) {
    let items = JSON.parse(localStorage.getItem(itemsKey));
    items = items.filter(item => item.id !== itemId);
    localStorage.setItem(itemsKey, JSON.stringify(items));
    console.log('Items after removing item:', items);
}

export function updateItem(itemId, updatedItem) {
    const items = JSON.parse(localStorage.getItem(itemsKey));
    const itemIndex = items.findIndex(item => item.id === itemId);

    if (itemIndex > -1) {
        items[itemIndex] = { ...items[itemIndex], ...updatedItem };
        localStorage.setItem(itemsKey, JSON.stringify(items));
        console.log('Items after updating item:', items);
    }
}

export function getItem(itemId) {
    const items = JSON.parse(localStorage.getItem(itemsKey));
    return items.find(item => item.id === itemId);
}

export function getAllItems() {
    return JSON.parse(localStorage.getItem(itemsKey));
}

// Initialize cart and items
initCart();
initItems();


console.log('Cart:', getCart());
console.log('All Items:', getAllItems());


