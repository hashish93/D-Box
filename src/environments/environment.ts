// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    frontEndPoint: 'https://www.piksels.tv',
    apiEndpoint: 'https://api.piksels.tv/api/v1/portal/',
    staticFilesEndPoint: 'https://assets.piksels.tv/',
    videoEndPoint: 'https://assets.piksels.tv/v/',
    shareEndPoint: 'http://localhost:4200/',
    facebookEndPoint: 'https://assets.piksels.tv/facebook/comments/',
    production: false,
    isServer: false,
    // for prerender
    host: 'http://localhost:4000'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
