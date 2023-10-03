import {initializeApp} from 'firebase/app';

import {getMessaging} from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBC9ZJAbcz_9sIyyacZ-OlZD437hLKMpYQ',
  authDomain: 'notification-412d2.firebaseapp.com',
  projectId: 'notification-412d2',
  storageBucket: 'notification-412d2.appspot.com',
  messagingSenderId: '531903435482',
  appId: '1:531903435482:web:6cb2b1d5e7d7eba63e4be3',
  measurementId: 'G-MT4GJQ9JTQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
