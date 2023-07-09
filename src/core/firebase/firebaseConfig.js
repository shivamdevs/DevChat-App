import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firebaseStore = getFirestore(firebaseApp);

const firebase = {
    app: firebaseApp,
    auth: firebaseAuth,
    store: firebaseStore,
    config: firebaseConfig,
};

export default firebase;

export {
    firebaseApp,
    firebaseAuth,
    firebaseStore,
    firebaseConfig,
};