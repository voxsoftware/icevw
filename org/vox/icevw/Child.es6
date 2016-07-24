import ChildProcess from 'child_process'
import ChildClosedException from './ChildClosedException'

class Child{
	
	static get(uid, path, Log){
		var e
		if(!(e=Child.d[uid])){
			e= new Child(uid,path, Log)
			Child.d[uid]=e
		}
		return e
	}


	constructor(uid, path, Log){
		this.uid= uid
		this.path= path
		this.log= Log
	}

	async init(){
		arg=process.argv
		
		var p= ChildProcess.spawn(arg[0],[arg[1], this.path])
		this.ipc= new core.VW.IPC.Comunication()
		this.ipc.init(p)
		this.$SHM= new core.VW.IPC.ShareMethods(this.ipc)
		/*
		p.stderr.on("data", function(b){
			vw.info("INFO",b.toString())
		})

		p.stdout.on("data", function(b){
			vw.info("INFO", b.toString())
		})
		*/
		p.on('exit', ()=>{
			this.exited= true
			this.log.printInfo("Child", "Proceso hijo finalizado: " + p.pid)
			if(this.$time){
				clearTimeout(this.$time)
				this.$time=null
			}
		})
		await this.SHM.callAsync("initialize")

		if(this.log)
			this.log.printInfo("Child", "Nuevo proceso hijo: " + p.pid)

		this.$time=setInterval(()=>{
			if(this.$active)
				this.$active= false
			else
				p.kill()
		}, 60000)
	}


	get SHM(){
		if(this.exited)
			throw new ChildClosedException(`El canal de comunicación icevw \`${this.uid}\` está cerrado.`)

		this.$active= true
		return this.$SHM
	}


	static async apiCall(data){
		var uid= data.uid, app
		if(!uid)
			throw new core.System.Exception("Debe especificar el `uid` de la aplicación")


		app= Child.get(uid)
		if(!app)
			throw new core.System.Exception(`La aplicación con uid ${uid} no es válida. `)
		if(data.method=="??"){
			app.$active=true
			return
		}
		var args= data.arguments||[]
		return await app.SHM.callAsync(data.method, args)
		
	}


}
Child.d=[]
export default Child