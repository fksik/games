// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBJdk_ZOOjhItvhglwgLCuudcc_5OPtSNo',
    authDomain: 'fractal-webrtc.firebaseapp.com',
    projectId: 'fractal-webrtc',
    storageBucket: 'fractal-webrtc.appspot.com',
    messagingSenderId: '556652653075',
    appId: '1:556652653075:web:876b9600eeb7a410ebede6',
    measurementId: 'G-9KE73BJYNY',
  },
  webRTC: {
    iceServers: [
      {
        urls: [
          'stun:stun1.l.google.com:19302',
          'stun:stun2.l.google.com:19302',
        ],
      },
    ],
    iceCandidatePoolSize: 10,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
