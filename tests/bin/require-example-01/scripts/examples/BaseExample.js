define([], function() {

    "use strict";

    function BaseClass(name_) {
        // Call the super constructor using agJS.
        // this.BaseClass_constructor();

        // Call the super constructor.
        // BaseClass.call(this);
        // return this;
        this.name=name_;

    }

    // Extend using agJS.
    // var p = agJS.extend(BaseClass, BaseClass);

    // Extend
    // BaseClass.prototype = Object.create(BaseClass.prototype);

    var p = BaseClass.prototype;

    p.initialize = function() {

        // Call the super intialize using agJS.
        // this.BaseClass_initialize();

        // Call the super initialize.
        // BaseClass.prototype.initialize.call(this);

        console.log(this.name);

    };

    

    // Promote using agJS
    // agJS.promote(BaseClass, "BaseClass");

     return BaseClass;

});
