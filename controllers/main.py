# -*- coding: utf-8 -*-
import logging
import simplejson
import os
import base64
import openerp
from ..helpers.zebra import zebra

class PrintController(openerp.addons.web.http.Controller):
    _cp_path = '/printer_proxy'

    @openerp.addons.web.http.jsonrequest
    def output(self, request, format="epl2", **kwargs):
        '''Print the passed-in data. Corresponds to "printer_proxy.print"'''

        if format.lower() == "epl2":
            return self.output_epl2(request, **kwargs)
        return {'success': False, 'error': "Format '%s' not recognized" % format}


    def output_epl2(self, request, printer_name='zebra_python_unittest', data=[], raw=False, test=False):
        '''Print the passed-in EPL2 data.'''

        printer = zebra(printer_name)
        printer.setup(direct_thermal=True)

        for datum in data:
            if not raw:
                datum = base64.b64decode(datum)
            printer.output(datum)

        return {'success': True}
