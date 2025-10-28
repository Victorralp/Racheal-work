# Portfolio Setup Guide

This guide will help you set up the complete portfolio website with Firebase, Cloudinary, and all necessary services.

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- A Firebase account
- A Cloudinary account
- A Web3Forms account (free)

## Step 1: Clone and Install Dependencies

```bash
npm install
```

## Step 2: Firebase Setup

### 2.1 Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name it (e.g., "rachael-portfolio")
4. Disable Google Analytics (optional)
5. Click "Create project"

### 2.2 Enable Authentication

1. In Firebase Console, go to **Authentication** → **Get Started**
2. Click **Sign-in method** tab
3. Enable **Email/Password** provider
4. Click **Save**

### 2.3 Create Admin User

1. Go to **Authentication** → **Users** tab
2. Click **Add user**
3. Enter Rachael's email and password
4. Click **Add user**
5. Copy the **User UID** (you'll need this next)

### 2.4 Set Admin Custom Claim

You need to set a custom claim to make the user an admin. Use Firebase CLI or Cloud Functions:

**Option A: Using Firebase CLI (Recommended)**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize Firebase in your project
firebase init

# Run this command (replace USER_UID with the actual UID)
firebase auth:import --hash-algo=scrypt --hash-key=YOUR_HASH_KEY --project=YOUR_PROJECT_ID users.json
```

**Option B: Using Cloud Functions**

Create a Cloud Function to set admin role:

```javascript
const admin = require('firebase-admin');
admin.initializeApp();

exports.setAdminRole = functions.https.onCall(async (data, context) => {
  // Add security check here
  await admin.auth().setCustomUserClaims(data.uid, { role: 'admin' });
  return { message: 'Admin role set successfully' };
});
```

**Option C: Using Node.js Script (Easiest for one-time setup)**

Create a file `set-admin.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./path-to-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = 'USER_UID_HERE'; // Replace with actual UID

admin.auth().setCustomUserClaims(uid, { role: 'admin' })
  .then(() => {
    console.log('Admin role set successfully');
    process.exit();
  })
  .catch(error => {
    console.error('Error:', error);
    process.exit(1);
  });
```

Run: `node set-admin.js`

### 2.5 Enable Firestore

1. Go to **Firestore Database** → **Create database**
2. Choose **Start in production mode**
3. Select a location (choose closest to your users)
4. Click **Enable**

### 2.6 Deploy Firestore Rules

1. Copy the contents of `firestore.rules` in this project
2. In Firebase Console, go to **Firestore Database** → **Rules**
3. Paste the rules and click **Publish**

### 2.7 Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click the web icon `</>`
4. Register your app (name it anything)
5. Copy the `firebaseConfig` object values

## Step 3: Cloudinary Setup

### 3.1 Create Account

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for a free account
3. Verify your email

### 3.2 Get Credentials

1. Go to Dashboard
2. Copy your **Cloud Name**
3. Go to **Settings** → **Upload**
4. Scroll to **Upload presets**
5. Click **Add upload preset**
6. Set **Signing Mode** to **Unsigned**
7. Name it (e.g., "portfolio_uploads")
8. Click **Save**
9. Copy the **preset name**

## Step 4: Web3Forms Setup

### 4.1 Create Account

1. Go to [Web3Forms](https://web3forms.com/)
2. Click "Get Started Free"
3. Enter your email
4. Verify your email

### 4.2 Get Access Key

1. Login to Web3Forms dashboard
2. Click "Create New Form"
3. Copy your **Access Key**

## Step 5: Environment Variables

1. Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

2. Fill in all the values:

```env
# Firebase Configuration (from Step 2.7)
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef

# Cloudinary Configuration (from Step 3.2)
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=portfolio_uploads

# Web3Forms Configuration (from Step 4.2)
VITE_WEB3FORMS_ACCESS_KEY=your_access_key
```

## Step 6: Run the Application

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Step 7: First Login

1. Navigate to `http://localhost:5173/admin/login`
2. Login with the email and password you created in Step 2.3
3. You should be redirected to `/admin/projects`
4. Create your first project!

## Step 8: Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/)
3. Click "Import Project"
4. Select your repository
5. Add all environment variables from your `.env` file
6. Click "Deploy"

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.com/)
3. Click "Add new site" → "Import an existing project"
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Add all environment variables
8. Click "Deploy"

## Troubleshooting

### "Permission denied" when accessing Firestore

- Make sure you've deployed the Firestore rules from `firestore.rules`
- Verify the user has the `role: 'admin'` custom claim set

### Images not uploading to Cloudinary

- Verify your Cloud Name is correct
- Make sure the upload preset is set to "Unsigned"
- Check browser console for specific error messages

### Contact form not working

- Verify your Web3Forms access key is correct
- Check that the form is being submitted (network tab in browser dev tools)
- Make sure you've verified your email with Web3Forms

### Admin login not working

- Verify Firebase Auth is enabled
- Check that Email/Password provider is enabled
- Make sure the user exists in Firebase Authentication
- Verify custom claims are set correctly

## Support

For issues specific to:
- **Firebase**: [Firebase Documentation](https://firebase.google.com/docs)
- **Cloudinary**: [Cloudinary Documentation](https://cloudinary.com/documentation)
- **Web3Forms**: [Web3Forms Documentation](https://docs.web3forms.com/)

## Security Notes

1. **Never commit your `.env` file** - it's already in `.gitignore`
2. **Firestore rules** are set to only allow:
   - Public read access to published projects
   - Admin-only write access to all projects
3. **Custom claims** are the only way to grant admin access
4. **Cloudinary uploads** are unsigned but you can add restrictions in Cloudinary dashboard
