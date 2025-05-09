// src/lib/firebase/admin.ts
import admin from 'firebase-admin';
import { FIREBASE_PRIVATE_KEY, FIREBASE_CLIENT_EMAIL, FIREBASE_PROJECT_ID } from '$env/static/private';
import { getFirestore } from 'firebase-admin/firestore';


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    }),
  });
}

export const adminAuth = admin.auth();
export const db = getFirestore();