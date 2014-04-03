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
    def print_epl(self, request, printer_name='zebra_python_unittest', data=[], raw=False, test=False):
        printer = zebra(printer_name)
        printer.setup(direct_thermal=True)

        for datum in data:
            if not raw:
                datum = base64.b64decode(datum)
            printer.output(datum)

        return {'success': True}