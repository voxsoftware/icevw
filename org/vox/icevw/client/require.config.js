// Configuración de compilación módulo require 
var Path= require("path")
var minimal= core.VW.Web.Compiler.minimal
module.exports = {
	name: "default",
    entry:  Path.normalize(__dirname + "/require.web.js"),
    output: {
        path: Path.normalize(__dirname + "/../server/assets"),
        filename: minimal?"js/require.min.js": "js/require.js"
    }
}
