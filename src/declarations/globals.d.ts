const { compose } = require('redux');

declare interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: compose;
}

declare module '*.mp3' {
    const value: any;
    export = value;
}

declare module "*.png" {
    const value: any;
    export = value;
}

declare module "*.svg" {
    const value: any;
    export = value;
}