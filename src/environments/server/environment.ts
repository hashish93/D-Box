// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    frontEndPoint: 'https://www.piksels.tv',
    apiEndpoint: 'https://piksels-api.n-stream.tv/api/1.0/portal/',
    staticFilesEndPoint: 'https://piksels-api.n-stream.tv/',
    videoEndPoint: 'https://piksels-backend.n-stream.tv/v/',
    shareEndPoint: 'http:/localhost:4200/',
    production: false,
    isServer: true,
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
