# 🚀 Vaidika Developer Quick Reference

## 📌 File Locations & Purposes

### Core Files
| File | Purpose | Edit For |
|------|---------|----------|
| `index.html` | Main structure | HTML content, sections |
| `css/styles.css` | All styling | Colors, fonts, layout, animations |
| `js/main.js` | Core functionality | JavaScript logic, interactions |
| `js/config.js` | Settings & config | Brand info, WhatsApp, colors |
| `data/products.json` | Product database | Add/edit/delete products |

### Documentation
| File | Purpose | Read When |
|------|---------|-----------|
| `README.md` | Full documentation | Need detailed info |
| `SETUP.md` | Quick setup | First time setup |
| `FEATURES.md` | Feature details | Understanding features |
| `TROUBLESHOOTING.md` | Debugging guide | Something broken |
| `INDEX.md` | Project overview | Project orientation |

---

## 🎯 Common Tasks

### Add a New Product
**File**: `data/products.json`

```json
{
  "id": 11,
  "category": "Handicrafts",
  "productName": "Beautiful Brass Plate",
  "shortDescription": "Handcrafted decorative plate",
  "fullDescription": "This beautiful brass plate is handcrafted...",
  "price": 2999,
  "popularity": 75,
  "overallRating": 4.6,
  "image": "./images/brass-plate.jpg",
  "reviews": [
    {
      "userName": "Customer Name",
      "rating": 5,
      "comment": "Excellent product"
    }
  ]
}
```

**Steps**:
1. Open `data/products.json`
2. Find the products array
3. Add your product object to the array
4. Save file
5. Refresh browser

### Change Brand Color
**File**: `css/styles.css`

```css
:root {
    --deep-saffron: #YOUR_NEW_COLOR;  /* Primary brand color */
    --brass-gold: #YOUR_NEW_COLOR;    /* Accent color */
    --warm-beige: #YOUR_NEW_COLOR;    /* Background color */
    /* ... update others ... */
}
```

**Or in**: `js/config.js`

```javascript
colors: {
    primary: '#C64B08',      /* Deep Saffron */
    accent: '#D4AF37',       /* Brass Gold */
    /* ... */
}
```

### Update WhatsApp Number
**File**: `js/config.js`

```javascript
contact: {
    whatsapp: '911234567890',  /* Update here */
    email: 'hello@Vaidika.com',
}
```

**Format**: Country code + number (no +, no spaces)
- India: 911234567890
- USA: 12025551234

### Add Product Image
**Steps**:
1. Create/optimize image (max 200KB)
2. Save to `images/` folder
3. Update `products.json` image field:
   ```json
   "image": "./images/your-image.jpg"
   ```
4. Refresh browser

### Change Hero Text
**File**: `index.html` → Hero Section

```html
<h1 class="hero-title">New Title</h1>
<p class="hero-subtitle">New Subtitle</p>
<div class="hero-description">New description</div>
```

### Update Footer
**File**: `index.html` → Footer Section

```html
<p>Email: newemail@domain.com</p>
<p>Phone: +91 XXXXX XXXXX</p>
<!-- Add social links -->
```

### Change Category Names
**File**: `index.html` → Categories Section

```html
<div class="category-card" data-category="New Category">
    <h3>New Category</h3>
    <p>Category description</p>
</div>
```

---

## 🔍 Key JavaScript Functions

### Product Management
```javascript
loadProducts()              // Load products from JSON
renderProducts(products)    // Display products in grid
createProductCard(product)  // Create single product card
filterAndSortProducts()     // Apply filters and sorting
```

### Cart Management
```javascript
addToCart(product, qty)     // Add item to cart
removeFromCart(productId)   // Remove from cart
updateCartItemQuantity()    // Change item qty
saveCartToStorage()         // Save to localStorage
loadCartFromStorage()       // Load from localStorage
updateCartUI()              // Update cart display
```

### Modal Management
```javascript
openProductModal(product)   // Open product details
closeProductModal()         // Close product modal
openCartDrawer()            // Open cart drawer
closeCartDrawer()           // Close cart drawer
```

### Checkout
```javascript
generateWhatsAppMessage()   // Create WhatsApp order message
// This function:
// 1. Gets customer details (name, phone, address)
// 2. Builds order message with all items
// 3. Opens WhatsApp with pre-filled message
// 4. Clears cart after sending
```

### Utilities
```javascript
renderStars(rating)         // Convert rating to stars
formatCurrency(amount)      // Format as currency
formatDate(date)            // Format date for display
getConfig(key)              // Get config value
```

---

## 🎨 CSS Classes & Selectors

### Common Classes to Modify
```css
.hero-section       /* Hero banner styling */
.navbar            /* Navigation bar */
.product-card      /* Individual product card */
.modal-content     /* Modal styling */
.cart-drawer       /* Shopping cart drawer */
.btn-primary       /* Primary buttons */
.btn-secondary     /* Secondary buttons */
```

### Responsive Breakpoints
```css
/* Desktop (default) */
/* Tablet */
@media (max-width: 768px) { }

/* Mobile */
@media (max-width: 480px) { }
```

---

## 🚨 Debugging Tips

### Check Console for Errors
```
Press F12 → Console tab
Look for red error messages
```

### Common Console Commands
```javascript
// View all products
console.log(productsData);

// View shopping cart
console.log(cart);

// View filtered products
console.log(filteredProducts);

// Check current config
console.log(CONFIG);

// Clear cart
cart = [];

// Check localStorage
console.log(localStorage);
```

### Network Tab (Check File Loading)
```
Press F12 → Network tab
Refresh page
Look for 404 errors (red)
Check file sizes loading
```

### Fix Layout Issues
```css
/* Add to temporarily debug */
* { outline: 1px solid red; }
```

---

## 📐 Responsive Design Guidelines

### Mobile-First Approach
```css
/* Base: Mobile (default) */
.component {
    width: 100%;
    font-size: 14px;
}

/* Tablet: 768px+ */
@media (min-width: 768px) {
    .component {
        width: 50%;
        font-size: 16px;
    }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
    .component {
        width: 33%;
        font-size: 18px;
    }
}
```

### Touch-Friendly Sizes
- Buttons: minimum 44x44px (for touch)
- Links: minimum 44px tall
- Input fields: minimum 44px tall
- Spacing: at least 8px between interactive elements

---

## 🔐 Data Validation

### Validate JSON Before Use
```javascript
// Check JSON syntax
JSON.parse(jsonString);

// Validate product object
if (product.id && product.productName && product.price) {
    // Valid product
}
```

### Input Validation
```javascript
// Validate WhatsApp number
const validNumber = /^\d{10,13}$/.test(phoneNumber);

// Validate email
const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
```

---

## 📊 Performance Checklist

### Image Optimization
- [ ] Images under 200KB each
- [ ] Use modern formats (WebP, AVIF if possible)
- [ ] Compress with TinyPNG or similar
- [ ] Use correct dimensions (no scaling up)

### CSS Optimization
- [ ] Minify CSS for production
- [ ] Remove unused styles
- [ ] Combine media queries
- [ ] Use shorthand properties

### JavaScript Optimization
- [ ] Minify for production
- [ ] Remove console.log() statements
- [ ] Lazy load images if possible
- [ ] Cache DOM queries

### Network Optimization
- [ ] Enable gzip compression
- [ ] Set cache headers
- [ ] Use CDN for static files
- [ ] Minify HTML for production

---

## 🧪 Testing Checklist

### Functional Testing
- [ ] All products load correctly
- [ ] Search works with all keywords
- [ ] Filters work individually
- [ ] Filters work combined
- [ ] Sorting works correctly
- [ ] Add to cart works
- [ ] Remove from cart works
- [ ] Quantity changes work
- [ ] Cart persists on reload
- [ ] WhatsApp checkout works
- [ ] Modal opens/closes properly
- [ ] All links work

### Browser Testing
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (Mac)
- [ ] Mobile browsers

### Device Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768px)
- [ ] Mobile (320px, 375px, 425px)

### Performance Testing
- [ ] Load time < 2 seconds
- [ ] Animations smooth (60fps)
- [ ] No memory leaks
- [ ] Console clean (no errors)

---

## 🔑 Git Commands (If Using Version Control)

```bash
# Initialize repo
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial Vaidika website"

# Check status
git status

# View changes
git diff

# Commit changes
git commit -am "Updated products"

# View history
git log
```

---

## 📦 Deployment Checklist

- [ ] Test on all browsers
- [ ] Test on all devices
- [ ] Run Lighthouse audit
- [ ] Check for console errors
- [ ] Update WhatsApp number
- [ ] Update contact information
- [ ] Add real product images
- [ ] Optimize all images
- [ ] Minify CSS/JS
- [ ] Set up HTTPS
- [ ] Set up analytics
- [ ] Configure error tracking
- [ ] Backup source files
- [ ] Deploy to staging first
- [ ] Test on live server
- [ ] Deploy to production

---

## 🆘 Emergency Procedures

### Website Down - Quick Fix
```javascript
// In browser console, run:
document.body.style.display = 'block';
document.body.style.opacity = '1';
```

### Cart Data Lost - Recovery
```javascript
// Last resort in console:
cart = [];
localStorage.setItem('Vaidika_cart', JSON.stringify(cart));
location.reload();
```

### Styling Broken - Quick Reset
```
Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
```

### JavaScript Error - Debug
```
F12 → Console → Copy error message
Search in main.js or config.js
Check console for red errors
```

---

## 📚 Code Style Guide

### HTML
```html
<!-- Use semantic tags -->
<section id="products">
    <h2>Products</h2>
    <div class="products-grid">
        <!-- Content -->
    </div>
</section>
```

### CSS
```css
/* Use consistent naming */
.component-name { }
.component-name__child { }
.component-name--modifier { }

/* Organize by property */
.class {
    /* Position */
    position: relative;
    
    /* Display */
    display: flex;
    
    /* Sizing */
    width: 100%;
    
    /* Spacing */
    padding: 1rem;
    
    /* Text */
    font-size: 1rem;
    
    /* Colors */
    color: #333;
    
    /* Effects */
    box-shadow: 0 2px 8px;
    transition: all 0.3s ease;
}
```

### JavaScript
```javascript
// Use meaningful names
const currentProduct = getProductById(id);
const cartItems = cart.filter(item => item.quantity > 0);

// Use const by default
const productName = 'Product';

// Use let for loop variables
for (let i = 0; i < 10; i++) { }

// Use arrow functions
const filtered = products.filter(p => p.price > 1000);

// Use template literals
const message = `Product: ${name}, Price: ${price}`;
```

---

## 🎯 Key Metrics to Monitor

### User Metrics
- Total visitors
- Bounce rate
- Average session duration
- Pages per session
- Return visitor rate

### Product Metrics
- Most viewed products
- Most added to cart
- Cart abandonment rate
- Checkout completion rate
- Average order value

### Technical Metrics
- Page load time
- Error rate
- API response time
- Mobile vs desktop ratio
- Browser breakdown

---

## 🚀 Performance Optimization Priorities

### High Priority
1. Image optimization (biggest impact)
2. Minify CSS/JS
3. Remove unused code
4. Enable gzip compression
5. Set cache headers

### Medium Priority
6. Lazy load images
7. Optimize fonts loading
8. Reduce JavaScript size
9. Combine API calls
10. Use CDN

### Low Priority
11. Code splitting
12. Service workers
13. WebP images
14. HTTP/2 push
15. Advanced caching

---

## 📞 Quick Reference Commands

### Local Development
```bash
# Start local server (Python 3)
python -m http.server 8000

# Start local server (Node.js)
npx http-server

# Open browser
http://localhost:8000
```

### File Operations
```bash
# List files
ls -la

# Create folder
mkdir images

# Copy file
cp source.txt destination.txt

# Move file
mv old-name.txt new-name.txt
```

---

**This quick reference covers the most common tasks and troubleshooting.
For more details, refer to the comprehensive documentation files.**
