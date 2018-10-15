// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    frontEndPoint: 'https://www.piksels.tv',
    apiEndpoint: 'https://piksels-api.n-stream.tv/api/1.0/portal/',
    staticFilesEndPoint: 'https://piksels-api.n-stream.tv/',
    videoEndPoint: 'https://piksels-backend.n-stream.tv/v/',
    shareEndPoint: 'http://localhost:4200/',
    production: false,
    isServer: false,
    // for prerender
    host: 'http://localhost:4000',
    firebase: {
      apiKey: "AIzaSyDzcikcx-q8kuaO4bS7DiQCE4zgsRxfx04",
      authDomain: "piksels-df718.firebaseapp.com",
      databaseURL: "https://piksels-df718.firebaseio.com",
      projectId: "piksels-df718",
      storageBucket: "piksels-df718.appspot.com",
      messagingSenderId: "1023466919928"
    }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
