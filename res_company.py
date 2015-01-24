# -*- coding: utf-8 -*-
##############################################################################
#
#    OpenERP, Open Source Management Solution
#    Copyright (C) 2011 NovaPoint Group LLC (<http://www.novapointgroup.com>)
#    Copyright (C) 2004-2010 OpenERP SA (<http://www.openerp.com>)
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>
#
##############################################################################

from openerp.osv import fields, osv
from pyjsonrpc import HttpClient

class res_company(osv.osv):
    _inherit = "res.company"
    
    _columns = {
        'printer_proxy_url': fields.char('URL', size=255),
        'printer_proxy_username': fields.char('Username', size=255),
        'printer_proxy_password': fields.char('Password', size=255),
        'printer_proxy_device_name': fields.char('Printer Name', size=255)
    }
    _defaults = {
        "printer_proxy_url": "https://127.0.0.1:8443/api",
        "printer_proxy_device_name": "zebra"
    }

    def print_labels(self, cr, uid, ids, b64_data, data_format="epl2", context=None):
        if not b64_data:
            return False

        for company in self.browse(cr, uid, ids, context=context):
            api = HttpClient(
                url=company.printer_proxy_url,
                username=company.printer_proxy_username,
                password=company.printer_proxy_password
            )

            api.call("output", printer_name=company.printer_proxy_device_name,
                     data=b64_data, format=data_format)

        return True

res_company()

# vim:expandtab:smartindent:tabstop=4:softtabstop=4:shiftwidth=4: