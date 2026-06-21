# 🏛️ Vaidika - Premium Indian Heritage Ecommerce Website

A luxurious, single-page ecommerce website for authentic Indian traditional lifestyle and handicraft products.

## ✨ Features

### 🎯 Core Features
- **Hero Section**: Cinematic full-width banner with elegant animations
- **Category Showcase**: Visually rich category cards for easy navigation
- **Product Listing**: Dynamic product grid with search, filter, and sort capabilities
- **Product Modal**: Premium popup with detailed product info, reviews, and quantity selector
- **Shopping Cart**: Slide-in drawer with real-time updates
- **Bulk Gifting**: Dedicated section for corporate and special event gifting
- **About Brand**: Emotional storytelling about Indian heritage and craftsmanship
- **Footer**: Comprehensive footer with social links and contact information

### 🔧 Technical Features
- **JSON-Based Product Management**: All products loaded from `data/products.json`
- **Real-Time Filtering**: Search by product name, category filtering, and dynamic sorting
- **Local Storage Cart**: Cart persists across browser sessions
- **WhatsApp Integration**: Automatic order message generation with customer details
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Elegant transitions and scroll reveal effects
- **Premium Typography**: Google Fonts with Playfair Display for headings and Poppins for body text

### 🎨 Design Aesthetic
- **Color Palette**: Deep saffron, brass gold, warm beige, sandalwood tones, dark maroon
- **Premium Feel**: Luxury materials simulation with subtle shadows and depth
- **Cultural Heritage**: Indian-inspired design elements and storytelling
- **Modern UX**: Clean, minimal interface with premium spacing

## 📁 Project Structure

```
website/
├── index.html              # Main HTML file
├── css/
│   └── styles.css          # Complete styling with animations
├── js/
│   └── main.js             # All JavaScript functionality
├── data/
│   └── products.json       # Product catalog (JSON-based)
└── images/                 # Product images (optional - currently using SVG placeholders)
```

## 🚀 Getting Started

### 1. Open the Website
Simply open `index.html` in a modern web browser:
```
Double-click on index.html
```

Or use a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000`

### 2. Add Products
Edit `data/products.json` to add or modify products. Each product must have:
```json
{
  "id": 1,
  "category": "Category Name",
  "productName": "Product Name",
  "shortDescription": "Short description",
  "fullDescription": "Detailed description",
  "price": 4999,
  "popularity": 95,
  "overallRating": 4.8,
  "image": "image-url-or-path",
  "reviews": [
    {
      "userName": "Customer Name",
      "rating": 5,
      "comment": "Review comment"
    }
  ]
}
```

### 3. Configure WhatsApp
Update the WhatsApp number in `js/main.js`:
```javascript
// Line ~277
const whatsappNumber = 'YOUR_WHATSAPP_NUMBER'; // Replace with actual number
```

Use format: `911234567890` (without + or spaces)

### 4. Add Product Images
Replace the SVG placeholder images with actual product images:
- Create an `images/` folder in the website directory
- Add product images as JPG/PNG
- Update the `image` field in `products.json` with: `./images/product-name.jpg`

## 🎮 Usage Guide

### For Customers
1. **Browse Products**: Scroll through the hero and category sections
2. **Search & Filter**: Use the search bar and filters on the products page
3. **Sort Products**: Choose from Popularity, Price (Low/High), or Rating
4. **View Details**: Click "Quick View" to see full product details and reviews
5. **Add to Cart**: Use quantity selector in modal and click "Add to Cart"
6. **Checkout**: Click cart icon, review items, then click "Proceed to Checkout"
7. **WhatsApp Order**: Fill in details and order details will be sent to WhatsApp

### For Admin
1. **Add/Edit Products**: Modify `data/products.json`
2. **Upload Images**: Add images to `images/` folder
3. **Update Contact**: Change WhatsApp number and email in footer and JS
4. **Customize Brand**: Update colors, text, and styling in `css/styles.css`

## 🎨 Customization

### Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
    --deep-saffron: #C64B08;
    --brass-gold: #D4AF37;
    --warm-beige: #F5E6D3;
    /* ... more colors ... */
}
```

### Typography
Fonts are loaded from Google Fonts in `index.html`:
- Headings: Playfair Display
- Body: Poppins

Change these in the `<link>` tag if needed.

### Content
- Hero text: Edit HTML in `index.html` hero section
- Category names: Update in categories grid
- Footer content: Modify footer section in HTML
- Product data: Edit `data/products.json`

## 📱 Responsive Breakpoints

- **Desktop**: Full layout
- **Tablet** (≤768px): Adjusted grid columns, stacked navigation
- **Mobile** (≤480px): Single column layouts, optimized touch targets

## 🔐 Security Notes

- Cart data stored locally in browser (localStorage)
- No sensitive data transmitted to third parties
- WhatsApp integration uses standard web.whatsapp.com
- Consider HTTPS when deploying to production

## 🚢 Deployment

### Deploy to Netlify (Recommended)
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: (Leave empty - static site)
4. Set publish directory: `website`
5. Deploy!

### Deploy to Vercel
1. Push code to GitHub
2. Import project to Vercel
3. Configure as static site
4. Deploy!

### Deploy to GitHub Pages
1. Push to `gh-pages` branch
2. Enable GitHub Pages in repository settings
3. Website available at `username.github.io/Vaidika`

### Deploy to AWS S3 + CloudFront
1. Create S3 bucket
2. Upload website files
3. Enable static website hosting
4. Set up CloudFront distribution
5. Configure custom domain

## 📊 Performance Optimization

- ✅ Minimal CSS (~12KB)
- ✅ Minimal JavaScript (~8KB)
- ✅ SVG placeholder images (fast loading)
- ✅ No external dependencies (pure JavaScript)
- ✅ Smooth scrolling and animations
- ✅ Lazy loading ready (implement in images)

## 🐛 Troubleshooting

### Products not loading?
- Check browser console for errors (F12)
- Ensure `data/products.json` path is correct
- Verify JSON syntax is valid

### Cart not persisting?
- Check browser's localStorage settings
- Disable private browsing mode
- Clear browser cache and try again

### WhatsApp not opening?
- Verify WhatsApp number format (no spaces or +)
- Check if WhatsApp Web is accessible in your region
- Try on desktop browser first

### Styling looks broken?
- Clear browser cache (Ctrl+Shift+Delete)
- Check if CSS file is loading (Network tab in DevTools)
- Verify file paths are correct

## 📞 Support & Contact

For customer support, update these in the website:
- **WhatsApp**: Replace phone number in footer and checkout
- **Email**: Update email address in footer
- **Social Media**: Add links in footer section

## 📄 License

This website design is created for Vaidika brand. All rights reserved.

## 🙏 Credits

- **Design**: Premium Indian heritage aesthetic with modern ecommerce UX
- **Technology**: Pure HTML, CSS, and JavaScript (no frameworks)
- **Inspiration**: Indian traditional craftsmanship and luxury heritage brands

---

**Made with ❤️ for Vaidika - Rooted in Tradition. Crafted with Soul.**
