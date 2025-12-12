function renderDesktopCarousel(products) {
    const carouselInner = document.querySelector('#productCarousel .carousel-inner');
    if (!carouselInner) return;
    
    carouselInner.innerHTML = '';
    
    for (let i = 0; i < products.length; i += 4) {
        const slideProducts = products.slice(i, i + 4);
        const isActive = i === 0 ? 'active' : '';
        
        const slideHTML = `
            <div class="carousel-item ${isActive}">
                <div class="row">
                    ${slideProducts.map(product => createProductCard(product, 'col-md-3 mb-3')).join('')}
                </div>
            </div>
        `;
        
        carouselInner.innerHTML += slideHTML;
    }
}

function renderMobileCarousel(products) {
    const carouselInner = document.querySelector('#productCarouselMobile .carousel-inner');
    if (!carouselInner) return;
    
    carouselInner.innerHTML = '';
    for (let i = 0; i < products.length; i += 2) {
        const slideProducts = products.slice(i, i + 2);
        const isActive = i === 0 ? 'active' : '';
        
        const slideHTML = `
            <div class="carousel-item ${isActive}">
                <div class="row">
                    ${slideProducts.map(product => createProductCard(product, 'col-6 mb-3')).join('')}
                </div>
            </div>
        `;
        
        carouselInner.innerHTML += slideHTML;
    }
}
document.addEventListener('DOMContentLoaded', async () => {
    const products = await loadProducts();
    
    const carouselProducts = products.slice(0, 8);
    
    renderDesktopCarousel(carouselProducts);
    renderMobileCarousel(carouselProducts);
    
    setupAddToCart();
});