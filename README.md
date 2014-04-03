printer_proxy
==============

An OpenERP module designed to run on both a remote server and a client-side server, allowing the remote OpenERP server to send commands to a printer attached to the client machine via JSON-RPC.

Provides a `printer_proxy.print_epl` client action that takes a `data` parameter, with `data` being a list of base64-encoded EPL2 commands, and a `printer_name` parameter, with `printer_name` being a string representing the name of the printer to print with on the client machine.

Currently only EPL2 Zebra printers are supported, and I don't plan on building that out myself anytime soon. I built this to satisfy a very specifc use-case for a client of mine. However, you are welcome to add support for whatever printers you like and issue a pull request.
