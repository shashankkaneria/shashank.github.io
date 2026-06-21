/* ============================================
   TATTVA RA - MAIN JAVASCRIPT
   ============================================ */

let productsData = [];
let cart = [];
let filteredProducts = [];
let currentProduct = null;
const defaultDiscountPercent = 18;

// Initialize the website
document.addEventListener('DOMContentLoaded', async () => {
    await loadProducts();
    setupEventListeners();
    loadCartFromStorage();
    initializeProductView();
});

// ============================================
// PRODUCTS MANAGEMENT
// ============================================

async function loadProducts() {
    try {
        const response = await fetch('./data/products.json');
        const data = await response.json();
        productsData = data.products.map(product => normalizeProduct(product));
        filteredProducts = [...productsData];
    } catch (error) {
        console.error('Error loading products:', error);
        productsData = [];
    }
}

function normalizeProduct(product) {
    const sellingPrice = Number(product.sellingPrice ?? product.price ?? 0);
    const originalPrice = Number(product.originalPrice ?? Math.round(sellingPrice / (1 - (defaultDiscountPercent / 100))));
    const imageGallery = Array.isArray(product.imageGallery) && product.imageGallery.length > 0
        ? product.imageGallery
        : [product.image, product.image, product.image];

    return {
        ...product,
        sellingPrice,
        originalPrice,
        imageGallery,
        image: product.image || imageGallery[0]
    };
}

function initializeProductView() {
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.value = 'All';
    }
    filterAndSortProducts();
}

function renderProducts(products) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    grid.innerHTML = '';

    if (products.length === 0) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #4A3728;">No products found</div>';
        return;
    }

    products.forEach(product => {
        const card = createProductCard(product);
        grid.appendChild(card);
    });

    updateAddToCartButtonCounts();
}

function createProductCard(product) {
    const { originalPrice, discountPercent } = getPricing(product);
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.productName}">
        </div>
        <div class="product-content">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.productName}</h3>
            <p class="product-description">${product.shortDescription}</p>
            <div class="product-rating">
                <div class="stars">${renderStars(product.overallRating)}</div>
                <span class="rating-value">${product.overallRating}</span>
            </div>
            <div class="product-price">
                <div class="product-price-current">Rs. ${product.sellingPrice.toLocaleString('en-IN')}</div>
                <div class="product-price-meta">
                    <span class="product-price-original">Rs. ${originalPrice.toLocaleString('en-IN')}</span>
                    <span class="product-discount">${discountPercent}% OFF</span>
                </div>
            </div>
            <div class="product-actions">
                <button class="product-actions button btn-add-cart" data-id="${product.id}">Add to Cart</button>
                <button class="product-actions button btn-quick-view" data-id="${product.id}">Quick View</button>
            </div>
        </div>
    `;

    card.addEventListener('click', () => openProductModal(product));
    card.querySelector('.btn-add-cart').addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
    });
    card.querySelector('.btn-quick-view').addEventListener('click', (e) => {
        e.stopPropagation();
        openProductModal(product);
    });

    return card;
}

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return `${'<i class="fas fa-star"></i>'.repeat(fullStars)}${hasHalfStar ? '<i class="fas fa-star-half-alt"></i>' : ''}${'<i class="far fa-star"></i>'.repeat(emptyStars)}`;
}

// ============================================
// FILTERING & SORTING
// ============================================

function filterAndSortProducts() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const sortOption = document.getElementById('sortSelect').value;

    filteredProducts = productsData.filter(product => {
        const matchesSearch = product.productName.toLowerCase().includes(searchTerm) ||
                            product.shortDescription.toLowerCase().includes(searchTerm) ||
                            product.fullDescription.toLowerCase().includes(searchTerm);
        return matchesSearch;
    });

    if (category !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }

    switch(sortOption) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.sellingPrice - b.sellingPrice);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.sellingPrice - a.sellingPrice);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.overallRating - a.overallRating);
            break;
        case 'popularity':
        default:
            filteredProducts.sort((a, b) => b.popularity - a.popularity);
    }

    renderProducts(filteredProducts);
}

function getPricing(product) {
    const originalPrice = product.originalPrice || product.sellingPrice;
    const discountPercent = originalPrice > 0
        ? Math.round(((originalPrice - product.sellingPrice) / originalPrice) * 100)
        : 0;
    return { originalPrice, discountPercent };
}

function getCartQuantity(productId) {
    const item = cart.find(entry => entry.id === productId);
    return item ? item.quantity : 0;
}

function getAddToCartLabel(quantity) {
    return quantity > 0 ? `Add to Cart (${quantity})` : 'Add to Cart';
}

function updateAddToCartButtonCounts() {
    document.querySelectorAll('.btn-add-cart').forEach(btn => {
        const productId = parseInt(btn.dataset.id, 10);
        btn.textContent = getAddToCartLabel(getCartQuantity(productId));
    });
}

// ============================================
// CART MANAGEMENT
// ============================================

function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }

    saveCartToStorage();
    updateCartUI();
    pinCartDrawerIfItems();
    openCartDrawer(false);
    updateAddToCartButtonCounts();
    showCartNotification(product.productName);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
    pinCartDrawerIfItems();
    updateAddToCartButtonCounts();
}

function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCartToStorage();
        updateCartUI();
        updateAddToCartButtonCounts();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    const subtotal = document.getElementById('subtotal');
    const totalPrice = document.getElementById('totalPrice');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
        cartItems.innerHTML = '';
    } else {
        cartEmpty.style.display = 'none';
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.productName}">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.productName}</div>
                    <div class="cart-item-price">Rs. ${item.sellingPrice.toLocaleString('en-IN')}</div>
                    <div class="cart-item-qty">
                        <input type="number" min="1" value="${item.quantity}" 
                               data-id="${item.id}" class="cart-qty-input" style="width: 50px; padding: 0.25rem;">
                        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            </div>
        `).join('');

        document.querySelectorAll('.cart-qty-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const qty = parseInt(e.target.value) || 1;
                updateCartItemQuantity(parseInt(e.target.dataset.id, 10), qty);
            });
        });

        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                removeFromCart(parseInt(btn.dataset.id, 10));
            });
        });
    }

    const total = cart.reduce((sum, item) => sum + (item.sellingPrice * item.quantity), 0);
    subtotal.textContent = `Rs. ${total.toLocaleString('en-IN')}`;
    totalPrice.textContent = `Rs. ${total.toLocaleString('en-IN')}`;
}

function saveCartToStorage() {
    localStorage.setItem('Vaidika_cart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('Vaidika_cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
        pinCartDrawerIfItems();
        updateAddToCartButtonCounts();
    }
}

function showCartNotification(productName) {
    console.log(`${productName} added to cart!`);
}

// ============================================
// PRODUCT MODAL
// ============================================

function openProductModal(product) {
    currentProduct = product;
    const specs = getProductSpecs(product);
    const { originalPrice, discountPercent } = getPricing(product);
    const gallery = (product.imageGallery && product.imageGallery.length > 0)
        ? product.imageGallery
        : [product.image];
    const modalImage = document.getElementById('modalImage');
    modalImage.src = gallery[0];
    renderModalThumbnails(gallery);
    document.getElementById('modalCategory').textContent = product.category;
    document.getElementById('modalTitle').textContent = product.productName;
    document.getElementById('modalDescription').textContent = product.fullDescription;
    document.getElementById('modalPrice').innerHTML = `
        <span class="modal-price-current">Rs. ${product.sellingPrice.toLocaleString('en-IN')}</span>
        <span class="modal-price-original">Rs. ${originalPrice.toLocaleString('en-IN')}</span>
        <span class="modal-price-discount">${discountPercent}% OFF</span>
    `;
    document.getElementById('modalMaterial').textContent = specs.material;
    document.getElementById('modalDimensions').textContent = specs.dimensions;
    document.getElementById('modalRatingText').textContent = `${product.overallRating} out of 5`;
    document.getElementById('modalStars').innerHTML = renderStars(product.overallRating);
    document.getElementById('qtyInput').value = 1;

    const reviewsList = document.getElementById('reviewsList');
    reviewsList.innerHTML = product.reviews.map(review => `
        <div class="review-item">
            <div class="review-header">
                <span class="review-name">${review.userName}</span>
                <span class="review-rating">${renderStars(review.rating)}</span>
            </div>
            <p class="review-comment">${review.comment}</p>
        </div>
    `).join('');

    document.getElementById('productModal').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function renderModalThumbnails(gallery) {
    const thumbnails = document.getElementById('modalThumbnails');
    if (!thumbnails) return;

    thumbnails.innerHTML = gallery.map((src, index) => `
        <button class="modal-thumb ${index === 0 ? 'active' : ''}" data-src="${src}" type="button">
            <img src="${src}" alt="Product image ${index + 1}">
        </button>
    `).join('');

    const modalImage = document.getElementById('modalImage');
    thumbnails.querySelectorAll('.modal-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbnails.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            modalImage.src = thumb.dataset.src;
        });
    });
}

function getProductSpecs(product) {
    const specsByCategory = {
        'Brass Idols': { material: 'Solid Brass (Hand-polished)', dimensions: '8-12 in height' },
        'Krishna Vastra': { material: 'Silk / Cotton Blend (Handwoven)', dimensions: '2-2.5 m length' },
        'Uparna': { material: 'Wool-Silk Blend with Embroidery', dimensions: '2 m x 0.8 m' },
        'Handicrafts': { material: 'Terracotta / Brass (Artisan-made)', dimensions: '6-10 in (varies by product)' },
        'Gift Box': { material: 'Curated Mixed Materials', dimensions: '14 in x 10 in x 6 in approx.' }
    };

    return specsByCategory[product.category] || {
        material: 'Premium Traditional Material',
        dimensions: 'As per selected product'
    };
}

function closeProductModal() {
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// CART DRAWER
// ============================================

function openCartDrawer(withOverlay = true) {
    document.getElementById('cartDrawer').classList.add('active');
    if (withOverlay) {
        document.getElementById('overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeCartDrawer() {
    document.getElementById('cartDrawer').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function pinCartDrawerIfItems() {
    if (cart.length > 0) {
        document.getElementById('cartDrawer').classList.add('active');
        document.getElementById('overlay').classList.remove('active');
        document.body.style.overflow = 'auto';
        return;
    }

    document.getElementById('cartDrawer').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// ============================================
// CHECKOUT - MODAL FORM + WHATSAPP INTEGRATION
// ============================================

function openCheckoutModal() {
    if (cart.length === 0) {
        alert(CONFIG.messages.emptyCart || 'Your cart is empty.');
        return;
    }

    const itemsContainer = document.getElementById('checkoutOrderItems');
    const totalPriceEl = document.getElementById('checkoutTotalPrice');
    if (!itemsContainer || !totalPriceEl) return;

    itemsContainer.innerHTML = '';
    let total = 0;
    cart.forEach((item, idx) => {
        const itemTotal = item.sellingPrice * item.quantity;
        total += itemTotal;
        const div = document.createElement('div');
        div.className = 'checkout-item';
        div.innerHTML = `<span>${idx + 1}. ${item.productName} x ${item.quantity}</span><span>Rs. ${itemTotal.toLocaleString('en-IN')}</span>`;
        itemsContainer.appendChild(div);
    });

    totalPriceEl.textContent = `Rs. ${total.toLocaleString('en-IN')}`;

    const form = document.getElementById('checkoutForm');
    if (form) form.reset();

    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.add('active');
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.classList.remove('active');
    const overlay = document.getElementById('overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function validateCheckoutForm(data) {
    if (!data.customerName || data.customerName.trim() === '') return false;
    if (!data.customerPhone || !/^\+?\d{7,15}$/.test(data.customerPhone.trim())) return false;
    if (!data.deliveryAddress || data.deliveryAddress.trim() === '') return false;
    if (!data.customerCity || data.customerCity.trim() === '') return false;
    if (!data.customerPostal || data.customerPostal.trim() === '') return false;
    return true;
}

function generateWhatsAppMessageFromForm(formData) {
    let message = `*Vaidika Order Details*\n\n`;
    message += `Customer Information\n`;
    message += `Name: ${formData.customerName}\n`;
    message += `Phone: ${formData.customerPhone}\n`;
    if (formData.customerEmail) message += `Email: ${formData.customerEmail}\n`;
    message += `Address: ${formData.deliveryAddress}\n`;
    message += `City: ${formData.customerCity} - ${formData.customerPostal}\n`;
    message += `Date: ${new Date().toLocaleString('en-IN')}\n\n`;

    message += `Order Items\n`;
    let totalAmount = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;
        message += `${index + 1}. ${item.productName}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Price: Rs. ${item.sellingPrice.toLocaleString('en-IN')}\n`;
        message += `   Subtotal: Rs. ${itemTotal.toLocaleString('en-IN')}\n`;
    });

    message += `\nOrder Summary\n`;
    message += `Total Items: ${cart.reduce((s, it) => s + it.quantity, 0)}\n`;
    message += `Total Amount: Rs. ${totalAmount.toLocaleString('en-IN')}\n\n`;
    message += `Please confirm this order and provide payment details.\n`;
    message += `Thank you for shopping with Vaidika!`;

    const encoded = encodeURIComponent(message);
    const whatsappNumber = (CONFIG && CONFIG.contact && CONFIG.contact.whatsapp) ? CONFIG.contact.whatsapp : '1234567890';
    const url = `https://wa.me/${whatsappNumber}?text=${encoded}`;
    return url;
}

function handleCheckoutFormSubmit(e) {
    e.preventDefault();
    const formData = {
        customerName: document.getElementById('customerName').value.trim(),
        customerPhone: document.getElementById('customerPhone').value.trim(),
        customerEmail: document.getElementById('customerEmail').value.trim(),
        deliveryAddress: document.getElementById('deliveryAddress').value.trim(),
        customerCity: document.getElementById('customerCity').value.trim(),
        customerPostal: document.getElementById('customerPostal').value.trim()
    };

    if (!validateCheckoutForm(formData)) {
        alert(CONFIG.messages.fillAllFields || 'Please fill in all required fields correctly.');
        return;
    }

    const waUrl = generateWhatsAppMessageFromForm(formData);
    window.open(waUrl, '_blank');

    setTimeout(() => {
        cart = [];
        saveCartToStorage();
        updateCartUI();
        pinCartDrawerIfItems();
        updateAddToCartButtonCounts();
        closeCheckoutModal();
        alert(CONFIG.messages.orderConfirmation || 'Order sent to WhatsApp!');
    }, 500);
}

// ============================================
// CATEGORY CARDS CLICK HANDLING
// ============================================

function setupCategoryCards() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            document.getElementById('categoryFilter').value = category;
            filterAndSortProducts();
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', filterAndSortProducts);
    document.getElementById('categoryFilter').addEventListener('change', filterAndSortProducts);
    document.getElementById('sortSelect').addEventListener('change', filterAndSortProducts);

    document.getElementById('cartBtn').addEventListener('click', () => openCartDrawer());
    document.getElementById('cartClose').addEventListener('click', closeCartDrawer);
    document.getElementById('overlay').addEventListener('click', () => {
        if (document.getElementById('cartDrawer').classList.contains('active')) {
            closeCartDrawer();
        } else if (document.getElementById('productModal').classList.contains('active')) {
            closeProductModal();
        } else if (document.getElementById('checkoutModal') && document.getElementById('checkoutModal').classList.contains('active')) {
            closeCheckoutModal();
        }
    });

    document.getElementById('modalClose').addEventListener('click', closeProductModal);
    document.getElementById('qtyMinus').addEventListener('click', () => {
        const input = document.getElementById('qtyInput');
        input.value = Math.max(1, parseInt(input.value, 10) - 1);
    });
    document.getElementById('qtyPlus').addEventListener('click', () => {
        const input = document.getElementById('qtyInput');
        input.value = parseInt(input.value, 10) + 1;
    });
    document.getElementById('addToCartBtn').addEventListener('click', () => {
        const quantity = parseInt(document.getElementById('qtyInput').value, 10);
        addToCart(currentProduct, quantity);
        closeProductModal();
    });

    const checkoutBtnEl = document.getElementById('checkoutBtn');
    if (checkoutBtnEl) checkoutBtnEl.addEventListener('click', openCheckoutModal);

    const checkoutClose = document.getElementById('checkoutModalClose');
    const checkoutCancel = document.getElementById('checkoutCancel');
    const checkoutFormEl = document.getElementById('checkoutForm');
    if (checkoutClose) checkoutClose.addEventListener('click', closeCheckoutModal);
    if (checkoutCancel) checkoutCancel.addEventListener('click', closeCheckoutModal);
    if (checkoutFormEl) checkoutFormEl.addEventListener('submit', handleCheckoutFormSubmit);

    setupCategoryCards();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const yOffset = -220;
                const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
                window.scrollTo({ top: y, behavior: 'smooth' });
            }
        });
    });

    const chatWidgetToggle = document.getElementById('chatWidgetToggle');
    const chatWidgetMenu = document.getElementById('chatWidgetMenu');
    if (chatWidgetToggle && chatWidgetMenu) {
        chatWidgetToggle.addEventListener('click', () => {
            chatWidgetMenu.classList.toggle('active');
        });
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

setTimeout(() => {
    document.querySelectorAll('.product-card').forEach(card => {
        observer.observe(card);
    });
}, 100);

// ============================================
// UTILITY FUNCTIONS
// ============================================

function formatCurrency(amount) {
    return `Rs. ${amount.toLocaleString('en-IN')}`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

console.log('Vaidika Ecommerce Website Initialized');
console.log('Premium Indian Heritage & Handicrafts');
console.log('Products loaded:', productsData.length);
