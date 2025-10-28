# Firebase Authentication Setup Guide

Follow these steps to set up Firebase Authentication and create an admin user.

## Step 1: Enable Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project: **portfolio-47f89**
3. Click **Authentication** in the left sidebar
4. Click **"Get Started"** button
5. Go to **"Sign-in method"** tab
6. Click on **"Email/Password"**
7. Toggle **"Enable"** switch
8. Click **"Save"**

✅ Email/Password authentication is now enabled!

---

## Step 2: Download Service Account Key

1. In Firebase Console, click the **⚙️ gear icon** → **Project settings**
2. Go to **"Service accounts"** tab
3. Click **"Generate new private key"** button
4. Click **"Generate key"** in the confirmation dialog
5. A JSON file will download (e.g., `portfolio-47f89-firebase-adminsdk-xxxxx.json`)
6. **IMPORTANT**: Rename it to `serviceAccountKey.json`
7. Move it to your project root directory (same folder as `setup-admin.js`)

⚠️ **Security Note**: Never commit this file to Git! It's already in `.gitignore`

---

## Step 3: Install Firebase Admin SDK

Open your terminal in the project directory and run:

```bash
npm install firebase-admin
```

---

## Step 4: Update Admin Credentials

Open `setup-admin.js` and update these lines:

```javascript
const email = 'rachael@example.com'; // Change to Rachael's actual email
const password = 'SecurePassword123!'; // Change to a secure password
```

**Password Requirements:**
- At least 6 characters
- Use a strong, unique password
- Consider using a password manager

---

## Step 5: Run the Setup Script

In your terminal, run:

```bash
node setup-admin.js
```

You should see output like:

```
🔧 Setting up admin user...

✅ User created successfully!
   UID: abc123xyz789
   Email: rachael@example.com

✅ Admin role assigned successfully!

🔍 Verification:
   Custom Claims: {"role":"admin"}

🎉 Setup Complete!

📝 Login Credentials:
   Email: rachael@example.com
   Password: SecurePassword123!

🌐 Admin URL: http://localhost:5173/admin/login
```

---

## Step 6: Test Admin Login

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:5173/admin/login`

3. Enter the email and password you set in Step 4

4. You should be redirected to `/admin/projects`

---

## Troubleshooting

### Error: "Cannot find module './serviceAccountKey.json'"
- Make sure you downloaded the service account key
- Rename it to exactly `serviceAccountKey.json`
- Place it in the project root directory

### Error: "auth/email-already-exists"
- The script will handle this automatically
- It will fetch the existing user and set admin claims

### Error: "Insufficient permissions"
- Make sure you're using the correct Firebase project
- Verify the service account key is from the right project

### Login fails with "Access Denied"
- Wait 1-2 minutes after running the script (token refresh)
- Try logging out and back in
- Check browser console for errors

### Can't see projects after login
- Make sure Firestore is enabled (see below)
- Check that security rules are deployed

---

## Step 7: Enable Firestore Database

1. In Firebase Console → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose a location (e.g., `us-central`)
5. Click **"Enable"**

---

## Step 8: Deploy Firestore Security Rules

Create a file `firestore.rules` in your project root (if not exists) and deploy:

```bash
firebase deploy --only firestore:rules
```

Or manually copy the rules from `firestore.rules` to Firebase Console:
1. Go to **Firestore Database** → **Rules** tab
2. Paste the rules
3. Click **"Publish"**

---

## Alternative: Manual Setup (Without Script)

If you prefer not to use the script:

### Create User Manually:
1. Firebase Console → **Authentication** → **Users**
2. Click **"Add user"**
3. Enter email and password
4. Click **"Add user"**
5. Copy the **UID** from the user list

### Set Admin Claims Using Firebase CLI:
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Set custom claims (replace USER_UID with actual UID)
firebase auth:users:set-custom-claims USER_UID '{"role":"admin"}'
```

---

## Security Best Practices

1. ✅ Never commit `serviceAccountKey.json` to version control
2. ✅ Use strong passwords for admin accounts
3. ✅ Enable 2FA on your Firebase account
4. ✅ Regularly rotate service account keys
5. ✅ Delete the `setup-admin.js` script after setup (or keep it secure)
6. ✅ Use environment variables for sensitive data in production

---

## Next Steps

Once authentication is set up:

1. ✅ Test admin login
2. ✅ Create your first project via admin panel
3. ✅ Upload images using Cloudinary
4. ✅ Test the contact form with Web3Forms
5. ✅ Deploy to production!

---

## Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal for error messages
3. Verify all environment variables in `.env`
4. Make sure Firebase services are enabled
