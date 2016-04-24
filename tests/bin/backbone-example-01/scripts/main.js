require.config({
    paths: {
        "jquery": "../../../bower_components/jquery/dist/jquery",
        "underscore": "../../../bower_components/lodash/lodash",
        "backbone": "../../../bower_components/backbone/backbone",
        "jstore": "../../../bower_components/store2/dist/store2",
        "webservice": "./MSWebService",
    },

    shim: {

        "backbone": {
            deps: ["jquery", "underscore"],
            exports: "Backbone"
        },

       "jquery": {
            exports: "$"
        },

        "underscore": {
            exports: "_"
        },

        "jstore": {
            exports: "store"
        },

        "webservice": {
            deps: ["jquery"],
            exports: "themags"
        },

        
        "app": {
            deps:["webservice","backbone","jstore"],
            exports: "app"
        }


    }
});

require(["app"], function(app) {

    app.initialize();
    app.run();

});
