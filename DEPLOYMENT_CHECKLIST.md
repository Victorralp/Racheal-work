# Deployment Checklist

Use this checklist to ensure everything is properly configured before deploying to production.

## ✅ Pre-Deployment Checklist

### 1. Environment Setup
- [ ] All environment variables are set in `.env`
- [ ] Firebase project is created and configured
- [ ] Cloudinary account is set up with upload preset
- [ ] Web3Forms access key is obtained
- [ ] `.env` file is NOT committed to git (check `.gitignore`)

### 2. Firebase Configuration
- [ ] Firebase Authentication is enabled
- [ ] Email/Password sign-in provider is enabled
- [ ] Admin user is created in Firebase Auth
- [ ] Admin custom claim (`role: 'admin'`) is set for the user
- [ ] Firestore database is created
- [ ] Firestore security rules are deployed (from `firestore.rules`)
- [ ] Firebase config values are added to `.env`

### 3. Cloudinary Configuration
- [ ] Cloudinary account is created
- [ ] Upload preset is created and set to "Unsigned"
- [ ] Cloud name and upload preset are added to `.env`
- [ ] Test image upload works in development

### 4. Web3Forms Configuration
- [ ] Web3Forms account is created
- [ ] Email is verified
- [ ] Access key is added to `.env`
- [ ] Test contact form submission works

### 5. Code Quality
- [ ] All TypeScript errors are resolved
- [ ] `npm run build` completes successfully
- [ ] No console errors in browser
- [ ] All pages load correctly
- [ ] All links work
- [ ] Mobile responsive design is verified

### 6. Content
- [ ] Home page content is customized
- [ ] Contact information is updated
- [ ] Social links are added (if applicable)
- [ ] At least one project is created for testing

### 7. Testing
- [ ] Public pages are accessible without login
- [ ] Admin login works with correct credentials
- [ ] Admin login fails with incorrect credentials
- [ ] Non-admin users cannot access admin pages
- [ ] Projects can be created, edited, and deleted
- [ ] Image upload works
- [ ] Published projects appear on public site
- [ ] Unpublished projects do NOT appear on public site
- [ ] Contact form submits successfully
- [ ] Contact form emails are received

## 🚀 Deployment Steps

### Option A: Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Add Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add all variables from your `.env` file:
     - `VITE_FIREBASE_API_KEY`
     - `VITE_FIREBASE_AUTH_DOMAIN`
     - `VITE_FIREBASE_PROJECT_ID`
     - `VITE_FIREBASE_STORAGE_BUCKET`
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`
     - `VITE_FIREBASE_APP_ID`
     - `VITE_CLOUDINARY_CLOUD_NAME`
     - `VITE_CLOUDINARY_UPLOAD_PRESET`
     - `VITE_WEB3FORMS_ACCESS_KEY`

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your deployed site

### Option B: Deploy to Netlify

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Add Environment Variables**
   - In Netlify site settings → Environment variables
   - Add all variables from your `.env` file (same as Vercel list above)

4. **Deploy**
   - Click "Deploy site"
   - Wait for build to complete
   - Visit your deployed site

## 🔍 Post-Deployment Verification

### Immediate Checks
- [ ] Site loads without errors
- [ ] All pages are accessible
- [ ] Images load correctly
- [ ] Styles are applied correctly
- [ ] No 404 errors in browser console

### Functionality Tests
- [ ] Navigate to `/admin/login`
- [ ] Log in with admin credentials
- [ ] Create a test project with images
- [ ] Publish the project
- [ ] Verify it appears on public `/projects` page
- [ ] Submit a test contact form
- [ ] Verify email is received

### Performance
- [ ] Run Lighthouse audit (aim for 90+ on all metrics)
- [ ] Check mobile responsiveness
- [ ] Test on different browsers (Chrome, Firefox, Safari)
- [ ] Verify page load times are acceptable

## 🔒 Security Verification

- [ ] `.env` file is NOT in the repository
- [ ] Firestore rules prevent unauthorized writes
- [ ] Only admin users can access `/admin/*` routes
- [ ] API keys are properly configured as environment variables
- [ ] No sensitive data in client-side code

## 📱 Optional: Custom Domain

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for DNS propagation

### Netlify
1. Go to Site Settings → Domain management
2. Add custom domain
3. Configure DNS records as instructed
4. Enable HTTPS (automatic with Let's Encrypt)

## 🐛 Troubleshooting

### Build Fails
- Check all environment variables are set
- Verify no TypeScript errors: `npm run build` locally
- Check build logs for specific errors

### Firebase Connection Issues
- Verify all Firebase config values are correct
- Check Firebase project is in production mode
- Ensure Firestore rules are deployed

### Images Not Loading
- Verify Cloudinary credentials
- Check upload preset is set to "Unsigned"
- Test image URLs directly in browser

### Contact Form Not Working
- Verify Web3Forms access key
- Check browser console for errors
- Test API endpoint directly

## 📊 Monitoring

After deployment, monitor:
- [ ] Error tracking (consider adding Sentry)
- [ ] Analytics (consider adding Google Analytics)
- [ ] Uptime monitoring
- [ ] Form submissions
- [ ] User feedback

## 🎉 Launch

Once all checks pass:
- [ ] Announce on social media
- [ ] Update LinkedIn profile
- [ ] Add to resume/CV
- [ ] Share with network
- [ ] Monitor for first week

---

**Need Help?** See [SETUP.md](./SETUP.md) for detailed configuration instructions.
