import firebase from 'firebase/app';
import 'firebase/messaging';
import { saveFcmToken } from './api/functions';

const firebaseConfig = {
  apiKey: "AIzaSyCX2Zco6aLqrPQ-J8fxUesZAzejbQDEM-k",
  authDomain: "aristocrat-net.firebaseapp.com",
  databaseURL: 'https://aristocrat-net.firebaseapp.com',
  projectId: "aristocrat-net",
  storageBucket: "aristocrat-net.appspot.com",
  messagingSenderId: "478059441675",
  appId: "1:478059441675:web:c5d69808d023d28e55610e"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

let messaging = null;

if (firebase.messaging.isSupported()){
  messaging = firebase.messaging();
}

export const getFirebaseToken = (authToken) => {
  return messaging.getToken().then((fcmToken) => {
    if (fcmToken) {
      // console.log('Token: ', fcmToken);
      // setTokenFound(true);
      saveFcmToken(authToken, fcmToken);
    } else {
      console.log('No registration token available. Request permission to generate one.');
      // setTokenFound(false);
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
});
