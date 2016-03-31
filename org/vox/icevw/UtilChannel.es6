
class UtilChannel{
	constructor(shm){
		shm.addObject(this, "icevwUtil")
		this.shm= shm
	}

	/* Descomprime archivo VCF */
	decompress(filein, dirout){
		return core.VW.VcfUtil.decompressToFolder(filein, dirout)
	}

	static start(){
		var ipc= new core.VW.IPC.Comunication()
		ipc.init()
		var shm= new core.VW.IPC.ShareMethods(ipc)
		var canal= new UtilChannel(shm)
	}

}
export default UtilChannel