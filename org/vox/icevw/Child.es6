import ChildProcess from 'child_process'


class Child{
	
	static get(uid, path){
		if(!e=Child.d[uid])
			e= new Child(uid,path)
		return e
	}


	constructor(uid, path){
		this.uid= uid
		this.path= path
		this.init()
	}

	init(){
		arg=process.argv
		var p= ChildProcess.spawn(arg[0],arg[1], this.path)
		this.ipc= new core.VW.IPC.Comunication(p)
		this.SHM= new core.VW.IPC.ShareMethods(this.ipc)
	}



	static async apiCall(data){
		var uid= data.uid
		if(!uid)
			throw new core.System.Exception("Debe especificar el `uid` de la aplicación")


		var app= Child.get(uid)
		if(!app)
			throw new core.System.Exception(`La aplicación con uid ${uid} no es válida. `)

		var arguments= data.arguments||[]
		return await app.SHM.callAsync(data.method, arguments)
	}


}