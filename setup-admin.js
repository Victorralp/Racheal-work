/**
 * Firebase Admin Setup Script
 * Run this script to create an admin user with custom claims
 * 
 * Prerequisites:
 * 1. Install firebase-admin: npm install firebase-admin
 * 2. Download service account key from Firebase Console
 * 3. Update the serviceAccount path below
 */

import admin from 'firebase-admin';
import { readFileSync } from 'fs';

// TODO: Download your service account key from Firebase Console
// Go to: Project Settings > Service Accounts > Generate New Private Key
// Save it as 'serviceAccountKey.json' in this directory
const serviceAccount = JSON.parse(
  readFileSync('./serviceAccountKey.json', 'utf8')
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function setupAdmin() {
  try {
    const email = 'victorralph407@gmail.com'; // Change this to Rachael's email
    const password = '123456789'; // Change this to a secure password
    
    console.log('🔧 Setting up admin user...\n');

    // Step 1: Create user
    let user;
    try {
      user = await admin.auth().createUser({
        email: email,
        password: password,
        emailVerified: true,
        displayName: 'Rachael Olarinoye'
      });
      console.log('✅ User created successfully!');
      console.log(`   UID: ${user.uid}`);
      console.log(`   Email: ${user.email}\n`);
    } catch (error) {
      if (error.code === 'auth/email-already-exists') {
        console.log('ℹ️  User already exists, fetching...');
        user = await admin.auth().getUserByEmail(email);
        console.log(`   UID: ${user.uid}`);
        console.log(`   Email: ${user.email}\n`);
      } else {
        throw error;
      }
    }

    // Step 2: Set admin custom claims
    await admin.auth().setCustomUserClaims(user.uid, { role: 'admin' });
    console.log('✅ Admin role assigned successfully!\n');

    // Step 3: Verify claims
    const userRecord = await admin.auth().getUser(user.uid);
    console.log('🔍 Verification:');
    console.log(`   Custom Claims: ${JSON.stringify(userRecord.customClaims)}\n`);

    console.log('🎉 Setup Complete!\n');
    console.log('📝 Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`\n🌐 Admin URL: http://localhost:5173/admin/login\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

setupAdmin();
