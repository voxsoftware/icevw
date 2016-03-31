import fs from 'fs'
try{
	fs.writeFileSync("J:\\James", "INIT")
	var ipc= new core.VW.IPC.Comunication()
	ipc.init()
	var shm= new core.VW.IPC.ShareMethods(ipc)
	shm.addMethod(function initialize(){
		// TODO OK ...
		fs.writeFileSync("J:\\James1", "TODO OK")
	})
}
catch(e){
	fs.writeFileSync("J:\\JamesER", JSON.stringify({stack:e.stack,message:e.message}))
}