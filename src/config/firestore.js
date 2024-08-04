// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANuEDy98srPJAOCKRNJJVrKwZzU0GA3Fc",
  authDomain: "to-do-app-6e142.firebaseapp.com",
  databaseURL: "https://to-do-app-6e142-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "to-do-app-6e142",
  storageBucket: "to-do-app-6e142.appspot.com",
  messagingSenderId: "436369875296",
  appId: "1:436369875296:web:29fcfc2b7bdad4ebc9be05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);


// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyANuEDy98srPJAOCKRNJJVrKwZzU0GA3Fc",
//   authDomain: "to-do-app-6e142.firebaseapp.com",
//   databaseURL: "https://to-do-app-6e142-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "to-do-app-6e142",
//   storageBucket: "to-do-app-6e142.appspot.com",
//   messagingSenderId: "436369875296",
//   appId: "1:436369875296:web:29fcfc2b7bdad4ebc9be05"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// apiKey: "AIzaSyCfAw95kArgmUYkwWlF9gQcRZQr-YSkbJU",
// authDomain: "pc-parts-database.firebaseapp.com",
// projectId: "pc-parts-database",
// storageBucket: "pc-parts-database.appspot.com",
// messagingSenderId: "330359778286",
// appId: "1:330359778286:web:5dd2baab93a2ccfeb63cff"