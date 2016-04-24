this.app = this.app || {};

(function(store, themags) {
    'use strict';

    var storeKey = "ms_test01";
    var storeKeyExp = (86400 * 1000);


    var _appManager = {

        initialize: function() {

            this.webService = new themags.WebService(this);

            console.log("initialize appManager");

        },

        storeWithExpiration: {
            set: function(key, val, exp) {
                store.set(key, { val: val, exp: exp, time: new Date().getTime() })
            },
            get: function(key) {
                var info = store.get(key)
                if (!info) {
                    return null;
                }
                if (new Date().getTime() - info.time > info.exp) {
                    return null;
                }
                return info.val;
            }
        },

        getStoreSecurityToken: function() {
            return this.storeWithExpiration.get(storeKey);

        },

        storeSecurityToken: function() {
            var securityToken = this.storeWithExpiration.get(storeKey);
            if (!securityToken && this.webService) {

                this.storeWithExpiration.set(storeKey, this.webService.getSecurityToken(), storeKeyExp);

            }
        },

        run: function() {

            var params = {
                model_id: "56c46927de126678534415",
                is_active: 1,
                show_parents_and_childs: 1

            }

            this.webService.setSecurityToken(this.getStoreSecurityToken());
            this.webService.getData(this.testCallback, themags.WebService.SKI, themags.WebService.FIND_ALL_DESIGNS_BY_MODEL, params, true);

        },

        testCallback: function(msg, data) {


            switch (msg) {
                case themags.WebService.COMPLETE:
                    this.storeSecurityToken();
                    console.log(msg, data);

                    break;
                case themags.WebService.ERROR:
                default:
            }
        }

    }

    app = _appManager;
}(store, themags));
