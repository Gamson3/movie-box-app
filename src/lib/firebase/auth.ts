// src/lib/firebase/auth.ts
import { resetFavourites } from '$lib/api/favourites';
import { auth } from './client';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	type User
} from 'firebase/auth';

export const register = (email: string, password: string) => {
	return createUserWithEmailAndPassword(auth, email, password);
};

export const login = (email: string, password: string) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
	const provider = new GoogleAuthProvider();
	return signInWithPopup(auth, provider);
};

export const logout = async () => {
	await signOut(auth);
	resetFavourites();
} 

export const onUserChange = (callback: (user: User | null) => void) =>
	onAuthStateChanged(auth, callback);
