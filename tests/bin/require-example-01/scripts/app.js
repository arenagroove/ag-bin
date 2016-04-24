this.app = this.app || {};

(function() {
    'use strict';

    var _appManager = {

        initialize: function() {

            console.log("initialize appManager");

        },

        run: function(example_) {
            switch (example_) {
                case "Test01":

                    /*require(["examples/ExampleClass01"], function(ExampleClass01) {
                        var example = new ExampleClass01("MyExample01");
                        example.initialize();

                        var example2 = new ExampleClass01("MyExample02");
                        example2.initialize();
                        console.log(example.name);



                    });*/

                    require(["examples/SimpleModule"], function(SimpleModule) {
                        var example = SimpleModule;
                        example.initialize();
                        example.$el.html("This is my New Text 2");




                    });


                    break;
                default:
            }

        }
    };

    app = _appManager;
}());
