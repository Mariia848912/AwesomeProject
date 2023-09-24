// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDD-n25rl5agEVIkpXBWZrIuA9eLxw4cGA",
  authDomain: "awesomeproject-55032.firebaseapp.com",
  // databaseURL: "<https://awesomeproject-55032-default-rtdb.firebaseio.com>",
  projectId: "awesomeproject-55032",
  storageBucket: "awesomeproject-55032.appspot.com",
  messagingSenderId: "8162184996",
  appId: "1:8162184996:web:59438fc1038a5b64906db1",
  // measurementId: "G-5TD2H2Q0JC",
};

const app = initializeApp(firebaseConfig);
// initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// });

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 // Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDD-n25rl5agEVIkpXBWZrIuA9eLxw4cGA",
  authDomain: "awesomeproject-55032.firebaseapp.com",
  databaseURL: "<https://awesomeproject-55032-default-rtdb.firebaseio.com>",
  projectId: "awesomeproject-55032",
  storageBucket: "awesomeproject-55032.appspot.com",
  messagingSenderId: "8162184996",
  appId: "1:8162184996:web:59438fc1038a5b64906db1",
  measurementId: "G-5TD2H2Q0JC",
};

const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

 */
