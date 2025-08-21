"use strict";
// lib/firebase/firestore.ts

import {
  getFirestore as firebaseGetFirestore,
  doc,
  setDoc,
  updateDoc,
  addDoc,
  collection,
  query,
  orderBy,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import app from './firebase-config';

const db = firebaseGetFirestore(app);

// Save a document with a known ID
export const saveDataToFirestore = async (
  collectionName: string,
  documentId: string,
  data: any
) => {
  try {
    await setDoc(doc(db, collectionName, documentId), data);
    console.log(`✅ Saved to ${collectionName}/${documentId}`);
  } catch (error) {
    console.error('❌ Error saving data:', error);
    throw error;
  }
};

// Update a document
export const updateDataInFirestore = async (
  collectionName: string,
  documentId: string,
  data: any
) => {
  try {
    await updateDoc(doc(db, collectionName, documentId), data);
    console.log(`✅ Updated ${collectionName}/${documentId}`);
  } catch (error) {
    console.error('❌ Error updating data:', error);
    throw error;
  }
};

// Add a document with auto-generated ID
export const addDataToFirestore = async (
  collectionName: string,
  data: any
) => {
  try {
    const collectionRef = collection(db, collectionName);
    const docRef = await addDoc(collectionRef, {
      ...data,
      createdAt: Timestamp.now(),
    });
    console.log(`✅ Added doc ID: ${docRef.id}`);
    return docRef;
  } catch (error) {
    console.error('❌ Error adding data:', error);
    throw error;
  }
};

// Retrieve and rejoin original text by partNumber
export const getOriginalTextFromChunks = async (
  collectionName: string
): Promise<string> => {
  try {
    const q = query(collection(db, collectionName), orderBy("partNumber", "asc"));
    const snapshot = await getDocs(q);
    const parts = snapshot.docs.map(doc => doc.data().content || "");
    return parts.join("");
  } catch (error) {
    console.error("❌ Error reconstructing original text:", error);
    throw error;
  }
};

export { db };
