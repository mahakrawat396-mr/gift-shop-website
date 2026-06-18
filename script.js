// Load cart data from localStorage so it works across multiple pages
let cart = JSON.parse(localStorage.getItem('gift_cart')) || [];

// Check which page is open and load cart items if on the cart page
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('cart-items')) {
        updateCartPage();
    }
});

// Function to add items from gifts.html
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('gift_cart', JSON.stringify(cart));
    alert(`${name} has been added to your cart!`);
}

// Function to display items and total on cart.html
function updateCartPage() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer || !cartTotal) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #666;">Your cart is currently empty.</p>';
        cartTotal.innerText = '0';
        return;
    }

    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `<span>${item.name}</span> <span>₹${item.price}</span>`;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    cartTotal.innerText = total;
}

// Live search function for gifts.html
function searchGifts() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;
    
    const filterValue = searchInput.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach((card) => {
        const productNameEle = card.querySelector('h3');
        if (productNameEle) {
            const productName = productNameEle.innerText.toLowerCase();
            if (productName.includes(filterValue)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        }
    });
}
function clearWholeCart(){
  localStorage.removeItem('cart');
  location.reload();    
}
function removeFromCart(index){
    let cart = JSON.parse(localStorage.getItem('cart'))||[]
    cart.splice(index,1);
    localStorage.setItem('cart',JSON.stringify(cart));
    location.reload();
}