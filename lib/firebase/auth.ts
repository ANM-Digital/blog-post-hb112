// lib/firebase/auth.ts
"use client";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

import app from './firebase-config';

export const auth = getAuth(app);

export const registerUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  console.log('✅ User registered:', userCredential.user);
  return userCredential.user;
};

export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  console.log('✅ User logged in:', userCredential.user);
  return userCredential.user;
};

export const loginWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  console.log('✅ Google user logged in:', result.user);
  return result.user;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  console.log('✅ User logged out');
};

export const listenForAuthChanges = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
