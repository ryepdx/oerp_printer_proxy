openerp.printer_proxy = function (instance) {
    instance.printer_proxy = {};
    instance.printer_proxy.Printer  = instance.web.Class.extend({
        init: function(options){
            options = options || {};

            this.name = options.name || 'zebra_python_unittest';
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

        // Convenience function for sending commands to the local printer.
        print: function (format, data) {
            // I prefer the "print" verb, but Python won't allow it. So we use 'output' on the Python side.
            return this.message("output", {"printer_name": this.name, "data": data, "format": format});
        }
    });

    // Client actions
    instance.printer_proxy.print = function (parent, action) {
        var printer = new instance.printer_proxy.Printer({'name': action.params.printer_name});
        printer.print(action.params.format, action.params.data);
    }
    instance.web.client_actions.add('printer_proxy.print', "instance.printer_proxy.print");
};
