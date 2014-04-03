printer_proxy
==============

An OpenERP module designed to run on both a remote server and a client-side server, allowing the remote OpenERP server to send commands to a printer attached to the client machine via JSON-RPC.

Provides a `printer_proxy.print` client action that takes a `data` parameter, with `data` being a list of base64-encoded EPL2 commands, a `printer_name` parameter, with `printer_name` being a string representing the name of the printer to print with on the client machine, and a `format` parameter, with `format` being a string representing the format/language the printer commands are in. At present, the only value supported for `format` is `"epl2"`.

Right now, only EPL2 Zebra printers are supported, and I don't plan on building that out myself anytime soon. However, I've purposely made this module very easy to vuild on. Just extend the `PrintController` class in `controllers/main.py` and you'll be cooking with gas. (And remember to issue a pull request when you're done!)
