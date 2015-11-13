exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*-spec.js'],
    //default is body, otherwise need to specify
    rootElement: 'body'
};
