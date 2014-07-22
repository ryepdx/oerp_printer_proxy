openerp.printer_proxy = function (instance) {
    instance.printer_proxy = {};
    instance.printer_proxy.Printer  = instance.web.Class.extend({
        init: function(options){
            options = options || {};

            this.req_id = 1;
            this.name = options.name || 'zebra_python_unittest';
            this.url = (options.url || 'https://localhost:8443/api');
            this.auth = {
                username: "ryan",
                password: "Password1"
            };
            this.notifications = {};
        },

        // Makes a JSON-RPC call to the local OpenERP server.
        message : function(method,params){
            var ret = new $.Deferred();

            var callbacks = this.notifications[name] || [];
            for(var i = 0; i < callbacks.length; i++){
                callbacks[i](params);
            }

            var data = {
                id: this.req_id,
                jsonrpc: "2.0",
                method: method,
                params: params || {}
            }

            jQuery.ajax({
              type: "POST",
              url: this.url,
              dataType: 'json',
              contentType: "application/json",
              async: true,
              headers: {
                "Authorization": "Basic " + btoa(this.auth.username + ":" + this.auth.password)
              },
              data: JSON.stringify(data),
              success: function (response) {
                  ret.resolve(response.result);
              },
              fail: function (response) {
                  ret.reject(response.error);
              }
            });
            this.req_id++;

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
