import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_PP_ID
};

//firebase 초기화
const firebaseInstance = initializeApp(firebaseConfig);

export default firebaseInstance;

//auth를 import한 후 export해서 외부에서도 사용 가능하게끔 해줌.
export const authService = getAuth();

//firebase의 db에서 컬렉션을 가져오는 방법 
//cloud firestore 인스턴스를 초기화 하는 방법
//https://firebase.google.com/docs/firestore/quickstart#web-version-9
export const dbService = getFirestore();
export const storageService = getStorage();