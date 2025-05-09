// // Store JWT in Cookie on Login
// // src/routes/auth/+page.server.ts
// import { adminAuth } from '$lib/firebase/admin';
// import { serialize } from 'cookie';

// export async function POST({ request, cookies }) {
//   const { idToken } = await request.json();

//   // Verify and create session cookie
//   const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
//   const sessionCookie = await adminAuth.createSessionCookie(idToken, { expiresIn });

//   // Set cookie
//   cookies.set('session', sessionCookie, {
//     path: '/',
//     maxAge: expiresIn / 1000,
//     httpOnly: true,
//     sameSite: 'lax',
//     secure: true,
//   });

//   return new Response(null, { status: 200 });
// }
