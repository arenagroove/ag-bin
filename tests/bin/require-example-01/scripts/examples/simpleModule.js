define(["jquery"], function($) {
    var returnedModule = function() {

        var private = 'private';

        this.$el=$("p");

        this.initialize = function() {

            console.log("SimpleModule");
            this.$el.html("This is my New Text");
            console.log(this.$el);


        }
    };

    return new returnedModule;

});
