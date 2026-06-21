// ==================== Products Data & Rendering ====================
let allProducts = [];
let currentSizeSelection = null;

async function loadProducts() {
    try {
        const response = await fetch('products.json');
        allProducts = await response.json();
        renderProducts(allProducts.products);
    } catch (error) {
        console.error('Error loading products:', error);
        showNotification('Error loading products', 'error');
    }
}

function renderProducts(products) {
    const container = document.getElementById('productsContainer');
    const categories = {};
    
    // Group products by category
    products.forEach(product => {
        if (!categories[product.category]) {
            categories[product.category] = [];
        }
        categories[product.category].push(product);
    });
    
    // Render each category
    let html = '';
    Object.keys(categories).forEach(categoryName => {
        html += `
            <div class="category">
                <h3 class="category-title">
                    <i class="fas fa-wine-glass-alt"></i> ${categoryName}
                </h3>
                <div class="products-grid">
                    ${categories[categoryName].map(product => generateProductCard(product)).join('')}
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    setupImageSliders();
}

function generateProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-images">
                <div class="image-slider">
                    ${product.images.map((img, idx) => `
                        <img src="${img}" alt="${product.name} ${idx + 1}" class="product-img ${idx === 0 ? 'active' : ''}">
                    `).join('')}
                    <div class="image-dots">
                        ${product.images.map((_, idx) => `
                            <span class="dot ${idx === 0 ? 'active' : ''}" onclick="switchImage(this)"></span>
                        `).join('')}
                    </div>
                </div>
            </div>
            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="product-description">${product.description}</p>
                <div class="product-sizes">
                    ${product.sizes.map((size, idx) => `
                        <span class="size-badge" data-size="${size.size}" data-price="${size.price}">
                            ${size.size} - ₹${size.price}
                        </span>
                    `).join('')}
                </div>
                <div class="product-footer">
                    <button class="btn btn-small btn-add-cart" onclick="showSizeSelector(${product.id}, '${product.name}', '${product.images[0]}')">
                        <i class="fas fa-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

function showSizeSelector(productId, productName, productImage) {
    const product = allProducts.products.find(p => p.id === productId);
    
    if (!product) return;
    
    // If only one size, add directly
    if (product.sizes.length === 1) {
        addToCart(productName, product.sizes[0].price, product.sizes[0].size, productImage);
        return;
    }
    
    // Show modal for size selection
    const modal = document.createElement('div');
    modal.className = 'size-selector-modal';
    modal.innerHTML = `
        <div class="size-selector-content">
            <div class="size-selector-header">
                <h3>Select Size</h3>
                <button class="close-modal" onclick="this.closest('.size-selector-modal').remove()">×</button>
            </div>
            <div class="size-options">
                ${product.sizes.map(size => `
                    <button class="size-option" onclick="addToCart('${productName.replace(/'/g, "\\'")}', ${size.price}, '${size.size}', '${productImage.replace(/'/g, "\\'")}'); this.closest('.size-selector-modal').remove();">
                        <span class="size-name">${size.size}</span>
                        <span class="size-price">₹${size.price}</span>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ==================== Cart Management ====================
let cart = [];

function addToCart(productName, price, size, image) {
    const cartItemId = `${productName}-${size}`;
    const existingItem = cart.find(item => item.id === cartItemId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: cartItemId,
            name: productName,
            size: size,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${productName} (${size}) added to cart!`);
    
    // Open cart sidebar
    setTimeout(() => {
        openCart();
    }, 300);
}

function updateCart() {
    updateCartItems();
    updateCartCount();
    updateCartSummary();
    saveCartToLocalStorage();
}

function updateCartItems() {
    const cartItemsDiv = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }
    
    cartItemsDiv.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-size">${item.size}</div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="decreaseQty(${index})">−</button>
                    <span class="cart-item-qty">${item.quantity}</span>
                    <button class="qty-btn" onclick="increaseQty(${index})">+</button>
                </div>
                <div class="cart-item-price">₹${(item.price * item.quantity).toLocaleString()}</div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        </div>
    `).join('');
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function updateCartSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    
    document.getElementById('subtotal').textContent = `₹${subtotal.toLocaleString()}`;
    document.getElementById('tax').textContent = `₹${tax.toLocaleString()}`;
    document.getElementById('total').textContent = `₹${total.toLocaleString()}`;
}

function increaseQty(index) {
    cart[index].quantity++;
    updateCart();
}

function decreaseQty(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        updateCart();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    showNotification('Item removed from cart');
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function openCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    
    sidebar.classList.add('active');
    overlay.classList.add('active');
}

// Close cart when clicking outside
document.getElementById('cartOverlay')?.addEventListener('click', toggleCart);

// ==================== Cart Checkout & WhatsApp Integration ====================
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;
    
    // Create order message
    let message = `*📱 NEW ORDER FROM BLASBLOOM*\n\n`;
    message += `*Items Ordered:*\n`;
    message += `─────────────────────\n`;
    
    cart.forEach(item => {
        message += `${item.name}\n`;
        message += `  Size: ${item.size}\n`;
        message += `  Qty: ${item.quantity} × ₹${item.price.toLocaleString()}\n`;
        message += `  Subtotal: ₹${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    message += `─────────────────────\n`;
    message += `*Order Summary:*\n`;
    message += `Subtotal: ₹${subtotal.toLocaleString()}\n`;
    message += `Tax (5%): ₹${tax.toLocaleString()}\n`;
    message += `*Total Amount: ₹${total.toLocaleString()}*\n\n`;
    message += `💳 *Ready to proceed with payment*\n`;
    message += `Thank you for your order!\n`;
    message += `🙏 Blasbloom Premium Beverages`;
    
    // Send via WhatsApp
    const phoneNumber = '917976965185'; // WhatsApp number with country code
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Clear cart after sending
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
        cart = [];
        updateCart();
        toggleCart();
        showNotification('Order sent to WhatsApp! We will confirm shortly.', 'success');
    }, 500);
}

// ==================== Image Slider ====================
function switchImage(dot) {
    const dots = dot.parentElement.querySelectorAll('.dot');
    const images = dot.parentElement.parentElement.querySelectorAll('.product-img');
    const index = Array.from(dots).indexOf(dot);
    
    images.forEach((img, i) => {
        img.classList.remove('active');
        dots[i].classList.remove('active');
    });
    
    images[index].classList.add('active');
    dot.classList.add('active');
}

function setupImageSliders() {
    const imageSliders = document.querySelectorAll('.image-slider');
    
    imageSliders.forEach(slider => {
        const images = slider.querySelectorAll('.product-img');
        const dots = slider.querySelectorAll('.dot');
        let currentIndex = 0;
        let autoRotateInterval;
        
        function rotateImage() {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            currentIndex = (currentIndex + 1) % images.length;
            images[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }
        
        slider.parentElement.addEventListener('mouseenter', () => {
            autoRotateInterval = setInterval(rotateImage, 2000);
        });
        
        slider.parentElement.addEventListener('mouseleave', () => {
            clearInterval(autoRotateInterval);
        });
    });
}

// ==================== Hero Carousel ====================
function setupHeroCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');
    const dotsContainer = document.getElementById('heroDots');
    let currentIndex = 0;
    let timer = null;

    // create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function update() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function goToSlide(i) {
        currentIndex = i;
        update();
        resetTimer();
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        update();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        update();
        resetTimer();
    });

    function startTimer() {
        timer = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            update();
        }, 4000);
    }

    function resetTimer() {
        clearInterval(timer);
        startTimer();
    }

    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', () => resetTimer());

    startTimer();
}

// ==================== Local Storage ====================
function saveCartToLocalStorage() {
    localStorage.setItem('blasbloomCart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
    const saved = localStorage.getItem('blasbloomCart');
    if (saved) {
        cart = JSON.parse(saved);
        updateCart();
    }
}

// Load cart on page load
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    loadProducts();
    setupHeroCarousel();
});

// ==================== Notifications ====================
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#2C5F2D' : '#E74C3C'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== Smooth Scroll Animation ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.product-card, .testimonial-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// ==================== Add to cart button ripple effect ====================
document.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Cart Toggle Mobile ====================
document.getElementById('cartToggle').addEventListener('click', (e) => {
    e.preventDefault();
    toggleCart();
});

// ==================== Prevent scroll when cart is open ====================
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');

[cartSidebar, cartOverlay].forEach(el => {
    const observer = new MutationObserver(() => {
        if (cartSidebar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    observer.observe(cartSidebar, { attributes: true, attributeFilter: ['class'] });
});

console.log('🎉 Blasbloom E-commerce Site Loaded Successfully!');
