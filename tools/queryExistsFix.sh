#!/bin/sh

# This script fixes the queryExists error in the latest version of whatsapp-web.js
# replace "window.Store.QueryExist = window.mR.findModule('queryExists')[0].queryExists;" to 
# "window.Store.QueryExist = window.mR.findModule('queryExists')[0] ? window.mR.findModule('queryExists')[0].queryExists : window.mR.findModule('queryExist')[0].queryWidExists;"
# in node_modules/whatsapp-web.js/src/util/Injected.js

echo "Fixing queryExists in node_modules/whatsapp-web.js/src/util/Injected.js"
sed -i 's/window.Store.QueryExist = window.mR.findModule('"'"'queryExists'"'"')[0].queryExists;/window.Store.QueryExist = window.mR.findModule('"'"'queryExists'"'"')[0] ? window.mR.findModule('"'"'queryExists'"'"')[0].queryExists : window.mR.findModule('"'"'queryExist'"'"')[0].queryWidExists;/g' node_modules/whatsapp-web.js/src/util/Injected.js
echo "Done"