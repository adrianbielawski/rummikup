declare module '*.scss' {
    const content: {[className: string]: string};
    export default content;
}

declare module '*.mp3' {
    const value: any;
    export = value;
}