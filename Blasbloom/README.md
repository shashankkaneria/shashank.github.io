# 🌿 Blasbloom - Premium Beverages E-Commerce Website

A modern, responsive single-page e-commerce website for selling premium Sharbat and Tea products with a professional design and smooth animations.

## 📋 Features

### ✨ Core Features
- **Single Page Application**: All sections on one smooth scrolling page
- **Product Showcase**: 4 products (Rose Sharbat, Lemon Ginger Sharbat, Green Tea, Assam Tea)
- **Multiple Product Images**: Each product has 3 photos with auto-rotating gallery on hover
- **Shopping Cart**: Add/remove items, adjust quantities, real-time calculations
- **WhatsApp Integration**: One-click checkout sends detailed order to WhatsApp with calculations
- **Customer Testimonials**: 6 authentic customer reviews with 5-star ratings
- **Contact Section**: Manufacturing unit and counter addresses, WhatsApp contact option
- **Professional Footer**: Copyright and developer information

### 🎨 Design & UX
- **Subtle Color Scheme**: Brown, cream, and forest green colors for premium feel
- **Professional Typography**: Playfair Display for headers, Montserrat for body
- **Smooth Animations**: 
  - Navigation slide-down animation
  - Product cards fade-in and hover lift effect
  - Cart sidebar slide animation
  - Image transitions
  - Scroll animations for sections
- **Responsive Design**: Perfect on desktop, tablet, and mobile devices
- **Dark Mode Ready**: Professional color contrast and readability

## 📁 File Structure

```
Blasbloom/
├── index.html       # Main HTML file with all sections
├── styles.css       # Complete styling with animations
├── script.js        # JavaScript for interactivity and WhatsApp integration
└── README.md        # Documentation (this file)
```

## 🚀 How to Use

### 1. **View the Website**
   - Open `index.html` in any web browser
   - No server or installation required

### 2. **Add Products to Cart**
   - Click the "+" button on any product card
   - Product quantity and cart count update automatically
   - Cart items appear in the sidebar

### 3. **Manage Cart**
   - Click the shopping cart icon (top right) to open cart sidebar
   - Increase/decrease quantities using +/- buttons
   - Remove items with "Remove" button
   - See real-time calculation of Subtotal, Tax (5%), and Total

### 4. **Checkout via WhatsApp**
   - Click "Proceed to Checkout" button
   - A detailed order message will open WhatsApp
   - Message includes:
     - All items with quantities and individual prices
     - Subtotal amount
     - Tax calculation (5%)
     - Total amount
   - Complete payment discussion with business owner

### 5. **Navigation**
   - Use sticky navbar to navigate between sections
   - Products, Testimonials, and Contact links
   - Smooth scrolling between sections

## 🎯 Product Details

### Sharbat Category
- **Rose Sharbat**: ₹299 - Traditional rose-flavored concentrate
- **Lemon Ginger Sharbat**: ₹349 - Zesty lemon with warming ginger

### Tea Category
- **Green Tea**: ₹249 - Premium quality, rich in antioxidants
- **Assam Tea**: ₹279 - Bold and malty Indian tea

## 📱 Key Sections

### Navigation Bar
- Company logo with leaf icon
- Links to Products, Testimonials, Contact
- Shopping cart icon with item counter
- Sticky positioning for easy access

### Hero Section
- Eye-catching headline with tagline
- Animated blob background elements
- Call-to-action button to explore products

### Products Section
- Organized by category (Sharbat, Tea)
- Product cards with:
  - 3-image gallery with dots
  - Auto-rotating images on hover
  - Product description
  - Price display
  - Add to cart button

### Cart Sidebar
- Fixed-position cart panel (400px on desktop)
- Shows all cart items with images
- Quantity controls (+ / -)
- Item-wise pricing
- Summary with tax calculation
- Checkout button

### Testimonials
- 6 customer reviews with 5-star ratings
- Professional card design
- Hover animations

### Contact Section
- Manufacturing unit address
- Counter/Shop address
- Direct WhatsApp contact button

### Footer
- Copyright information
- Developer credit (Shashank Kaneria, 2026)
- Social media links (WhatsApp, Facebook, Instagram)

## 💾 Features Details

### Cart Persistence
- Cart data is saved to browser's local storage
- Cart persists even after closing the browser
- Items remain in cart on page refresh

### WhatsApp Integration
- **Phone Number**: +91 9649507931
- Uses `wa.me` API for web.whatsapp.com integration
- Message format:
  ```
  📱 NEW ORDER FROM BLASBLOOM
  
  Items Ordered:
  ─────────────────────
  Product Name
    Qty: X × ₹Price
    Subtotal: ₹Amount
  
  Order Summary:
  Subtotal: ₹Amount
  Tax (5%): ₹Amount
  Total Amount: ₹Amount
  
  💳 Ready to proceed with payment
  Thank you for your order!
  🙏 Blasbloom Premium Beverages
  ```

### Responsive Breakpoints
- **Desktop**: 1200px - Full layout
- **Tablet**: 768px - Adjusted spacing, full-width cart
- **Mobile**: 480px - Optimized single column, hamburger navigation

## 🎨 Color Palette

```
Primary Color:   #8B7355 (Brown)
Secondary Color: #D4A574 (Cream/Gold)
Accent Color:    #2C5F2D (Forest Green)
Light BG:        #F5F3F0 (Off-white)
Text Dark:       #2C2C2C (Dark Gray)
Text Light:      #6B6B6B (Medium Gray)
```

## 🔧 Customization Guide

### Change Phone Number
Edit the WhatsApp number in:
1. **HTML** - Contact section link
2. **JavaScript** - `proceedToCheckout()` function (line ~82)

```javascript
const phoneNumber = '919649507931'; // Change this
```

### Update Product Prices
Edit in `index.html` product cards:
```html
<span class="price">₹299</span> <!-- Change price here -->
```

### Modify Addresses
Update contact section in `index.html`:
```html
<p>Plot No. 45, Industrial Area</p>
<p>Your Address Here</p>
```

### Change Tax Rate
Edit in `script.js` - `updateCartSummary()` function:
```javascript
const tax = Math.round(subtotal * 0.05); // 0.05 = 5% tax
```

### Update Images
Replace image URLs in product cards with your actual product photos:
```html
<img src="YOUR_IMAGE_URL" alt="Product Name" class="product-img">
```

## 🌐 Deployment

### Option 1: GitHub Pages (Free)
1. Push files to GitHub repository
2. Enable GitHub Pages in repository settings
3. Website automatically deploys

### Option 2: Netlify (Free)
1. Visit netlify.com
2. Drag and drop project folder
3. Website goes live instantly

### Option 3: Any Web Host
1. Upload HTML, CSS, and JS files
2. Ensure files are in same directory
3. Access via your domain

## 📞 Contact Information

- **WhatsApp**: +91 9649507931
- **Developer**: Shashank Kaneria
- **Copyright**: 2026 Blasbloom Premium Beverages

## ✅ Browser Compatibility

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Performance

- Lightweight: No external frameworks (vanilla JavaScript)
- Fast loading: Optimized CSS and minimal JavaScript
- Smooth animations: GPU-accelerated CSS transitions
- Mobile optimized: Responsive and touch-friendly

## 📝 Notes

- Product images are from Unsplash (free stock photos)
- Replace with your actual product photos for production
- WhatsApp integration works on desktop and mobile
- Cart data persists across browser sessions
- No backend required - fully static website

## 🎓 Learning Resources

This website demonstrates:
- HTML5 semantic markup
- CSS3 animations and transitions
- Vanilla JavaScript (no frameworks)
- Local storage API
- Responsive design principles
- Mobile-first approach
- UI/UX best practices

## 📄 License

This website template is created for Blasbloom Premium Beverages. Feel free to customize and use for your business.

---

**Made with ❤️ by Shashank Kaneria**
**Blasbloom Premium Beverages © 2026**
