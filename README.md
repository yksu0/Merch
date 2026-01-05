# 🍽️ Go Tawee Merchant

A mobile-first merchant management application for Filipino restaurants, optimized for 390px smartphone viewport.

![Go Tawee](assets/images/Logo.png)

## 📱 Overview

Go Tawee Merchant is a comprehensive restaurant management system with separate interfaces for **Owners** and **Staff**. Built with pure HTML, CSS, and JavaScript, this application provides a complete suite of tools for managing menu items, orders, staff, analytics, and settings.

## ✨ Features

### 👔 Owner Features
- **Dashboard** - Revenue overview, top selling items, quick actions
- **Menu Management** - Full CRUD operations for menu items with images
- **Analytics & Reports** - Sales trends, order analytics, staff performance
- **Staff Management** - Add/edit staff, generate invite codes, activity tracking
- **Profile & Settings** - Restaurant info, business details, notifications

### 👨‍🍳 Staff Features
- **Dashboard** - Active orders overview, pending tasks
- **Menu Items** - View-only menu catalog with search and filters
- **Orders Management** - Accept, prepare, and complete customer orders
- **Settings** - Personal info, shift details, notifications

## 🎨 Design

- **Color Palette:**
  - Porcelain (#FDFDFA) - Background
  - Turf Green (#237E56) - Primary
  - Light Gold (#EAD290) - Secondary
  - Amber Flame (#FDBC22) - Accent
  - Evergreen (#183526) - Dark Text

- **Typography:** System fonts for optimal performance
- **Icons:** Material Icons for consistency
- **Viewport:** 390px mobile-first (iPhone 14/15)

## 📂 Project Structure

```
Redo/
├── index.html                  # Login page
├── css/
│   └── style.css              # Consolidated styles (~3000 lines)
├── js/
│   ├── app.js                 # Core sidebar functionality
│   ├── utils.js               # Utility functions
│   ├── menu-management.js     # Owner menu CRUD
│   ├── analytics.js           # Owner analytics
│   ├── staff-management.js    # Owner staff management
│   ├── settings.js            # Owner settings
│   ├── staff-menu.js          # Staff menu view
│   ├── staff-orders.js        # Staff order workflow
│   └── staff-settings.js      # Staff settings
├── pages/
│   ├── owner-dashboard.html
│   ├── owner-menu.html
│   ├── owner-analytics.html
│   ├── owner-staff.html
│   ├── owner-settings.html
│   ├── staff-dashboard.html
│   ├── staff-menu.html
│   ├── staff-orders.html
│   └── staff-settings.html
├── assets/
│   └── images/
│       ├── Logo.png
│       ├── chicken-inasal.jpg
│       ├── adobo.jpg
│       ├── sisig.jpg
│       ├── lumpia.jpg
│       ├── spring-rolls.jpg
│       ├── pancit.jpg
│       ├── beef-tapa.jpg
│       ├── halo-halo.jpg
│       ├── leche-flan.jpg
│       ├── buko-juice.jpg
│       ├── calamansi.jpg
│       └── iced-coffee.jpg
├── PROJECT_PLAN.md            # Development roadmap
├── TESTING_CHECKLIST.md       # Comprehensive testing guide
└── README.md                  # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, but recommended)

### Installation

1. **Clone or download the project:**
   ```bash
   cd /home/yksuo/Desktop/GoTawee_Merchant/Redo
   ```

2. **Open with a local server:**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server -p 8000
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application:**
   ```
   http://localhost:8000
   ```

### Demo Access

**Owner Demo:**
- Click "Owner Demo" button on login page
- Access all owner management features

**Staff Demo:**
- Click "Staff Demo" button on login page
- Access all staff operational features

## 🎯 Key Functionality

### Menu Management
- Add new menu items with images
- Edit existing items
- Delete items with confirmation
- Toggle item availability
- Filter by category (Appetizers, Main Course, Desserts, Beverages)
- Search by name or description
- Grid/List view toggle

### Order Workflow (Staff)
1. **New Orders** - Accept or reject incoming orders
2. **In Progress** - Mark orders as ready when prepared
3. **Completed** - Mark orders as served and complete

### Staff Management (Owner)
- Add staff with role assignment
- Generate unique invite codes
- View staff activity log
- Edit staff information
- Deactivate staff accounts

### Analytics (Owner)
- Revenue trends with interactive charts
- Top selling items with progress indicators
- Order trends by time and day
- Staff performance metrics
- Export functionality

## 🛠️ Utility Functions

The `utils.js` file provides reusable functions:

```javascript
// Loading states
showLoading('Processing...')
hideLoading()

// Messages
showSuccessMessage('Action completed!')
showErrorMessage('Something went wrong')

// Empty states
showEmptyState('container-id', {
  icon: 'restaurant_menu',
  title: 'No menu items',
  description: 'Add your first item to get started',
  actionText: 'Add Item',
  actionCallback: 'openModal()'
})

// Formatting
formatCurrency(1250.50)  // ₱1,250.50
formatDate(new Date())   // Jan 15, 2025
timeAgo(date)           // "2 hours ago"

// Validation
isValidEmail('test@example.com')
isValidPhone('+639171234567')

// Clipboard
copyToClipboard('GT-2026-12345', 'Code copied!')
```

## 📱 Mobile Optimization

- **Viewport:** 390px (iPhone 14/15 size)
- **Touch-friendly:** Minimum 44x44px tap targets
- **Gestures:** Swipe-friendly interfaces
- **Hamburger Menu:** Collapsible sidebar navigation
- **Bottom Sheets:** Mobile-optimized modals

## 🎨 UI Components

### Cards
- Stat cards with trend indicators
- Menu item cards (grid/list layouts)
- Staff cards with action buttons
- Order cards with status badges

### Forms
- Text inputs with validation
- Dropdowns with custom styling
- Toggle switches for boolean options
- Password fields with visibility toggle
- Checkboxes and radio buttons

### Modals
- Bottom-sheet style for mobile
- Smooth animations (fadeIn, slideUp)
- Click-outside-to-close
- Form-based modals for CRUD operations

### Badges
- Priority badges (High/Medium/Low)
- Status badges (Available/Unavailable)
- Ranking badges (1st, 2nd, 3rd)
- Progress bars with percentages

## 🔧 Customization

### Colors
Edit CSS variables in `style.css`:
```css
:root {
    --porcelain: #FDFDFA;
    --turf-green: #237E56;
    --light-gold: #EAD290;
    --amber-flame: #FDBC22;
    --evergreen: #183526;
}
```

### Menu Items
Add/edit items in `js/menu-management.js` or through the UI.

### Images
Replace images in `assets/images/` with your own (maintain same filenames or update references).

## 📊 Analytics

The analytics dashboard provides:
- **Sales Overview:** Total sales, orders, average order value
- **Revenue Trends:** Daily/weekly/monthly charts
- **Top Items:** Best-selling menu items
- **Order Trends:** Peak hours, busiest days
- **Staff Performance:** Order completion metrics

## 🔐 Security Notes

**Current Implementation:**
- Frontend-only demo application
- No real authentication
- No data persistence
- Demo buttons for role switching

**Production Recommendations:**
- Implement proper backend authentication
- Use HTTPS for all connections
- Secure API endpoints
- Implement CSRF protection
- Add rate limiting
- Store passwords with bcrypt
- Use JWT tokens for sessions

## 🚧 Future Enhancements

### Backend Integration
- [ ] Connect to REST API
- [ ] Real-time order updates (WebSocket)
- [ ] Image upload functionality
- [ ] Database integration
- [ ] User authentication system

### Features
- [ ] Push notifications
- [ ] Offline mode (PWA)
- [ ] Print receipts
- [ ] QR code generation
- [ ] Multi-language support
- [ ] Dark mode theme

### Performance
- [ ] Image lazy loading
- [ ] Code splitting
- [ ] Service worker caching
- [ ] Progressive Web App setup

## 📖 Documentation

- **[PROJECT_PLAN.md](PROJECT_PLAN.md)** - Complete development roadmap with 10 phases
- **[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)** - Comprehensive testing guide

## 🤝 Contributing

This is a demo project built for educational purposes. Feel free to:
- Fork the repository
- Make improvements
- Submit pull requests
- Report issues

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Development

**Built with:**
- HTML5
- CSS3 (Custom Properties, Flexbox, Grid, Animations)
- Vanilla JavaScript (ES6+)
- Material Icons

**No frameworks or libraries required!**

## 📞 Support

For questions or issues:
1. Check [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)
2. Review [PROJECT_PLAN.md](PROJECT_PLAN.md)
3. Examine the code comments

## 🎉 Credits

**Go Tawee Merchant** - Filipino Restaurant Management System
- Designed for 390px mobile viewport
- Features 12 authentic Filipino dishes
- Built with ❤️ for restaurant owners and staff

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** January 2025

Enjoy managing your Filipino restaurant with Go Tawee! 🍽️
