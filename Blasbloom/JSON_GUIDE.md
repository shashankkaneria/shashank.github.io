# 📦 Products JSON Guide

This guide explains how to use and customize the `products.json` file to manage your Blasbloom products.

## 📋 Quick Start

The website now loads all products from `products.json`. Simply edit this file to:
- Add new products
- Remove products
- Update prices
- Change product images
- Add new categories
- Modify product descriptions

**Changes are instant** - just refresh the website to see updates!

## 📄 JSON File Structure

### Complete Example

```json
{
  "products": [
    {
      "id": 1,
      "category": "Sharbat",
      "name": "Rose Sharbat",
      "description": "Traditional rose-flavored concentrate. Perfect for refreshing drinks on warm days.",
      "sizes": [
        {
          "size": "500ml",
          "price": 299
        },
        {
          "size": "1 Litre",
          "price": 499
        }
      ],
      "images": [
        "https://images.unsplash.com/photo-1609070399218-f7d3e9fcd65e?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1555939594-58d7cb561621?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1553530889-e6cf89d19ccf?w=400&h=400&fit=crop"
      ]
    }
  ]
}
```

## 🔑 Field Descriptions

### `id` (Required)
- **Type**: Integer (number)
- **Example**: `1`, `2`, `3`
- **Purpose**: Unique identifier for each product
- **Must be**: Unique across all products (no duplicates)

### `category` (Required)
- **Type**: String (text)
- **Example**: `"Sharbat"`, `"Tea"`, `"Extracts"`
- **Purpose**: Groups products together on the website
- **Auto-displays**: As category headers (automatically detected from products)

### `name` (Required)
- **Type**: String (text)
- **Example**: `"Rose Sharbat"`, `"Green Tea"`
- **Purpose**: Product display name
- **Displays**: As main product heading

### `description` (Required)
- **Type**: String (text)
- **Example**: `"Traditional rose-flavored concentrate..."`
- **Purpose**: Product details and benefits
- **Displays**: Under product name

### `sizes` (Required)
- **Type**: Array of objects
- **Contains**: Size/price combinations
- **Example**:
  ```json
  "sizes": [
    { "size": "500ml", "price": 299 },
    { "size": "1 Litre", "price": 499 }
  ]
  ```
- **Purpose**: Different size options for same product
- **Displays**: In cart and size selector modal

### `sizes[].size` (Required)
- **Type**: String (text)
- **Example**: `"500ml"`, `"1 Litre"`, `"250ml"`, `"2 Litre"`
- **Purpose**: Display size label
- **Format**: Any text (e.g., "Small", "Medium", "Large")

### `sizes[].price` (Required)
- **Type**: Integer or decimal number
- **Example**: `299`, `499`, `99.99`
- **Purpose**: Price in Indian Rupees (₹)
- **No currency symbol**: Just the number

### `images` (Required)
- **Type**: Array of URLs (strings)
- **Count**: Exactly 3 URLs per product
- **Example**:
  ```json
  "images": [
    "url1",
    "url2",
    "url3"
  ]
  ```
- **Purpose**: Product photos
- **Displays**: In image gallery with auto-rotate on hover

## 🖼️ Image Sources

You can use images from:

### 1. **Unsplash (Free Stock Photos)**
```
Format: https://images.unsplash.com/photo-[ID]?w=400&h=400&fit=crop
Example: https://images.unsplash.com/photo-1609070399218-f7d3e9fcd65e?w=400&h=400&fit=crop
```
- Visit: unsplash.com
- Search for products
- Right-click → Copy image address
- Add `?w=400&h=400&fit=crop` for resizing

### 2. **Your Own Photos (Hosted)**
```
Format: https://yourdomain.com/images/product1.jpg
Or: https://imgur.com/[ID].jpg (free image hosting)
```

### 3. **Locally Hosted Images**
```
Format: images/product-name.jpg
Example: "images/rose-sharbat-1.jpg"
Note: Must be in same folder structure
```

## ✏️ How to Customize

### Add a New Product

```json
{
  "id": 7,
  "category": "Lemon Ginger Sharbat",
  "name": "Lemon Ginger Sharbat",
  "description": "Zesty lemon combined with warming ginger. A refreshing twist with health benefits.",
  "sizes": [
    { "size": "500ml", "price": 349 },
    { "size": "1 Litre", "price": 549 }
  ],
  "images": [
    "https://images.unsplash.com/photo-1587330391892-10ea8f4ed869?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1513161455079-7ef1a826e90c?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1585518419759-cdf9844b57da?w=400&h=400&fit=crop"
  ]
}
```

### Change a Price

Before:
```json
"sizes": [
  { "size": "500ml", "price": 299 },
  { "size": "1 Litre", "price": 499 }
]
```

After (increased price):
```json
"sizes": [
  { "size": "500ml", "price": 349 },
  { "size": "1 Litre", "price": 549 }
]
```

### Add a New Size Option

Before:
```json
"sizes": [
  { "size": "500ml", "price": 299 },
  { "size": "1 Litre", "price": 499 }
]
```

After (added 250ml):
```json
"sizes": [
  { "size": "250ml", "price": 199 },
  { "size": "500ml", "price": 299 },
  { "size": "1 Litre", "price": 499 }
]
```

### Remove a Product

Simply delete the entire product object. For example:

Before (3 products):
```json
"products": [
  { ... product 1 ... },
  { ... product 2 ... },
  { ... product 3 ... }
]
```

After (product 2 removed):
```json
"products": [
  { ... product 1 ... },
  { ... product 3 ... }
]
```

### Create a New Category

Just add a product with new category name:

```json
{
  "id": 8,
  "category": "Herbs",
  "name": "Mint Extract",
  "description": "...",
  "sizes": [...],
  "images": [...]
}
```

The website automatically:
- Detects new category
- Creates section header
- Groups all products by category

## 📝 Current Products (Sample Data)

The file currently contains:

### Sharbat (2 products)
- Rose Sharbat - 500ml ₹299, 1L ₹499
- Jamun Sharbat - 500ml ₹299, 1L ₹499

### Extracts (2 products)
- Tulsi Extract - 500ml ₹299, 1L ₹499
- Amla Extract - 500ml ₹299, 1L ₹499

### Tea (2 products)
- Assam Tea - 500ml ₹299, 1L ₹499
- Green Tea - 500ml ₹299, 1L ₹499

### Lemon Ginger Sharbat (1 product)
- Lemon Ginger Sharbat - 500ml ₹349, 1L ₹549

**Total: 7 products across 4 categories**

## 🛒 How It Works on Website

### User Experience Flow:

1. **Browse Products**
   - Products automatically load from JSON
   - Organized by category
   - Each shows 3 images with dots to switch

2. **Hover Over Product**
   - Images auto-rotate every 2 seconds
   - Professional transitions

3. **Click "Add to Cart"**
   - Size selector modal appears
   - Shows all size options with prices
   - User selects preferred size

4. **Cart Updates**
   - Shows product name, size, quantity, price
   - Real-time total calculation
   - Tax automatically included (5%)

5. **Checkout**
   - WhatsApp message includes all sizes
   - Format: `Product Name (Size) × Qty`

## ✅ Validation & Tips

### JSON Format Rules

1. **Must be valid JSON**
   - No trailing commas
   - Proper quotes (not fancy quotes)
   - All brackets/braces matched

2. **Field Requirements**
   - All fields are required (no optional fields)
   - ID must be unique
   - Images array must have exactly 3 URLs
   - Price must be a number (no ₹ symbol)

3. **ID Uniqueness**
   - IDs 1-7 already used
   - Start new IDs from 8 onwards
   - Or use: 101, 102, etc.

### Common Mistakes to Avoid

❌ **Wrong - Trailing comma**:
```json
"sizes": [
  { "size": "500ml", "price": 299 },
  { "size": "1 Litre", "price": 499 },  ← Extra comma here!
]
```

✅ **Correct**:
```json
"sizes": [
  { "size": "500ml", "price": 299 },
  { "size": "1 Litre", "price": 499 }
]
```

❌ **Wrong - Fancy quotes**:
```json
"name": "Rose Sharbat"  ← Wrong quote type
```

✅ **Correct**:
```json
"name": "Rose Sharbat"  ← Regular quotes
```

❌ **Wrong - Price with ₹**:
```json
"price": "₹299"
```

✅ **Correct**:
```json
"price": 299
```

## 🧪 Testing Your Changes

1. **Edit products.json** with your changes
2. **Save the file**
3. **Refresh website** in browser (F5)
4. Check if:
   - ✅ Products display correctly
   - ✅ Prices show accurately
   - ✅ Images load
   - ✅ Sizes appear in modal
   - ✅ Cart shows sizes

## 📱 Responsive Display

### Desktop View
- Products in grid layout
- 3 images visible as gallery
- Size badges display all options
- Full details visible

### Mobile View
- Stack single column
- Touch-friendly image dots
- Size options in modal
- Optimized for small screens

## 🔄 Real-Time Updates

**Any change to products.json automatically:**
- Updates website products
- Reorganizes categories
- Recalculates all displays
- **No code changes needed!**

## 💡 Pro Tips

### 1. **Bulk Updates**
Edit the JSON to change multiple products at once
```json
// Change all prices in one edit
"price": 299 → "price": 399
```

### 2. **Seasonal Products**
Add/remove products by season:
```json
// Summer edition
"category": "Summer Specials"

// Winter edition
"category": "Winter Warmers"
```

### 3. **Price Testing**
Easily test different prices without changing code:
```json
// Current: 299
// Try: 349
// Final: 399
```

### 4. **Image Optimization**
Use consistent image URLs:
```json
// Same format for all products
"https://images.unsplash.com/photo-[ID]?w=400&h=400&fit=crop"
```

## 🚀 Advanced Customization

### Change Product Display Order

The order in JSON file = order on website

```json
// First product shown
{ "id": 1, "category": "Sharbat", ... }
// Second product shown
{ "id": 2, "category": "Sharbat", ... }
```

### Multiple Sizes Strategy

**Pricing Strategy 1** - Standard:
```json
{ "size": "500ml", "price": 299 },
{ "size": "1 Litre", "price": 499 }
```

**Pricing Strategy 2** - With discount for bulk:
```json
{ "size": "250ml", "price": 199 },
{ "size": "500ml", "price": 299 },
{ "size": "1 Litre", "price": 499 },
{ "size": "2 Litre", "price": 899 }
```

## 📞 Support

### File Not Loading?
- Check JSON syntax (use jsonlint.com)
- Ensure file is named `products.json`
- Check file is in same folder as HTML

### Changes Not Showing?
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache
- Check console for errors (F12)

### Need Help?
- Validate JSON: jsonlint.com
- Check file path: Should be `d:\Shashank\Development\Blasbloom\products.json`
- Browser console (F12) shows any errors

---

**Remember:** Edit JSON file → Save → Refresh website → See changes!

**Example Edit Workflow:**
1. Open `products.json` in text editor
2. Find product to edit
3. Change price/name/description
4. Save file
5. Refresh website
6. Done! ✅

---

**Blasbloom Premium Beverages © 2026**  
**Dynamic Products Management Guide**
