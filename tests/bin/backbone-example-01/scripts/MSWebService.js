this.themags = this.themags|| {};


(function($) {

    "use strict";

    var apiConfig = {
        url: "http://meemake.meyermillersmith.net",
        name: null,
        key: {
            name: "meemake",
            approved: "33b9658cbf0943ee6425f262e48fb814",
            all: "33b9658cbf0943ee6425f262e48fb814"
        },

        defaultKey: "all"


    };

    var securityToken = null;
    var serviceURL = null;
    var filesURL = null;
    var thumbsURL = null;

    var getData = function(requestURL, data, type) {
        if (!type) {
            type = "GET";
        }
        return $.ajax({
            type: type,
            dataType: "json",
            data: data,
            url: requestURL
        });
    };


    function WebService(callbackScope) {

        if (!filesURL) {
            if (apiConfig.name) {
                filesURL = apiConfig.url + "/" + apiConfig.name + "/public/files/";
            } else {
                filesURL = apiConfig.url + "/public/files/";
            }
        }

        if (!thumbsURL) {
            if (apiConfig.name) {
                thumbsURL = apiConfig.url + "/" + apiConfig.name + "/public/files/";
            } else {
                thumbsURL = apiConfig.url + "/public/files/";
            }
        }

        this._callback = null;
        this._callbackScope = callbackScope;
        this._internalCallback = null;
        this._internalCallbackArgs = null;
        this._paramsTransporter = null;

    }


    // static

    //------------------
    // Atomic Legacy
    //------------------
    WebService.SKI = "ski";
    WebService.FIND_ALL_DESIGNS_BY_MODEL = "find_all_designs_by_model";
    //
    WebService.LANGUAGE = "en";
    // API SERVICES NAMES
    WebService.CONNECT = "connect";
    WebService.USERS = "users";
    WebService.SURFACES = "surfaces";
    WebService.TOOLS = "tools";
    WebService.PRODUCTS = "products";
    WebService.NEWS = "news";
    // API SERVICES ACTIONS
    WebService.FIND = "find";
    WebService.FIND_ALL = "find_all";
    WebService.FIND_ALL_COLLECTION_CATEGORIES = "find_all_collection_categories";
    WebService.FIND_ALL_COLLECTIONS = "find_all_collections";
    WebService.LOGIN = "login";
    WebService.CREATE = "create";
    WebService.DELETE_USER = "delete_user";
    WebService.UPDATE = "update";
    WebService.ORDER = "order";
    WebService.UPDATE_ORDER = "update_order";
    WebService.ORDER_ITEMS = "order_items";
    WebService.ORDER_ITEM = "order_item";
    WebService.SAVE_GALLERY = "save_gallery";
    WebService.FIND_GALLERIES = "find_galleries";
    WebService.SAVE_GALLERY_IMAGE = "save_gallery_image";
    // THUMB API
    WebService.THUMBS = "thumbs";
    WebService.THUMBS_CROP = "crop";
    WebService.THUMBS_FIT = "fit";
    WebService.THUMBS_SCALE = "scale";
    WebService.THUMBS_PAD = "pad";
    WebService.THUMBS_CIRCLE_MASK = "circle_mask";

    WebService.ERROR = "ERROR";
    WebService.COMPLETE = "COMPLETE";
    WebService.START = "START";


    var p = WebService.prototype;


    p.getSecurityToken = function() {
        return securityToken;
    };

    p.setSecurityToken = function(value) {
        securityToken = value;
        this._setServiceURL();

    };


    p.getData = function(callback, serviceName, serviceAction, params, noCache) {

        this._callback = callback;
        this._paramsTransporter = params;

        if (!securityToken) {

            if (!this._checkForSecurityToken(this.getData, [callback, serviceName, serviceAction, params, noCache])) {
                return;
            }
        }

        this._clearInternalCallback();

        if (!this._paramsTransporter) {
            this._paramsTransporter = {};
        }

        this._serviceName = serviceName;
        this._serviceAction = serviceAction;

        switch (this._serviceAction) {
            case WebService.FIND_ALL:
            case WebService.FIND_ALL_COLLECTION_CATEGORIES:
            case WebService.FIND_GALLERIES:
                // Atomic Legacy
            case WebService.FIND_ALL_DESIGNS_BY_MODEL:
                // Get All withouth pagination
                this._paramsTransporter.per_page = 1000;
                break;
            default:
        }

        if (noCache) {
            this._paramsTransporter._v = Number((new Date()).getTime());
        }

        this._requestURL = serviceURL + "/" + this._serviceName + "/" + this._serviceAction;

        var that = this;

        getData(this._requestURL, this._paramsTransporter).done(function(data) {
            that._getDataComplete(data);
        }).fail(function(data) {
            that._dataLoaderError(data);
        });

    };

    p._getDataComplete = function(response) {

        if (response) {
            this._executeCallback(WebService.COMPLETE, response);
            return;

        }

        this.dataLoaderError();
    };


    p._setServiceURL = function() {
        if (serviceURL) {
            return true;
        }
        if (securityToken) {
            if (apiConfig.name) {
                serviceURL = apiConfig.url + "/" + apiConfig.name + "/" + WebService.LANGUAGE + "/" + apiConfig.key.name + "/" + securityToken;
            } else {
                serviceURL = apiConfig.url + "/" + WebService.LANGUAGE + "/" + apiConfig.key.name + "/" + securityToken;
            }
        }
    };



    p._checkForSecurityToken = function(internalCallback, internalCallbackArgs) {
        if (!securityToken) {
            this._internalCallback = internalCallback;
            this._internalCallbackArgs = internalCallbackArgs;
            this._getSecurityToken();
            return false;
        }
        return true;
    };

    p._getSecurityToken = function() {

        this._serviceName = WebService.CONNECT;

        if (apiConfig.defaultKey === "all") {
            if (!apiConfig.name) {
                this._requestURL = apiConfig.url + "/" + this._serviceName + "/" + apiConfig.key.all;
            } else {
                this._requestURL = apiConfig.url + "/" + apiConfig.name + "/" + this._serviceName + "/" + apiConfig.key.all;
            }
        } else {
            if (!apiConfig.name) {
                this._requestURL = apiConfig.url + "/" + this._serviceName + "/" + apiConfig.key.approved;
            } else {
                this._requestURL = apiConfig.url + "/" + apiConfig.namee + "/" + this._serviceName + "/" + apiConfig.key.approved;
            }
        }

        var that = this;

        getData(this._requestURL).done(function(data) {
            that._parseSecurityToken(data);
        }).fail(function(data) {
            that._dataLoaderError(data);
        });

    };

    p._parseSecurityToken = function(data) {

        if (data) {
            if (data.security_token) {
                securityToken = data.security_token;
                this._setServiceURL();

                if (this._internalCallback) {
                    this._executeInternalCallback();
                    return;
                }

                this._executeCallback(WebService.COMPLETE, { security_token: securityToken });
                return;
            }

        }

        this.dataLoaderError();
    };

    p._dataLoaderError = function(data) {
        if (data) {
            if (data.responseJSON) {
                this._executeCallback(WebService.ERROR, data.responseJSON);
                return;
            }
        }

        this._executeCallback(WebService.ERROR, null);

    };

    p._executeCallback = function(msg, data) {

        if (this._callbackScope != null) {
            this._callback && this._callback.call(this._callbackScope, msg, data);
        } else {
            this._callback && this._callback.call(this, msg, data);
        }

    };

    p._clearCallback = function() {

        if (this._callbackScope) {
            this._callbackScope = null;

        }
        if (this._callback) {
            this._callback = null;
        }

    };

    p._executeInternalCallback = function() {

        if (!this._internalCallback) {
            return false;
        }
        if (!this._internalCallbackArgs) {
            this._internalCallbackArgs = [];
        }

        this._internalCallback.apply(this, this._internalCallbackArgs);

    };

    p._clearInternalCallback = function() {

        if (this._internalCallback) {
            this._internalCallback = null;
        }
        if (this._internalCallbackArgs) {
            this._internalCallbackArgs = null;
        }

    };


    p.dispose = function() {
        this._clearCallback();
        this._clearInternalCallback();
        if (this._paramsTransporter) {
            this._paramsTransporter = null;
        }
    };


    themags.WebService = WebService;

}(jQuery));
