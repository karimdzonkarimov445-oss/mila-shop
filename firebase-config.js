// ============================================
// FIREBASE CONFIG для MILA
// ============================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// Твои ключи из Firebase Console
const firebaseConfig = {
  apiKey : "AIzaSyAK8p5lHQNZ8IsSoK9860BKpnODtj9GyA0" ,
  authDomain: "mila-shop-b67b3.firebaseapp.com",
  projectId: "mila-shop-b67b3",
  storageBucket: "mila-shop-b67b3.firebasestorage.app",
  messagingSenderId: "97331957096",
  appId: "1:97331957096:web:4a46dc62e5902948ccdadd"
};

// Инициализация
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Настройки Google-провайдера
provider.setCustomParameters({
  prompt: 'select_account'  // всегда показывает выбор аккаунта
});

// Экспорт для использования в script.js
export { auth, provider, signInWithPopup, signOut, onAuthStateChanged };