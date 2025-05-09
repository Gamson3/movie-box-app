// src/lib/firebase/admin.ts
import admin from 'firebase-admin';
import { VITE_FIREBASE_PRIVATE_KEY, VITE_FIREBASE_CLIENT_EMAIL, VITE_FIREBASE_PROJECT_ID } from '$env/static/private';
import { getFirestore } from 'firebase-admin/firestore';


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: VITE_FIREBASE_PROJECT_ID,
      clientEmail: VITE_FIREBASE_CLIENT_EMAIL,
      privateKey: VITE_FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminAuth = admin.auth();
export const db = getFirestore();