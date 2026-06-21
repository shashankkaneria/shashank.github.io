# Vaidika Website - Troubleshooting & Optimization

## 🐛 Troubleshooting Guide

### Products Not Loading

**Problem**: Products appear but don't load, or grid is empty

**Causes**:
- JSON file path incorrect
- Syntax error in JSON
- Browser CORS issue

**Solutions**:
1. Check browser console (F12 → Console)
2. Look for error messages
3. Verify `data/products.json` exists
4. Validate JSON syntax at jsonlint.com
5. Ensure file path in HTML matches actual location
6. If running locally, use a local server (not file://)

**Quick Fix**:
```bash
# Windows: Use Python for local server
python -m http.server 8000

# Then open: http://localhost:8000
```

---

### Products Load But Images Don't Show

**Problem**: Product cards show but images are broken/not displaying

**Causes**:
- Image file path incorrect
- File doesn't exist
- File format not supported
- File size too large

**Solutions**:
1. Check image file exists in `images/` folder
2. Verify path in `products.json` is correct
3. Use formats: JPG, PNG, WebP, SVG
4. Keep images under 200KB each
5. Check DevTools → Network tab for failed image loads

**Quick Fix**:
- Use absolute paths: `./images/product.jpg`
- Or use external image URLs for testing

---

### Cart Not Saving Between Sessions

**Problem**: Cart empties when browser is closed/refreshed

**Causes**:
- LocalStorage disabled
- Private/Incognito browsing mode
- Browser cache cleared
- LocalStorage permission denied

**Solutions**:
1. Exit private/incognito mode
2. Check if localStorage is enabled in browser settings
3. Clear browser cache and try again (Ctrl+Shift+Delete)
4. Try different browser
5. Check DevTools → Application → LocalStorage

**Test LocalStorage**:
```javascript
// Open browser console and run:
localStorage.setItem('test', 'value');
console.log(localStorage.getItem('test'));
// Should print: value
```

---

### Search/Filter Not Working

**Problem**: Filtering or searching produces no results or wrong results

**Causes**:
- Product data not loaded
- Filter logic error
- Category mismatch in JSON

**Solutions**:
1. Reload page
2. Check product data loaded (console: `console.log(productsData)`)
3. Verify category names in JSON match filter options
4. Try searching for exact product name
5. Check if JavaScript file loads (DevTools → Network)

**Debug in Console**:
```javascript
// Check products loaded
console.log(productsData);

// Check filtered results
console.log(filteredProducts);

// Check cart
console.log(cart);
```

---

### WhatsApp Not Opening on Checkout

**Problem**: Clicking "Proceed to Checkout" doesn't open WhatsApp

**Causes**:
- WhatsApp number format incorrect
- Country code missing
- Special characters in number
- WhatsApp Web not accessible in region
- Number blocked or invalid

**Solutions**:
1. Check WhatsApp number format: `911234567890` (no + or spaces)
2. Verify country code is included
3. Test number on WhatsApp directly
4. Check if WhatsApp Web is accessible in your region
5. Try on desktop browser first
6. Clear browser cookies and try again

**Update Number**:
Edit `js/config.js`:
```javascript
contact: {
    whatsapp: '911234567890',  // Your number here
},
```

---

### Styling Looks Broken/Different

**Problem**: CSS not applying, colors wrong, layout broken

**Causes**:
- CSS file not loading
- Browser cache outdated
- CSS syntax error
- Browser doesn't support CSS Grid/Flexbox

**Solutions**:
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Check DevTools → Network tab → styles.css loads
3. Check for red errors in DevTools → Console
4. Try in different browser
5. Update browser to latest version

**If CSS is loading but not applying**:
```css
/* Check if styles are overridden */
/* Use !important temporarily to debug */
body {
    background: red !important;
}
```

---

### Mobile Layout Issues

**Problem**: Website looks weird on mobile, text too small, buttons unclickable

**Causes**:
- Viewport meta tag missing
- CSS media queries not working
- Mobile-specific CSS error
- Browser zoom issues

**Solutions**:
1. Check `<meta name="viewport">` exists in HTML
2. Test on actual mobile device (not just DevTools emulation)
3. Hard refresh on mobile
4. Clear mobile browser cache
5. Try landscape and portrait mode
6. Test in different mobile browsers

**Check Responsive**:
1. Press F12 to open DevTools
2. Click device toggle button (top-left)
3. Select different devices from dropdown
4. Test all breakpoints: 320px, 768px, 1024px

---

### Performance Issues (Slow Loading)

**Problem**: Website takes too long to load, animations are choppy

**Causes**:
- Large image files
- Too many products
- JavaScript errors
- Slow internet connection
- Old browser

**Solutions**:
1. Optimize images (compress to <100KB each)
2. Limit products to 50 initially
3. Check console for JavaScript errors
4. Use browser's Lighthouse tool to analyze
5. Update browser to latest version
6. Test on different internet speed

**Optimize Images**:
- Use tools like: TinyPNG, ImageOptim, Squoosh
- Compress to under 100KB per image
- Use modern formats: WebP, AVIF

---

### Filter Buttons/Links Not Clickable

**Problem**: Buttons work in some places but not others, inconsistent behavior

**Causes**:
- JavaScript not loaded or errored
- Event listeners not attached
- Elements created dynamically before listeners attached
- Modal overlay blocking clicks

**Solutions**:
1. Check DevTools → Console for JavaScript errors
2. Verify `js/main.js` file loads (Network tab)
3. Test in browser console:
   ```javascript
   console.log(document.querySelector('.btn-primary'));
   ```
4. If modal overlay stuck, clear by running:
   ```javascript
   document.getElementById('overlay').classList.remove('active');
   ```

---

## ⚡ Performance Optimization

### Image Optimization

**Current Setup**: Uses SVG placeholders (good for demo)

**For Production**: Use real images
```bash
# Mac: ImageOptim (free app)
# Windows: FileOptimizer or XnConvert
# Online: tinypng.com or squoosh.app
```

**Recommended Sizes**:
- Product images: 300-500px width, max 100KB
- Hero image: 1200-1600px width, max 300KB
- Category icons: 200px, max 50KB

### Minification

**For Production**, minify files:
```bash
# Minify CSS
# Use: cssnano or online tool

# Minify JavaScript
# Use: terser or online tool

# Minify HTML
# Use: html-minifier
```

### Caching Strategies

**Browser Caching**:
Add to `.htaccess` (if on Apache):
```
<FilesMatch "\.(jpg|jpeg|png|gif|svg|webp|css|js|woff)$">
    Header set Cache-Control "max-age=31536000, public"
</FilesMatch>
```

**Cache Busting**:
```html
<link rel="stylesheet" href="css/styles.css?v=1.0">
<script src="js/main.js?v=1.0"></script>
```

### Lazy Loading (For Future)

```javascript
// Add data-src instead of src
// Implement with Intersection Observer
```

---

## 🔍 Quality Assurance Checklist

### Before Launch

- [ ] All products load correctly
- [ ] Images display properly
- [ ] Search works with all product names
- [ ] Filters work individually and combined
- [ ] Cart adds/removes items correctly
- [ ] Cart persists on page refresh
- [ ] WhatsApp checkout works
- [ ] Modal displays all reviews
- [ ] Quantity selector works
- [ ] Responsive design works on mobile
- [ ] All links work correctly
- [ ] No console errors (F12 → Console)
- [ ] Mobile testing completed
- [ ] Different browsers tested
- [ ] Load time acceptable (<3 seconds)

### Post-Launch Monitoring

- [ ] Monitor browser console errors
- [ ] Check if users complete checkouts
- [ ] Gather user feedback
- [ ] Monitor load times
- [ ] Check for security issues
- [ ] Verify WhatsApp delivery
- [ ] Track popular products
- [ ] Monitor cart abandonment

---

## 📱 Testing Checklist

### Desktop Testing
- [ ] Chrome/Edge latest
- [ ] Firefox latest
- [ ] Safari (Mac)
- [ ] 1920x1080 resolution
- [ ] 1366x768 resolution

### Mobile Testing
- [ ] iPhone (iOS 14+)
- [ ] Android phone (Chrome Mobile)
- [ ] Portrait orientation
- [ ] Landscape orientation
- [ ] Touch interactions
- [ ] Form inputs (keyboard)

### Tablet Testing
- [ ] iPad (portrait & landscape)
- [ ] Android tablet
- [ ] Medium screens (768px)

### Feature Testing
- [ ] Search functionality
- [ ] Filters & sorting
- [ ] Product modal
- [ ] Add to cart
- [ ] Update quantities
- [ ] Remove items
- [ ] Checkout process
- [ ] WhatsApp integration

---

## 🚀 Optimization Recommendations

### Immediate (Easy)
1. Compress product images
2. Add product meta descriptions
3. Set up Google Analytics
4. Enable gzip compression on server
5. Add favicon to website

### Short Term (Medium)
1. Add PWA capability
2. Implement lazy loading for images
3. Add SSL certificate (HTTPS)
4. Set up CDN for images
5. Add breadcrumb navigation

### Long Term (Advanced)
1. Add user authentication
2. Implement proper payment gateway
3. Set up inventory management
4. Add order tracking
5. Implement customer reviews system
6. Add recommendation engine
7. Multi-language support
8. Advanced analytics

---

## 📊 Monitoring Tools

### Free Tools
- **Google Lighthouse** (built into Chrome DevTools)
- **Google Analytics** (website traffic analysis)
- **Google PageSpeed Insights** (performance metrics)
- **Uptime Robot** (website availability monitoring)
- **GTmetrix** (performance detailed analysis)

### Setup Instructions
1. **Google Analytics**:
   - Go to analytics.google.com
   - Create account
   - Add tracking code to website

2. **Lighthouse**:
   - Open DevTools (F12)
   - Go to Lighthouse tab
   - Run analysis

---

## 💡 Pro Tips

1. **Always test after changes** - Even small edits can break things
2. **Keep backup** - Use Git or cloud storage
3. **Monitor errors** - Check console regularly
4. **User feedback** - Ask customers for feedback
5. **A/B test** - Try different product layouts
6. **SEO friendly** - Add meta descriptions
7. **Mobile first** - Design for mobile first
8. **Fast images** - Compress all images
9. **Clear messaging** - Make CTAs obvious
10. **Accessibility** - Ensure keyboard navigation works

---

## 🆘 Emergency Fix Commands

**Browser Console** (Press F12, go to Console tab):

```javascript
// Clear all data
localStorage.clear();

// View cart
console.log(cart);

// View products
console.log(productsData);

// Force close overlay
document.getElementById('overlay').classList.remove('active');

// Force close cart drawer
document.getElementById('cartDrawer').classList.remove('active');

// Force close modal
document.getElementById('productModal').classList.remove('active');

// Reset page overflow
document.body.style.overflow = 'auto';

// Clear cart
cart = [];
localStorage.clear();
```

---

**For additional help, check README.md and FEATURES.md** 📚
