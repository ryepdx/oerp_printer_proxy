# printer_proxy

An OpenERP module designed to run on both a remote server and a client-side server, allowing the remote OpenERP server to send commands to a printer attached to the client machine via JSON-RPC.

Provides a `printer_proxy.print` client action that takes a `data` parameter, with `data` being a list of base64-encoded EPL2 commands, a `printer_name` parameter, with `printer_name` being a string representing the name of the printer to print with on the client machine, and a `format` parameter, with `format` being a string representing the format/language the printer commands are in. At present, the only value supported for `format` is `"epl2"`.

Right now, only EPL2 Zebra printers are supported, and I don't plan on building that out myself anytime soon. However, I've purposely made this module very easy to vuild on. Just extend the `PrintController` class in `controllers/main.py` and you'll be cooking with gas. (And remember to issue a pull request when you're done!)

## Setup

1. Run [printer_proxy_server](http://github.com/ryepdx/printer_proxy_server) on the machine the printer is connected to.
2. Navigate to "Settings > Companies" and select your company from the list of companies.
3. Click the "Edit" button at the top of your company's settings page.
4. Set the url, username, and password for the printer proxy server under "Printer Proxy Settings" on the "Configuration" tab.
5. Set any user-specific proxy settings on each user's respective "Settings" page. (Useful for when there is more than one printer per company.)
6. Click the red "Save" button at the top of the page.

For an example of how this module might be used by other modules, take a look at [Quickship](http://github.com/ryepdx/quickship). Quickship uses this module, [scale_proxy](http://github.com/ryepdx/scale_proxy), [shipping_api_fedex](https://github.com/ryepdx/shipping_api_fedex), [shipping_api_ups](https://github.com/ryepdx/shipping_api_ups), and [shipping_api_usps](https://github.com/ryepdx/shipping_api_usps) to provide a shipping kiosk suitable for use in a warehouse environment. Using Quickship, shippers can put a package on a scale, scan the barcode on the sale order's picking sheet, key in a few fields, select a shipping quote from the list that comes back, and have the printer at their station spit out a label.
