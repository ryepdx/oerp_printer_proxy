# -*- coding: utf-8 -*-
from openerp.osv import fields, osv

class res_users(osv.osv):
    _inherit = "res.users"
    _columns = {
        'printer_proxy_url': fields.char('URL', size=255),
        'printer_proxy_username': fields.char('Username', size=255),
        'printer_proxy_password': fields.char('Password', size=255),
        'printer_proxy_device_name': fields.char('Printer Name', size=255)
    }

    def get_printer_proxy_settings(self, cr, uid, *args, **kwargs):
        user = self.browse(cr, uid, uid)

        return {
            'url': user.printer_proxy_url or user.company_id.printer_proxy_url,
            'username': user.printer_proxy_username or user.company_id.printer_proxy_username,
            'password': user.printer_proxy_password or user.company_id.printer_proxy_password,
            'name': user.printer_proxy_device_name or user.company_id.printer_proxy_device_name
        }

res_users()