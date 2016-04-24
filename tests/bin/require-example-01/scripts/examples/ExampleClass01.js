define(["./BaseExample"], function(BaseExample) {

    "use strict";

    function ExampleClass01(name_) {
        // Call the super constructor using agJS.
        // this.BaseExample_constructor();

        // Call the super constructor.
        BaseExample.call(this,name_);
        return this;

    }

    // Extend using agJS.
    // var p = agJS.extend(ExampleClass01, BaseExample);

    // Extend
    ExampleClass01.prototype = Object.create(BaseExample.prototype);

    var p = ExampleClass01.prototype;


    p.initialize = function() {

        // Call the super intialize using agJS.
        // this.BaseExample_initialize();

        // Call the super initialize.
        BaseExample.prototype.initialize.call(this);

    };

    

    // Promote using agJS
    // agJS.promote(ExampleClass01, "BaseExample");

     return ExampleClass01;

});
