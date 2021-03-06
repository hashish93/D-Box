// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    frontEndPoint: 'https://www.piksels.tv',
    apiEndpoint: 'https://api.piksels.tv/api/v1/portal/',
    staticFilesEndPoint: 'https://assets.piksels.tv/',
    videoEndPoint: 'https://assets.piksels.tv/v/',
    shareEndPoint: 'http://localhost:4200/',
    // facebookEndPoint: 'https://assets.piksels.tv/facebook/comments/',
    facebookEndPoint: '/facebook/comments/',
    production: false,
    isServer: false,
    // for prerender
    host: 'http://localhost:4000'
};
