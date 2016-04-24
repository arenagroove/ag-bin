define(["backbone"], function(Backbone) {

    DesignTypeCollection = Backbone.Collections.extend({
        model: DesignType

    });

    return DesignTypeCollection;

});
