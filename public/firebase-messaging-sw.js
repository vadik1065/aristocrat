// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.9.1/firebase-messaging.js');

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../firebase-messaging-sw.js')
//     .then(function(registration) {
//       console.log('Registration successful, scope is: ', registration.scope);
//     }).catch(function(err) {
//       console.log('Service worker registration failed, error: ', err);
//     })
// }

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

const messaging = firebase.messaging();

// Работает только в контексте SW
// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// Работает только в контексте SW
// messaging.setBackgroundMessageHandler((payload) => {
//   console.log('Background message ', payload);
//   const title = 'Background msg title';
//   const options = {
//     body: payload.data.status
//   };

//   self.registration.showNotification(title, options);
// });