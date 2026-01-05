# Quick Reference Guide

## Common Tasks

### Adding a New Menu Item (via UI)
1. Navigate to **Menu Management** page
2. Click **"+ Add Menu Item"** button
3. Fill in the form:
   - Item Name
   - Category (dropdown)
   - Description
   - Price (₱)
   - Image (select from dropdown)
   - Availability (checkbox)
4. Click **"Save Item"**
5. Success message appears, item added to grid

### Editing a Menu Item
1. Click **Edit** icon on menu card
2. Modal opens with prefilled data
3. Update desired fields
4. Click **"Save Item"**
5. Changes reflected immediately

### Deleting a Menu Item
1. Click **Delete** icon on menu card
2. Confirm deletion in dialog
3. Item removed from list

### Managing Orders (Staff)
**New Orders Tab:**
- Click **"Accept"** to move to In Progress
- Click **"Reject"** to decline order

**In Progress Tab:**
- Click **"Mark as Ready"** when food is prepared
- Progress bar updates to 100%
- Click **"Mark as Served"** when delivered to customer
- Order moves to Completed tab

**Completed Tab:**
- View order history
- See completion times and totals

### Adding Staff (Owner)
1. Navigate to **Staff Management**
2. Click **"+ Add Staff"** button
3. Fill in staff details:
   - Full Name
   - Email
   - Phone
   - Role (dropdown)
4. System generates invite code automatically
5. Click **"Add Staff"**
6. Invite code can be copied and shared

### Viewing Analytics (Owner)
1. Navigate to **Analytics & Reports**
2. Select period: **Today / This Week / This Month**
3. View:
   - Total Sales, Orders, Avg Order Value
   - Revenue Trend Chart
   - Top 5 Selling Items
   - Order Trends
   - Staff Performance
4. Click **"Export Report"** to save (simulated)

---

## UI Elements Quick Reference

### Buttons
```html
<!-- Primary Button -->
<button class="btn-primary">Save</button>

<!-- Secondary Button -->
<button class="btn-secondary">Cancel</button>

<!-- Icon Button -->
<button class="icon-btn">
  <span class="material-icons">edit</span>
</button>

<!-- Quick Action -->
<button class="quick-action">
  <span class="material-icons">add</span>
  <span>Add Item</span>
</button>
```

### Badges
```html
<!-- Status Badge -->
<span class="availability-badge available">Available</span>
<span class="availability-badge unavailable">Unavailable</span>

<!-- Priority Badge -->
<span class="priority-badge high">High</span>
<span class="priority-badge medium">Medium</span>
<span class="priority-badge low">Low</span>

<!-- Category Badge -->
<span class="category-badge">Appetizers</span>
```

### Toggle Switch
```html
<label class="toggle-switch">
  <input type="checkbox" checked>
  <span class="toggle-slider"></span>
</label>
```

### Stat Card
```html
<div class="stat-card">
  <div class="stat-icon">
    <span class="material-icons">restaurant_menu</span>
  </div>
  <div class="stat-details">
    <span class="stat-label">Menu Items</span>
    <span class="stat-value">12</span>
  </div>
</div>
```

---

## JavaScript Functions

### Loading States
```javascript
// Show loading
showLoading('Processing your request...');

// Hide loading
hideLoading();
```

### Messages
```javascript
// Success
showSuccessMessage('Item saved successfully!');

// Error
showErrorMessage('Failed to save item');
```

### Confirmation
```javascript
showConfirmDialog(
  'Are you sure you want to delete this item?',
  () => {
    // User clicked Confirm
    deleteItem();
  },
  () => {
    // User clicked Cancel
    console.log('Cancelled');
  }
);
```

### Empty States
```javascript
showEmptyState('menu-grid', {
  icon: 'restaurant_menu',
  title: 'No Menu Items',
  description: 'Add your first menu item to get started',
  actionText: 'Add Item',
  actionCallback: 'openAddModal()'
});
```

### Formatting
```javascript
// Currency
formatCurrency(1250.50);  // "₱1,250.50"

// Date
formatDate(new Date());    // "Jan 15, 2025"

// Time
formatTime(new Date());    // "2:30 PM"

// Relative time
timeAgo(new Date() - 7200000);  // "2 hours ago"
```

### Validation
```javascript
// Email
if (!isValidEmail(email)) {
  showErrorMessage('Invalid email address');
}

// Phone (Philippine format)
if (!isValidPhone(phone)) {
  showErrorMessage('Invalid phone number');
}
```

### Clipboard
```javascript
copyToClipboard('GT-2026-12345', 'Invite code copied!');
```

---

## Navigation

### Owner Pages
- `/Redo/index.html` → Login
- `/Redo/pages/owner-dashboard.html` → Dashboard
- `/Redo/pages/owner-menu.html` → Menu Management
- `/Redo/pages/owner-analytics.html` → Analytics
- `/Redo/pages/owner-staff.html` → Staff Management
- `/Redo/pages/owner-settings.html` → Settings

### Staff Pages
- `/Redo/index.html` → Login
- `/Redo/pages/staff-dashboard.html` → Dashboard
- `/Redo/pages/staff-menu.html` → Menu Items
- `/Redo/pages/staff-orders.html` → Orders
- `/Redo/pages/staff-settings.html` → Settings

---

## Customization

### Change Primary Color
In `css/style.css`:
```css
:root {
  --turf-green: #237E56;  /* Change this */
}
```

### Change Accent Color
```css
:root {
  --amber-flame: #FDBC22;  /* Change this */
}
```

### Add New Category Filter
In `owner-menu.html`:
```html
<button class="filter-btn" data-category="new-category">New Category</button>
```

In `js/menu-management.js`:
```javascript
function getCategoryLabel(category) {
  const labels = {
    'all': 'All Items',
    'appetizers': 'Appetizers',
    'main': 'Main Course',
    'desserts': 'Desserts',
    'beverages': 'Beverages',
    'new-category': 'New Category'  // Add this
  };
  return labels[category] || category;
}
```

---

## Responsive Breakpoints

**Primary Viewport:** 390px (iPhone 14/15)

All pages are optimized for this specific size:
```css
body {
  max-width: 390px;
  margin: 0 auto;
}
```

To support additional sizes, add media queries in `style.css`.

---

## Common Issues

### Images Not Loading
**Problem:** Images show broken link icon  
**Solution:** Check file paths in `assets/images/`
```html
<!-- Correct path from pages/ folder -->
<img src="../assets/images/chicken-inasal.jpg">
```

### Sidebar Not Closing
**Problem:** Sidebar stays open after clicking item  
**Solution:** Ensure `app.js` is loaded before page-specific scripts
```html
<script src="../js/utils.js"></script>
<script src="../js/app.js"></script>
<script src="../js/menu-management.js"></script>
```

### Modal Not Opening
**Problem:** Click on button does nothing  
**Solution:** Check that modal HTML exists and IDs match
```javascript
const modal = document.getElementById('menu-modal');  // Must exist
const addBtn = document.getElementById('add-menu-btn');  // Must exist
```

### Form Not Submitting
**Problem:** Submit button click does nothing  
**Solution:** Check for `e.preventDefault()` and form event listener
```javascript
menuForm.addEventListener('submit', function(e) {
  e.preventDefault();  // Prevents page reload
  // Handle form submission
});
```

---

## Data Structure Examples

### Menu Item
```javascript
{
  name: "Chicken Inasal",
  category: "main",
  description: "Grilled chicken marinated in vinegar, calamansi, and spices",
  price: "180",
  image: "chicken-inasal.jpg",
  available: true
}
```

### Order
```javascript
{
  id: "ORD-001",
  tableNumber: "12",
  priority: "high",
  items: [
    { name: "Chicken Inasal", qty: 2, price: 180 },
    { name: "Buko Juice", qty: 2, price: 45 }
  ],
  specialInstructions: "No garlic please",
  status: "new",  // new | preparing | ready | served
  timestamp: new Date(),
  total: 450
}
```

### Staff Member
```javascript
{
  id: "EMP-2025-001",
  name: "Maria Santos",
  email: "maria.santos@gotawee.ph",
  phone: "+63 917 123 4567",
  role: "Server",
  joinDate: "2025-01-15",
  status: "active",
  inviteCode: "GT-2026-XXXXX"
}
```

---

## Color Palette Reference

```css
--porcelain: #FDFDFA;      /* Off-white background */
--turf-green: #237E56;     /* Primary green */
--light-gold: #EAD290;     /* Light gold accent */
--amber-flame: #FDBC22;    /* Bright yellow/orange */
--evergreen: #183526;      /* Dark green text */

/* Additional colors */
--success: #28a745;        /* Green for success */
--danger: #dc3545;         /* Red for errors */
--warning: #ffc107;        /* Yellow for warnings */
--info: #17a2b8;           /* Blue for info */
```

---

## File Import Order

Always load scripts in this order:
1. `utils.js` (utility functions)
2. `app.js` (core sidebar)
3. Page-specific JS (menu-management.js, etc.)

```html
<script src="../js/utils.js"></script>
<script src="../js/app.js"></script>
<script src="../js/menu-management.js"></script>
```

---

## Keyboard Shortcuts

### General
- **Esc** - Close modal/sidebar
- **Enter** - Submit form (when focused)
- **Tab** - Navigate between form fields

### Search
- **/** - Focus search box (where applicable)
- **Backspace** - Clear search

---

## Debugging Tips

### Check Console
Open browser DevTools (F12) and check Console tab for errors.

### Verify Element IDs
```javascript
console.log(document.getElementById('menu-modal'));  // Should not be null
```

### Test Functions
```javascript
// In browser console
showSuccessMessage('Test message');
formatCurrency(1234.56);
```

### Inspect Network
Check Network tab in DevTools to verify images load correctly.

---

## Pro Tips

1. **Use the utils.js functions** - Don't reinvent the wheel
2. **Consistent naming** - Follow existing patterns (kebab-case for IDs/classes)
3. **Mobile-first** - Test on 390px viewport always
4. **Loading states** - Show feedback for all async operations
5. **Error handling** - Always show user-friendly messages
6. **Comments** - Document complex logic for future reference

---

**Need more help?** Check:
- [README.md](README.md) - Full project documentation
- [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - Testing guide
- [PROJECT_PLAN.md](PROJECT_PLAN.md) - Development roadmap
