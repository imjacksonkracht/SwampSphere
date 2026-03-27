import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZlVa-VEa7r9d7RRSrP6YcYGwHCqCMgHM',
  authDomain: 'swampsphere.firebaseapp.com',
  projectId: 'swampsphere',
  storageBucket: 'swampsphere.firebasestorage.app',
  messagingSenderId: '980871225974',
  appId: '1:980871225974:web:fd761b3430fbaa4582f557',
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
