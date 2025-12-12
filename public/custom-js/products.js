function renderProductsPage(products) {
    const productsContainer = document.querySelector('#products-grid');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productHTML = createProductCard(product, 'col-6 col-md-4 col-lg-3 mb-4');
        productsContainer.innerHTML += productHTML;
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const products = await loadProducts();
    
    renderProductsPage(products);
    setupAddToCart();
});