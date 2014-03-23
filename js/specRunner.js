/* global require */
require.config({
    //    urlArgs: 'cb=' + Math.random(),
    baseUrl: 'js/',
    paths: {
        jquery: 'thirdpartylib/jquery-1.10.2.min',
        jasmine: 'thirdpartylib/jasmine-2.0.0/jasmine',
        'jasmine-html': 'thirdpartylib/jasmine-2.0.0/jasmine-html',
        spec: 'spec/'
    },
    shim: {
        jasmine: {
            exports: 'jasmine'
        },
        'jasmine-html': {
            deps: ['jasmine'],
            exports: 'jasmine'
        }
    }
});