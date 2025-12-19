// checkout.js

var loggedin = localStorage.getItem('loggedIn');
if (loggedin == 0) {
    window.location.href = "login";
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

function displayCartItems() {
    const cart = loadCart();
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-5">
                <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                <p class="text-muted">Your cart is empty</p>
                <a href="/shop" class="btn btn-primary">Continue Shopping</a>
            </div>
        `;
        updateOrderSummary(0);
        return;
    }
    
    let itemsHTML = '<div class="list-group list-group-flush">';
    
    cart.forEach((item, index) => {
        itemsHTML += `
            <div class="list-group-item">
                <div class="row align-items-center">
                    <div class="col-md-2">
                        <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
                    </div>
                    <div class="col-md-4">
                        <h6 class="mb-0">${item.name}</h6>
                        <div class="input-group input-group-sm mt-2" style="max-width: 120px;">
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, -1)">-</button>
                            <input type="number" class="form-control text-center no-spinner" value="${item.quantity}" min="1" onchange="setQuantity(${index}, this.value)" id="qty-${index}">
                            <button class="btn btn-outline-secondary" type="button" onclick="updateQuantity(${index}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-md-3 text-end">
                        <strong>${item.price}₴</strong>
                        <br>
                        <small class="text-muted">× ${item.quantity}</small>
                    </div>
                    <div class="col-md-2 text-end">
                        <strong class="text-primary">${item.price * item.quantity}₴</strong>
                        <br>
                        <button class="btn btn-sm btn-link text-danger p-0" onclick="removeFromCart(${index})">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    itemsHTML += '</div>';
    cartItemsContainer.innerHTML = itemsHTML;
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    updateOrderSummary(subtotal);
}

function updateOrderSummary(subtotal) {
    const shipping = 0;
    const taxRate = 0.05; 
    const tax = Math.round(subtotal * taxRate);
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = subtotal + '₴';
    document.getElementById('tax').textContent = tax + '₴';
    document.getElementById('total').textContent = total + '₴';
}

function removeFromCart(index) {
    const cart = loadCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('checkout', cartCount);
    const checkoutElement = document.querySelector('#checkout');
    if (checkoutElement) {
        checkoutElement.innerHTML = cartCount;
    }
    
    displayCartItems();
}

function updateQuantity(index, change) {
    const cart = loadCart();
    const newQuantity = cart[index].quantity + change;
    
    if (newQuantity < 1) {
        // If quantity would be 0, remove item instead
        removeFromCart(index);
        return;
    }
    
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count in navbar
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('checkout', cartCount);
    const checkoutElement = document.querySelector('#checkout');
    if (checkoutElement) {
        checkoutElement.innerHTML = cartCount;
    }
    
    displayCartItems();
}

function setQuantity(index, value) {
    const quantity = parseInt(value);
    
    if (isNaN(quantity) || quantity < 1) {
        displayCartItems();
        return;
    }
    
    const cart = loadCart();
    cart[index].quantity = quantity;
    localStorage.setItem('cart', JSON.stringify(cart));

    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('checkout', cartCount);
    const checkoutElement = document.querySelector('#checkout');
    if (checkoutElement) {
        checkoutElement.innerHTML = cartCount;
    }
    
    displayCartItems();
}

document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

document.getElementById('cardExpiry').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    e.target.value = value;
});

document.getElementById('payment-failure').classList.add('d-none');
document.getElementById('payment-success').classList.add('d-none');

var checkoutForm = document.getElementById('user-checkout');
checkoutForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    var cardnumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    var cardcvv = document.getElementById('cardCvv').value;
    
    if (cardnumber === "1234567891023456" && cardcvv === "123") {
        document.getElementById('payment-failure').classList.add('d-none');
        document.getElementById('payment-success').classList.remove('d-none');
        
        localStorage.setItem('cart', JSON.stringify([]));
        localStorage.setItem('checkout', 0);

        const checkoutElement = document.querySelector('#checkout');
        if (checkoutElement) {
            checkoutElement.innerHTML = 0;
        }

        checkoutForm.querySelector('button[type="submit"]').disabled = true;
        
        document.getElementById('payment-success').scrollIntoView({ behavior: 'smooth' });
    } else {
        document.getElementById('payment-success').classList.add('d-none');
        document.getElementById('payment-failure').classList.remove('d-none');
        document.getElementById('payment-failure').scrollIntoView({ behavior: 'smooth' });
    }
});
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});