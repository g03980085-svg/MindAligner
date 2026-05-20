# MindAligner – Sofia Jacob | Consultant Psychologist

A beautiful, fully responsive psychology consultation website built with **HTML, CSS & JavaScript**. Features an integrated Google Form for seamless appointment bookings with professional styling and responsive design.


## 🎯 About

MindAligner is a professional platform for Sofia Jacob, a Consultant Psychologist specializing in:
- Individual Therapy
- Couple Therapy
- Family Therapy
- Group Therapy
- Stress & Anxiety Management
- Pre-Marital Counselling

All sessions are **confidential**, **evidence-based**, and tailored to individual needs.


## 📁 Project Structure

```
MindAligner/
├── index.html           ← Main website (home, about, services, booking, contact)
├── style.css            ← Soft pastel design system + responsive layout
├── script.js            ← Navigation, price display, card animations
├── firebase-config.js   ← Firebase config (optional for Firestore storage)
├── README.md            ← This file
├── favicon.svg          ← Website icon
└── aidoc.jpg            ← Therapist profile image
```

## ✨ Key Features

- **Responsive Design** — Works on desktop, tablet, and mobile devices
- **Professional Styling** — Soft pastel color scheme (lavender, sage, blush)
- **Google Form Integration** — Secure, modern booking system with embedded form
- **Service Pricing** — Dynamic pricing display for each therapy type
- **Smooth Navigation** — Sticky navbar with active section highlighting
- **Contact Information** — Easy access to phone, email, and availability
- **Accessibility** — Semantic HTML, ARIA labels, keyboard navigation

## 🚀 Deployment

### GitHub Pages (Recommended)

1. Repository is already set up at `github.com/g03980085-svg/MindAligner`
2. Enable GitHub Pages:
   - Go to **Settings → Pages**
   - Select **Deploy from a branch** → branch: `main` or `master`
   - Choose folder: `/ (root)`
   - Click **Save**

Your site will be live at:
```
https://g03980085-svg.github.io/MindAligner/
```

> **Note:** It may take 1–2 minutes for GitHub Pages to build and deploy.

### Custom Domain (Optional)

If you have a custom domain:
1. In GitHub Pages settings, add your domain under "Custom domain"
2. Update DNS records with your domain registrar to point to GitHub Pages

## 📅 Booking System

The booking form is powered by **Google Forms** for:
- ✅ Easy form management
- ✅ Secure data storage
- ✅ No backend server required
- ✅ Built-in validation and notifications

**Form URL:** `https://docs.google.com/forms/d/e/1FAIpQLSdtcxZPeuOI_JOCy1-ihHsR8s3KBvyypbl4WwiCTKoteQ2fjw/viewform`

To edit the Google Form:
1. Open the link above
2. Click the edit icon (pencil) — you must be the form owner
3. Customize questions, styling, and notifications as needed

## 📞 Contact Information

- **Phone:** +91 79071 95490
- **Email:** g03980085@gmail.com
- **Availability:** Mon – Sat, 9 AM – 6 PM
- **Sessions:** Available online (Google Meet/Zoom) and in-person

## 🛠 Tech Stack

- **HTML5** — Semantic structure
- **CSS3** — Modern styling with CSS variables, gradients, animations
- **JavaScript** — Interactive features (navbar toggle, card animations, price display)
- **Firebase** (Optional) — Firestore for data storage, Cloud Functions for email notifications
- **Google Forms** — Embedded booking form

## 🔧 Customization

### Update Contact Details

Edit these files to update contact information:
- **index.html**: Phone numbers, email addresses, social media links
- **style.css**: Color scheme (CSS variables at the top)
- **script.js**: Form pricing, validation rules

### Change Therapist Information

Update in `index.html`:
- Profile image: Replace `aidoc.jpg`
- Qualifications, bio, therapy approaches
- Service descriptions and pricing

### Modify Google Form

To connect a different Google Form:
1. Get your form's embed ID
2. Update the `src` in the `<iframe>` tag in `index.html`
3. Adjust iframe height if needed in `style.css`


## 📱 Responsive Breakpoints

- **Desktop:** 1100px container width
- **Tablet:** 900px breakpoint
- **Mobile:** 700px and 480px breakpoints

The site automatically adjusts layout, font sizes, and spacing for optimal viewing on all devices.


## 📜 License

This project is created for MindAligner psychological consulting services. All rights reserved.


## 📧 Support

For questions or technical issues:
- Email: g03980085@gmail.com
- Phone: +91 79071 95490


**Made with ❤️ for MindAligner**


> **Gmail App Password:** Go to your Google Account → Security → 2-Step Verification → App passwords → generate one for "Mail".


## 📧 Without Firebase (Quick Start)

The booking form works **out of the box without any Firebase setup**. When `firebase-config.js` has placeholder values, clicking **Request Appointment** will:
1. Validate all form fields
2. Open your default email app pre-filled with the booking details

## 🎨 Customisation Tips

| What to change | Where |
|---|---|
| Profile photo | Replace the placeholder `div` in `index.html` with `<img src="your-photo.jpg">` |
| Prices | Edit the `PRICES` object at the top of `script.js` |
| Session duration / availability | Edit the `.info-list` in `index.html` |
| Colors | Edit CSS variables at the top of `style.css` |
| Contact info | Search for `9567971968` / `athirajagadeeswaran@gmail.com` in `index.html`
