require("../index")

var icevw= core.org.vox.icevw
if(core.VW.IPC.Comunication.isCluster){
	icevw.UtilChannel.start()
}
else{
	require("./org/vox/icevw/init")
}