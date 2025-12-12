async function loadProducts() {
    try {
        const response = await fetch('json/products.json');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error loading products:', error);
        return [];
    }
}

function createProductCard(product, colClass = 'col-md-3 mb-3') {
    return `
        <div class="${colClass}">
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}₴</p>
                    <button class="btn btn-outline-secondary btn-sm rounded-circle addtocart" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    localStorage.setItem('checkout', cartCount);
    
    const checkoutElement = document.querySelector('#checkout');
    if (checkoutElement) {
        checkoutElement.innerHTML = cartCount;
    }
    
    const checkoutElementMob = document.querySelector('#checkout-mobile');
    if (checkoutElement) {
        checkoutElementMob.innerHTML = cartCount;
    }
}

function addToCart(productId, productName, productPrice, productImage) {
    let cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === productId);
    
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseInt(productPrice),
            image: productImage,
            quantity: 1
        });
    }
    
    saveCart(cart);
    
    console.log(`Added ${productName} to cart`);
}

function setupAddToCart() {
    document.querySelectorAll('.addtocart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.currentTarget.getAttribute('data-product-id');
            const productName = e.currentTarget.getAttribute('data-product-name');
            const productPrice = e.currentTarget.getAttribute('data-product-price');
            const productImage = e.currentTarget.getAttribute('data-product-image');
            
            addToCart(productId, productName, productPrice, productImage);
        });
    });
}