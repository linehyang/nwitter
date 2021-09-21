import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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

