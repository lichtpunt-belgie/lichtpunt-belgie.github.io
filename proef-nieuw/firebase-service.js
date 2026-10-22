import { initializeApp } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/13.0.0/firebase-firestore.js';
import { firebaseConfig } from './firebase-config.js';
const required=['apiKey','authDomain','projectId','appId'];
export const configured=required.every(k=>typeof firebaseConfig[k]==='string' && firebaseConfig[k] && !firebaseConfig[k].startsWith('VUL_'));
export const app=configured?initializeApp(firebaseConfig):null;
export const auth=app?getAuth(app):null;
export const db=app?getFirestore(app):null;
