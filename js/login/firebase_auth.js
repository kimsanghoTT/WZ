import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

import {
    GoogleAuthProvider,
    signInWithPopup,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBczNLHq0L2aL5CSSnAYh-KgwxT3qLeyIE",
  authDomain: "practice-c9b9f.firebaseapp.com",
  projectId: "practice-c9b9f",
  storageBucket: "practice-c9b9f.firebasestorage.app",
  messagingSenderId: "899272455522",
  appId: "1:899272455522:web:d79eec634c7b7df5b1683b",
  measurementId: "G-F9T9EFGBKW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

//구글로그인
export const googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return user;
  } catch (error) {
    alert("예기치 못한 오류가 발생했습니다.다시 시도해 주세요.");
    console.log(error);
    throw error;
  }
};
