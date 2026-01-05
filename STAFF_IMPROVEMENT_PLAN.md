# Staff Management Improvement Plan
**Go Tawee Merchant - Owner Portal**
*Created: January 6, 2026*

---

## 🎯 Overview
Simplify and enhance the staff management page with essential features for viewing staff roster, managing invite codes, and basic account control. Focus on clarity and ease of use for restaurant owners.

---

## 📋 Phase 1: Quick Stats & Status Indicators

### Quick Stats Cards (Top of Page)
Add three info cards showing at-a-glance metrics:
- **Total Active Staff**: Count of non-deactivated staff
- **Currently Online**: Staff logged into the app right now
- **Pending Invites**: Unused invite codes awaiting registration

**Visual Design:**
- Small compact cards in a row
- Icon + number + label
- Turf green accent color
- Subtle background

### Enhanced Status Badges
Upgrade current "Active" badge to show real status:
- 🟢 **Online** - Currently logged into app (green)
- 🔴 **Offline** - Not logged in (gray)
- 🚫 **Deactivated** - Account disabled (red)
- **Last Seen**: "2 hours ago" timestamp under offline staff

---

## 🔍 Phase 2: Search & Organization

### Search Bar
Add search functionality at top of staff list:
- Search by name (real-time filtering)
- Clear icon to reset search
- "No results found" message when empty
- Maintains during typing

### Section Organization
Reorganize page into clear sections:

1. **Active Staff Section**
   - Default view showing only active staff
   - Staff count in header: "Active Staff (5)"

2. **Pending Invitations Section**
   - Shows unused invite codes
   - Expiry date display
   - Copy code button
   - Delete unused code option
   - "No pending invitations" empty state

3. **Deactivated Staff Section**
   - Collapsed by default (expandable)
   - Shows former employees
   - Count badge: "Deactivated Staff (2)"
   - Reactivate button per staff

---

## 📋 Phase 3: Invite Code Enhancements

### Better Invite Code Management
Upgrade the invite code system:

**Generated Codes Include:**
- Expiry date selector (7/14/30 days from today)
- Single-use validation
- Usage tracking (who registered with which code)
- Status: "Unused" vs "Used by [Name]"

**Invite Code Card Updates:**
- Show days remaining until expiry
- Visual warning for expiring soon (< 2 days)
- "Used by Maria Santos on Jan 5" for redeemed codes
- Delete button for unused codes
- "Expired" badge for past-due codes

**New Code Generation Modal:**
- Select expiry duration (7/14/30 days)
- Preview code before saving
- Auto-copy to clipboard on creation
- Show success message with code

---

## 🔐 Phase 4: Account Management

### Staff Status Control
**Deactivate Flow:**
- Confirmation modal: "Deactivate [Name]?"
- Optional reason field
- Date deactivated tracked
- Move to "Deactivated" section

**Reactivate Flow:**
- Available in deactivated section
- Confirmation: "Reactivate [Name]?"
- Move back to active staff
- Activity log entry created

### Password Reset Requests
New system for password resets:

**Request Queue:**
- New section: "Pending Password Resets (2)"
- Shows staff name, request date, reason (optional)
- Approve/Deny buttons

**Actions:**
- ✅ **Approve**: Generates reset link, sends to staff email
- ❌ **Deny**: Removes request, staff notified
- Activity logged

---

## 👁️ Phase 5: Staff Details Modal

### View Details Popup
Click any staff card to open detailed view modal:

**Modal Content:**
- Large profile section (view-only)
- Full name, role, email, phone
- Join date
- Current status (online/offline + timestamp)
- Account created date

**Activity Tab:**
- Last 10 activities for this staff member
- Login/logout history
- Status changes
- Filtered timeline

**Actions in Modal:**
- Change Status button (Activate/Deactivate)
- Close button
- No edit capabilities for personal info

---

## 🎨 Phase 6: Visual & UX Improvements

### View Toggle
Add option to switch layouts:
- **Card View** (current): Best for 1-10 staff
- **List View** (new): Compact rows for larger teams
- Toggle button in header next to search

**List View Features:**
- Table-like rows
- Columns: Avatar | Name | Role | Status | Email | Phone | Actions
- Sortable columns (click header to sort)
- Hover effects

### Improved Staff Cards
Enhance current card design:
- Larger click area for entire card
- Click anywhere to open details modal
- Action buttons stay as quick access
- Better spacing and touch targets
- Status badge more prominent

### Enhanced Activity Timeline
Improve the "Recent Activity" section:
- More activity types:
  - 👤 Staff registered
  - 🔑 Password reset approved
  - 🚫 Account deactivated
  - ✅ Account reactivated
  - 🎫 Invite code used
- Filter dropdown: "All Activities" | "By Staff Member"
- Date grouping: "Today", "Yesterday", "This Week"
- Load more button (pagination)

---

## 📱 Phase 7: Responsive & Mobile

### Mobile Optimizations
- Stack stats cards vertically on mobile
- Simplified card layout on small screens
- Bottom sheet modal instead of center modal
- Touch-friendly button sizes
- Swipe actions (swipe to deactivate)

---

## 🎯 Implementation Priority

### Must Have (Core Features):
✅ Quick stats cards
✅ Status indicators (Online/Offline/Deactivated)
✅ Search bar
✅ Section organization (Active/Pending/Deactivated)
✅ Enhanced invite codes with expiry
✅ Staff details modal
✅ Deactivate/Reactivate functionality

### Should Have (Important):
- Password reset request system
- View toggle (Card/List)
- Enhanced activity log
- Code usage tracking

### Nice to Have (Polish):
- Activity filtering
- Expiring code warnings
- Mobile swipe actions
- Sort options

---

## 🎨 Design System

### Color Palette:
- **Turf Green** (#237E56): Primary actions, online status
- **Amber Flame** (#FDBC22): Warnings, expiring codes
- **Evergreen** (#183526): Text, headers
- **Porcelain** (#FDFDFA): Backgrounds
- **Red** (#DC3545): Deactivated, offline, delete
- **Gray** (#6C757D): Offline status, secondary text

### Status Colors:
- 🟢 Online: `#28A745`
- 🔴 Offline: `#6C757D`
- 🚫 Deactivated: `#DC3545`
- ⚠️ Warning: `#FDBC22`

### Icons (Material Icons):
- `groups` - Total staff
- `online_prediction` - Online status
- `mail_outline` - Pending invites
- `search` - Search
- `visibility` - View details
- `block` - Deactivate
- `check_circle` - Reactivate
- `vpn_key` - Password reset
- `content_copy` - Copy code
- `delete_outline` - Delete code

---

## 📝 Technical Implementation

### New Files:
- None (enhance existing files)

### Modified Files:
1. **pages/owner-staff.html**
   - Add stats cards section
   - Add search bar
   - Reorganize sections (Active/Pending/Deactivated)
   - Add staff details modal
   - Add password reset requests section
   - Add view toggle
   - Update invite code cards with expiry

2. **css/style.css**
   - Stats cards styles
   - Search bar styles
   - Section headers with counts
   - Deactivated section (collapsible)
   - Staff details modal styles
   - List view table styles
   - Enhanced status badges
   - Expiry warnings

3. **js/staff-management.js**
   - Search filtering logic
   - Section toggle (expand/collapse deactivated)
   - Staff details modal open/close
   - Deactivate/reactivate functions
   - Password reset approval flow
   - Invite code expiry validation
   - View toggle logic
   - Code copy to clipboard
   - Delete unused codes

### Data Structure (LocalStorage Simulation):
```javascript
staff: [
  {
    id: 1,
    name: "Maria Santos",
    role: "Server",
    email: "maria.santos@gotawee.ph",
    phone: "+63 917 123 4567",
    status: "online", // "online", "offline", "deactivated"
    lastSeen: "2026-01-06T14:30:00",
    joinDate: "2025-01-15",
    inviteCodeUsed: "GT-2026-A1B2C3",
    deactivatedDate: null,
    deactivatedReason: null
  }
]

inviteCodes: [
  {
    code: "GT-2026-A1B2C3",
    generatedDate: "2026-01-05",
    expiryDate: "2026-01-12",
    usedBy: null, // staff id or null
    usedDate: null,
    status: "unused" // "unused", "used", "expired"
  }
]

passwordResetRequests: [
  {
    id: 1,
    staffId: 3,
    requestedDate: "2026-01-06T10:00:00",
    reason: "Forgot password",
    status: "pending" // "pending", "approved", "denied"
  }
]
```

---

## ✅ Success Metrics
- Clear at-a-glance staff overview
- Easy invite code management
- Simple account activation control
- Clean, organized interface
- Mobile-friendly design
- No confusion about staff status

---

**Ready to implement!** 🚀
