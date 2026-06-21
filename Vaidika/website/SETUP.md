# Vaidika Website - Quick Setup Guide

## 🚀 Quick Start (2 Minutes)

### Step 1: Open in Browser
1. Navigate to the `website` folder
2. Double-click `index.html` to open

### Step 2: See It Working
- Browse products
- Add items to cart
- Click cart to view items
- Try search and filters

## ⚙️ Configuration

### Update WhatsApp Number
Edit `js/main.js` line 277:
```javascript
const whatsappNumber = '911234567890'; // Your number here
```

### Update Contact Information
Edit `index.html` - Footer section:
- Replace phone number
- Update email address
- Add social media links

### Add Your Products
Edit `data/products.json`:
1. Add new product objects to the array
2. Fill in all required fields
3. Save the file
4. Refresh browser to see changes

### Add Product Images
1. Create `images` folder
2. Add your product images (JPG/PNG)
3. Update `image` field in JSON: `"./images/image-name.jpg"`

## 🎨 Customization Tips

### Change Brand Name
Search and replace "Vaidika" throughout files

### Change Colors
Edit `css/styles.css` CSS variables at top:
```css
--deep-saffron: #C64B08;
--brass-gold: #D4AF37;
```

### Change Category Names
Edit HTML categories section or categories array in JSON

### Add New Sections
Copy existing sections in HTML and modify content

## 📱 Test Responsive Design
1. Open in browser
2. Press F12 (Developer Tools)
3. Click device toggle (phone icon)
4. Test on different screen sizes

## 🧪 Test Features

### Test Search
- Type product name in search bar
- Try partial searches

### Test Filters
- Select different categories
- Change sort options
- Combine search + filter

### Test Cart
- Add multiple items
- Update quantities
- Remove items
- Check totals

### Test Modal
- Click "Quick View" on any product
- Check reviews rendering
- Test quantity selector
- Try adding from modal

### Test Checkout
- Add items to cart
- Click "Proceed to Checkout"
- Fill in details
- Should open WhatsApp with pre-filled message

## 🔍 Browser Console Debugging
Press F12 to open Developer Tools:
- **Console**: See any JavaScript errors
- **Network**: Check if JSON file is loading
- **Application**: View localStorage cart data
- **Elements**: Inspect HTML structure

## 📤 Deploy (Free Options)

### Option 1: Netlify (Easiest)
1. Drag & drop `website` folder to netlify.com
2. Get live URL instantly
3. Custom domain available

### Option 2: GitHub Pages
1. Create GitHub repo
2. Push files to `gh-pages` branch
3. Enable in repo settings
4. Live at username.github.io/Vaidika

### Option 3: Vercel
1. Sign up at vercel.com
2. Connect GitHub repo
3. Auto-deploys on push
4. Free SSL certificate included

## ✅ Checklist Before Launch

- [ ] Update WhatsApp number
- [ ] Add real product images
- [ ] Update contact information
- [ ] Customize colors/branding
- [ ] Test all features
- [ ] Test on mobile
- [ ] Deploy to live server
- [ ] Share with customers

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Products not showing | Check JSON path, reload page |
| Images not loading | Use correct image paths, check file exists |
| Cart not saving | Enable localStorage in browser |
| WhatsApp not opening | Check number format, verify accessibility |
| Mobile view broken | Clear cache (Ctrl+Shift+Delete) |
| Animations choppy | Check browser support, try newer browser |

## 📞 Quick Links

- **Google Fonts**: https://fonts.google.com (customize fonts)
- **Color Tools**: https://coolors.co (find brand colors)
- **Image Hosting**: https://imgbb.com (free image hosting)
- **Netlify**: https://netlify.com (deploy for free)
- **GitHub**: https://github.com (version control)

## 💡 Pro Tips

1. **Performance**: Keep images under 100KB each
2. **SEO**: Add meta tags and descriptions
3. **Analytics**: Add Google Analytics tracking
4. **Backup**: Keep version control with Git
5. **Mobile First**: Always test on mobile
6. **Cache Busting**: Add `?v=1.0` to URLs if not updating
7. **Accessibility**: Test with keyboard navigation

## 🎯 Next Steps

1. ✅ Verify everything works locally
2. ✅ Add all products and images
3. ✅ Set up WhatsApp business account
4. ✅ Deploy to live server
5. ✅ Test on real devices
6. ✅ Share with customers
7. ✅ Monitor and iterate

---

**Questions?** Check README.md for detailed documentation.
