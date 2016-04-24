require.config({
    paths: {
        "jquery": "../../../bower_components/jquery/dist/jquery",
        "underscore": "../../bower_components/underscore/underscore",
    },

    shim: {
        "jquery": {
            exports: "$"
        },
        "underscore": {
            exports: "_"
        },
        "app": {
            exports: "app"
        }


    }
});

require(["app"], function(app) {

    app.initialize();
    app.run("Test01");

});
