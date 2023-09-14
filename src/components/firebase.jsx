import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAgvh68omqtxi6u8XK6F9OkF0xXXN_w6k8",
    authDomain: "todolist-6e421.firebaseapp.com",
    projectId: "todolist-6e421",
    storageBucket: "todolist-6e421.appspot.com",
    messagingSenderId: "340223159809",
    appId: "1:340223159809:web:3000a22c86775e1c089a00",
    measurementId: "G-3ZHV7VRY6H"
  };

    const app = initializeApp(firebaseConfig);
    const dataBase= getFirestore(app);

export {dataBase};