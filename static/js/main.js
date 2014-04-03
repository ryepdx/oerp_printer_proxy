openerp.printer_proxy = function (instance) {
    instance.printer_proxy = {};
    instance.printer_proxy.Printer  = instance.web.Class.extend({
        init: function(options){
            options = options || {};

            this.connection = new instance.web.JsonRPC();
            this.connection.setup(options.url || 'http://localhost:8069');
            this.notifications = {};
        },

        // Makes a JSON-RPC call to the local OpenERP server.
        message : function(name,params){
            var ret = new $.Deferred();
            var callbacks = this.notifications[name] || [];
            for(var i = 0; i < callbacks.length; i++){
                callbacks[i](params);
            }

            this.connection.rpc('/printer_proxy/' + name, params || {}).done(function(result) {
                ret.resolve(result);
            }).fail(function(error) {
                ret.reject(error);
            });
            return ret;
        },

        // Allows triggers to be set for when particular JSON-RPC function calls are made via 'message.'
        add_notification: function(name, callback){
            if(!this.notifications[name]){
                this.notifications[name] = [];
            }
            this.notifications[name].push(callback);
        },

        // Convenience function for sending EPL commands to the local printer.
        print_epl: function (data) {
            return this.message("print_epl", {"data": data});
        }
    });
};