/* ============================================
   TATTVA RA - CONFIGURATION FILE
   Edit these settings to customize your store
   ============================================ */

const CONFIG = {
    // Brand Information
    brand: {
        name: 'Vaidika',
        tagline: 'Rooted in Tradition. Crafted with Soul.',
        description: 'Authentic Indian heritage, spirituality, handcrafted artistry, wellness, and premium gifting',
    },

    // Contact Information
    contact: {
        whatsapp: '919649507931',  // Replace with your WhatsApp number (no + or spaces)
        email: 'vaidikastore@gmail.com',
        phone: '+91 96495 07931',
        address: 'India',
    },

    // Social Media Links
    social: {
        whatsapp: 'https://wa.me/919649507931',
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        pinterest: 'https://pinterest.com',
    },

    // Currency & Localization
    localization: {
        currency: '₹',
        currencyCode: 'INR',
        locale: 'en-IN',
        dateFormat: 'DD/MM/YYYY',
    },

    // Categories
    categories: [
        'Brass Idols',
        'Krishna Vastra',
        'Uparna',
        'Handicrafts',
        'Gift Box',
    ],

    // Colors (matching CSS variables)
    colors: {
        primary: '#C64B08',      // Deep Saffron
        accent: '#D4AF37',       // Brass Gold
        light: '#F5E6D0',        // Warm Beige
        dark: '#4A3728',         // Dark Brown
        maroon: '#5C0E0E',       // Dark Maroon
    },

    // Store Settings
    store: {
        taxPercentage: 0,        // Add tax if applicable
        shippingCost: 0,         // Free shipping
        minOrderValue: 0,        // Minimum order value
        bulkDiscountThreshold: 10000, // Discount for bulk orders
        bulkDiscountPercentage: 10,   // Discount percentage
    },

    // WhatsApp Message Template
    whatsappTemplate: {
        orderHeader: '🛍️ *Vaidika Order Details*',
        orderGreeting: 'Thank you for your order!',
        thanksMessage: 'Thank you for shopping with Vaidika! 🙏',
    },

    // Product Display Settings
    product: {
        itemsPerPage: 12,
        defaultSort: 'popularity',  // 'popularity', 'price-low', 'price-high', 'rating'
        defaultCategory: 'All',
        showRatings: true,
        showReviews: true,
        reviewsPerProduct: 5,
    },

    // Animation Settings
    animation: {
        enabled: true,
        duration: 400,  // milliseconds
        easing: 'ease-out',
    },

    // Feature Flags
    features: {
        searchEnabled: true,
        filterEnabled: true,
        sortEnabled: true,
        cartEnabled: true,
        whatsappCheckout: true,
        bulkGiftingEnabled: true,
        reviewsEnabled: true,
        ratingsEnabled: true,
    },

    // API & Data Settings
    api: {
        productsJsonPath: './data/products.json',
        imageDefaultPath: './images/',
        localStorageKey: 'Vaidika_cart',
    },

    // Messages
    messages: {
        noProducts: 'No products found. Try adjusting your search or filters.',
        emptyCart: 'Your cart is empty. Start shopping!',
        addedToCart: '{product} added to cart successfully!',
        removedFromCart: 'Item removed from cart.',
        orderConfirmation: 'Order sent to WhatsApp! We will confirm your order soon.',
        errorLoadingProducts: 'Error loading products. Please refresh the page.',
        invalidCart: 'Please add items to cart before checkout.',
        fillAllFields: 'Please fill in all required fields.',
    },

    // SEO & Metadata
    meta: {
        title: 'Vaidika - Authentic Indian Heritage & Handicrafts',
        description: 'Premium handcrafted Indian traditional products, brass idols, Krishna vastra, and luxury gifting',
        keywords: 'Indian handicrafts, brass idols, premium gifts, traditional artistry, Krishna vastra',
    },

    // Analytics (add your tracking ID)
    analytics: {
        googleAnalyticsId: '', // Add your GA ID: G-XXXXXXXXXX
        facebookPixelId: '',   // Add your FB Pixel ID
        enableTracking: false,
    },
};

// Helper function to get config value
function getConfig(key) {
    const keys = key.split('.');
    let value = CONFIG;
    for (let k of keys) {
        value = value[k];
        if (value === undefined) return null;
    }
    return value;
}

// Helper function to update WhatsApp links
function updateWhatsAppLinks() {
    const whatsappNumber = CONFIG.contact.whatsapp;
    document.querySelectorAll('[href^="https://wa.me/"]').forEach(link => {
        const query = link.href.includes('?') ? `?${link.href.split('?')[1]}` : '';
        link.href = `https://wa.me/${whatsappNumber}${query}`;
    });
}

// Initialize configuration on page load
document.addEventListener('DOMContentLoaded', () => {
    updateWhatsAppLinks();
    console.log('Configuration loaded:', CONFIG);
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, getConfig };
}
