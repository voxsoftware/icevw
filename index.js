var Module= new core.VW.Module(__dirname)
Module.loadConfigFile("core-modules.json")
Module.import()
core.org.vox.icevw.version= require("./package.json").version
var icevw= module.exports= core.org.vox.icevw
