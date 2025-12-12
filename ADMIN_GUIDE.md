# 🔐 Admin Dashboard Guide

## Accessing the Admin Dashboard

### Method 1: Direct URL (Recommended)

Navigate directly to the admin dashboard:

```
http://localhost:3001/admin
```

### Method 2: Hidden Link

Click on the "SA" logo in the header (top-left corner) to navigate to admin panel.

---

## 🔑 Login Credentials

**Admin Password:** `schol@r2025`

---

## 📊 Dashboard Features

### 1. **Overview Tab**

- View total suboptions count
- See locked/unlocked statistics
- Quick access to common actions
- Status of recent items

### 2. **Manage Suboptions Tab**

- Search and filter all suboptions
- Toggle lock/unlock for each suboption
- Visual status indicators (ON/OFF)
- Instant feedback on actions

### 3. **Settings Tab**

- View current unlock state (JSON format)
- Reset all suboptions to default
- Admin information and storage details

---

## 🔒 What Admins Can Control

### Lock/Unlock Individual Suboptions

Each suboption can be toggled individually:

- **Unlocked (ON)** - Visible to users in navigation
- **Locked (OFF)** - Hidden from users

### Categories Managed

- **About** (5 suboptions)
- **Academics** (5 suboptions)
- **Beyond Academics** (4 suboptions)
- **Admissions** (4 suboptions)
- **School Life** (4 suboptions)
- **Contact** (4 suboptions)

### Total: 26 Suboptions

---

## 💾 Data Storage

- **Authentication:** Browser sessionStorage (clears on browser close)
- **Suboption States:** Browser localStorage (persists across sessions)
- **All changes apply immediately** to the website

---

## 🛡️ Security Notes

1. **Admin Password** is stored in the code

   - For production, use environment variables
   - Example: `VITE_ADMIN_PASSWORD=your_secure_password`

2. **Session Management**

   - Logout button clears the session
   - Session stored locally, not on server
   - Best practice: Log out when done

3. **Best Practices**
   - Change password in production
   - Use strong, unique password
   - Store credentials securely
   - Audit admin actions periodically

---

## 📝 Usage Example

1. Open `http://localhost:3001/admin`
2. Enter password: `scholar2024`
3. Go to "Manage Suboptions" tab
4. Find a suboption you want to lock
5. Click "Lock" button
6. Confirm - it's now hidden from users
7. To unlock, click "Unlock" button
8. Changes appear immediately on the website

---

## 🔄 Reset All Settings

In the **Settings** tab, you can reset all suboptions to their default state:

- This action affects all 26 suboptions
- Confirmation dialog appears before resetting
- Cannot be undone immediately, but state is persistent

---

## 🐛 Troubleshooting

### Password not working

- Make sure "Caps Lock" is off
- Check password exactly: `scholar2024`
- Clear browser cache if issues persist

### Changes not showing

- Refresh the website page (not the admin panel)
- Clear localStorage if stuck: `localStorage.clear()`
- Logout and login again

### Lost admin access

- Session cleared? Navigate back to `/admin`
- Forgot password? Contact developer
- Check browser console for errors

---

## 📞 Developer Notes

- Admin password in production should use environment variables
- Current password: `scholar2024`
- Master admin key: `admin-master-key-2024`
- For frontend-only deployments, localStorage is sufficient
- For full control, integrate with backend database in future

---

**Last Updated:** December 9, 2025
**Version:** 1.0
