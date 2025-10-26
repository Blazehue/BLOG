# Quick Start Guide - Editorial Blog Platform

## 🚀 Getting Started

### Installation
The project is already installed. If you need to reinstall:
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Visit: http://localhost:8080/

### Build for Production
```bash
npm run build
```

---

## 👤 User Guide

### 1. Creating an Account

1. Click **"Sign Up"** in the header
2. Fill in the registration form:
   - **Full Name:** Enter your name (min 2 characters)
   - **Username:** Choose a unique username (letters, numbers, underscore only)
   - **Email:** Enter a valid email address
   - **Password:** Create a strong password
     - Min 8 characters
     - At least one uppercase letter
     - At least one number
     - At least one special character
   - **Confirm Password:** Re-enter your password
3. Check the **Terms & Conditions** checkbox
4. Click **"Create Account"**
5. You'll be automatically logged in and redirected to your dashboard

### 2. Logging In

1. Click **"Sign In"** in the header
2. Enter your email and password
3. (Optional) Check **"Remember me"** to stay logged in
4. Click **"Sign In"**

### 3. Dashboard Overview

Your dashboard shows:
- **Total Blogs:** Number of all your blog posts
- **Total Views:** Combined views across all published posts
- **Published:** Number of published posts
- **Drafts:** Number of draft posts

Below the stats, you'll see your recent blogs with quick actions.

### 4. Creating a Blog Post

#### Method 1: From Dashboard
1. Click the **"Create New Blog"** button (orange button)

#### Method 2: From Header
1. Navigate to **"My Blogs"** in the header
2. Click **"New Blog"**

#### Filling Out the Editor

1. **Cover Image** (Optional):
   - Click the upload area or drag & drop an image
   - Recommended size: 1200x630px
   - To remove: Click the X button

2. **Title** (Required):
   - Enter a compelling title
   - Max 100 characters
   - Shows character count below

3. **Excerpt** (Optional but recommended):
   - Short description of your blog
   - Max 160 characters
   - This appears in blog cards

4. **Content** (Required):
   - Write your blog content here
   - Shows word count and estimated read time
   - Min 50 words recommended

5. **Settings:**
   - **Category:** Choose from dropdown (Technology, Lifestyle, Travel, etc.)
   - **Tags:** Enter tags separated by commas (e.g., "web design, tips, tutorial")

6. **Saving:**
   - **Auto-save:** Automatically saves every 30 seconds
   - **Save Draft:** Manually save without publishing
   - **Publish:** Make your blog live immediately

### 5. Managing Your Blogs

Navigate to **"My Blogs"** from the header:

#### Filtering
Use the tabs at the top:
- **All:** Shows all your blogs
- **Published:** Only live blogs
- **Drafts:** Unpublished blogs
- **Scheduled:** Future-dated blogs

#### Searching
- Use the search bar to find blogs by title or content
- Results update in real-time

#### Sorting
Click the "Sort" dropdown to organize by:
- **Recent:** Newest first (default)
- **Oldest:** Oldest first
- **Most Viewed:** Highest views first
- **A-Z:** Alphabetical by title

#### Actions Menu
Click the three dots (⋮) on any blog to:
- **Edit:** Modify the blog post
- **View:** See the published version (only for published blogs)
- **Duplicate:** Create a copy
- **Delete:** Remove the blog (requires confirmation)

### 6. Editing Your Profile

1. Click your avatar in the header
2. Select **"Settings"**
3. Navigate through the tabs:

#### Profile Tab
- Upload a profile picture
- Update your full name
- Add a bio (max 200 characters)
- Add your website URL
- Add social media links:
  - Twitter: @username
  - LinkedIn: linkedin.com/in/username
  - GitHub: github.com/username
- Click **"Save Changes"**

#### Account Tab
- View your email (cannot be changed)
- Change your password:
  - Enter current password
  - Enter new password
  - Confirm new password
  - Click **"Update Password"**
- Delete account (in Danger Zone)

#### Preferences Tab
- View theme information
- Future: Notification settings

### 7. Viewing Blogs

#### Your Blogs
- From Dashboard or My Blogs, click **"View"** on published blogs
- Shows the public view of your blog

#### Public Blogs
- Visit the homepage (/)
- Browse all published blogs
- Click any blog card to read

### 8. Logging Out

Two methods:
1. Click your avatar → **"Logout"**
2. The logout button is at the bottom of the dropdown menu

---

## 🎨 Theme Switching

Click the sun/moon icon in the header to toggle between light and dark mode.

---

## 💡 Tips & Best Practices

### Writing Great Blogs

1. **Use a compelling title** (50-60 characters ideal)
2. **Add a cover image** for visual appeal
3. **Write a clear excerpt** that entices readers
4. **Choose the right category** for better organization
5. **Add relevant tags** for discoverability
6. **Aim for 500+ words** for substantial content
7. **Save as draft first** to review before publishing

### Password Security

- Use a unique password for this platform
- Mix uppercase, lowercase, numbers, and symbols
- Avoid common words or patterns
- The password strength meter helps you create secure passwords

### Profile Optimization

- Add a professional profile picture
- Write a concise, engaging bio
- Include your website and social links
- Keep your information up to date

---

## 🐛 Troubleshooting

### Can't Login?
- Check your email and password are correct
- Ensure caps lock is off
- Try clearing browser cache

### Blog Not Saving?
- Check your internet connection
- Ensure title and content are filled
- Look for the "Saved at [time]" indicator
- Try manual save with "Save Draft" button

### Image Upload Issues?
- File must be JPG, PNG, or WebP
- Check file size (keep under 5MB)
- Ensure you have a stable connection

### Theme Not Changing?
- Click the sun/moon icon in header
- Refresh the page if needed
- Check browser supports CSS variables

---

## 📊 Understanding Stats

### Dashboard Metrics

**Total Blogs**
- Count of all your blog posts (published + drafts)

**Total Views**
- Combined view count across all published blogs
- Updates when someone views your blog

**Published**
- Number of blogs visible to the public
- These appear on the homepage

**Drafts**
- Number of unpublished blogs
- Only visible to you

### Blog Status Badges

- 🟢 **Published:** Live and visible to everyone
- ⚪ **Draft:** Saved but not public
- 🔵 **Scheduled:** Will publish at a future date (coming soon)

---

## ⌨️ Keyboard Shortcuts

Currently supported:
- **Tab:** Navigate between form fields
- **Enter:** Submit forms
- **Escape:** Close modals and dialogs

---

## 📱 Mobile Usage

The platform is fully responsive:
- **Phone:** Single column, touch-optimized
- **Tablet:** Two-column layouts
- **Desktop:** Full multi-column layouts

All features work the same on mobile, just optimized for smaller screens.

---

## 🔐 Data & Privacy

### Where is my data stored?
- Currently stored in browser localStorage
- Data persists across sessions
- Clearing browser data will delete your account

### Is my data secure?
- This is a demo application
- Passwords are stored (not hashed in demo)
- For production, implement proper backend security

---

## 🆘 Need Help?

### Common Questions

**Q: Can I recover deleted blogs?**
A: No, deletion is permanent in the demo version.

**Q: How do I change my email?**
A: Contact support (feature coming soon).

**Q: Can I have multiple accounts?**
A: Yes, register with different emails.

**Q: Is there a blog limit?**
A: No limits in the demo version.

**Q: Can others see my drafts?**
A: No, only published blogs are public.

---

## 🎯 Quick Actions Cheat Sheet

| Action | Location | Shortcut |
|--------|----------|----------|
| Create Blog | Dashboard/Header | Click "Create New Blog" |
| Edit Blog | My Blogs → Menu → Edit | Click pencil icon |
| Delete Blog | My Blogs → Menu → Delete | Click trash icon |
| Publish Draft | Edit Blog → Publish | Click "Publish" button |
| Change Theme | Header | Click sun/moon icon |
| View Profile | Header → Avatar → Settings | - |
| Logout | Header → Avatar → Logout | - |

---

## ✨ Pro Tips

1. **Use auto-save:** The editor saves every 30 seconds automatically
2. **Preview before publishing:** Review your blog in draft mode first
3. **Organize with tags:** Makes blogs easier to find later
4. **Write catchy titles:** First impression matters
5. **Add excerpts:** Helps readers decide to click
6. **Check mobile view:** Your readers might be on phones
7. **Update regularly:** Keep your profile and blogs current

---

## 📞 Support

This is a demonstration project. For issues or questions:
- Check the PROJECT_SUMMARY.md for technical details
- Review the original design prompt
- Inspect browser console for errors

---

**Enjoy blogging! 📝✨**
