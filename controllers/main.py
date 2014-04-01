# -*- coding: utf-8 -*-
import logging
import simplejson
import os
import openerp
from ..helpers.zebra import zebra

class PrintController(openerp.addons.web.http.Controller):
    _cp_path = '/epl_proxy'

    @openerp.addons.web.http.jsonrequest
    def print_epl(self, request, printer_name='zebra_python_unittest', data=u"", test=False):
        printer = zebra(printer_name)
        printer.setup(direct_thermal=True)
        printer.output(data)

        return {'success': True}