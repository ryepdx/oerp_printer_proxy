openerp.testing.section('printing sanity check', function (test){
    test('make sure print doesn\'t fail', {rpc: 'rpc', asserts: 1}, function (instance) {
        var ret = new $.Deferred();
        var connection = new instance.web.JsonRPC();
        connection.setup('http://localhost:8069');

        connection.rpc('/printer_proxy/output', {data:["test"], format:'epl2', raw: true}).done(function(result) {
            ok(result.success, "server returned without error")
            ret.resolve(result);
        }).fail(function(error) {
            console.log(error);
            ok(false, "server threw error")
            ret.reject(error);
        });
        return ret;
    });
})
