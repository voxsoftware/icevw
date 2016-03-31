
// El MD5Hash es necesario para hacer las llamadas...
import md5 from 'md5'
import uniqid from 'uniqid'
import fs from 'fs'
import Path from 'path'
//import decompress from 'decompress-zip'
import Child from './Child'

class Adquire{
	
	constructor(App){
		this.app= App
		this.appPath= Path.join(this.app.configurationPath, "apps")
		if(!fs.existsSync(this.appPath))
			fs.mkdirSync(this.appPath)

	}

	
	enable(args){
		
		var req= args.request
		var data= req.method=="GET"? req.query:req.body
		if(!data.domain)
			throw new Error("Debe especificar el dominio")
		if(!data.app)
			throw new Error("Debe especificar el argumento `app`")
		if(!req.session[data.domain])
			req.session[data.domain]={}

		if(req.session[data.domain].md5hash!=data.hash)
			throw new Error("El token de comprobación no es válido")

		req.session[data.domain][data.app]= true
		var resultado= {
			"enabled":true,
			"hash":req.session[data.domain].md5hash
		}
		return resultado
	}
	
	

	download(app, url){

		var c=undefined
		var task= new core.VW.Task()
		vw.info("here")
		try{


			var id=uniqid()
			var tpath= Path.join(this.appPath,`/${id}`)
			var file= Path.join(this.appPath,`/${id}.zip`)
			var rpath= Path.join(this.appPath,`/${app}`)
			task.result= rpath

			c=(er,d)=>{
				if(er){
					try{
						fs.removeSync(tpath)
					}
					catch(e){
					}

					try{
						fs.unlinkSync(file)
					}
					catch(e){
					}

					task.exception= er
					task.finish()
				}
				else{
					try{
						fs.unlinkSync(file)
					}
					catch(e){}

					
					fs.rename(tpath,rpath,(er)=>{
						if(er){
							task.exception= er
							task.finish()
							return
						}
						
						task.finish()
					});
				}
			}

			var req= new core.VW.Http.Request(url)
			req.timeout= 5000
			var task1= req.getResponseAsync()
			req.originalReq.pipe(fs.createWriteStream(file))
			task1.oncomplete= function(){
				if(task1.exception){
					c(task1.exception)
				}
				else{

					var response= task.result
					if(response.statusCode==404){
						c("La url de la aplicación no es válida")
						return 
					}

					// Descomprimir ....
					/*
					unzipper = new decompress(file)
					unzipper.on("error", (er)=>{
						c(er)
					})

					unzipper.on('extract', (log)=>{
						c()
					})
					unzipper.extract({
						"path":tpath
					})
					*/

					// Para Descomprimir ahora se usa vcf, se crea un child_process 
					// para evitar bloqueos ...
					var ipc= new core.VW.IPC.Comunication()
					ipc.createChildProcess()
					var shm= new core.VW.IPC.ShareMethods(ipc)
					var task2= shm.callAsync("icevwUtil.decompress", [file,tpath])
					task2.oncomplete= function(){
						ipc.cp.kill() // Cerrar el proceso 
						if(task2.exception){
							c(task2.exception)
						}else{
							c()
						}
					}
				}
			}
			
			
		}
		catch(e){
			task.exception= exception
			task.finish()
		}
		return task
	}

	// Cargar aplicación ...
	async load(data){
		
		
		if(!data.app)
			throw new Error("Debe especificar el id de la aplicación")
		if(!data.url)
			throw new Error("Debe especificar la url de la aplicación")
		if(!data.uid)
			throw new Error("Debe especificar el argumento `uid`")

		var dir= Path.join(this.appPath, data.app)
		if(!fs.existsSync(dir))
			await this.download(data.app, data.url)

		var child= Child.get(data.uid, dir, this.app.log)
		await child.init()
	}

	enabled(args){
		
		var req= args.request
		var res= args.response
		var data= req.method=="GET" ? req.query : req.body
		
		if(!data.domain){
			throw new Error("Debe especificar el dominio")
		}
		if(!req.session[data.domain])
			req.session[data.domain]={}
		
		hash=req.session[data.domain].hash= uniqid()
		req.session[data.domain].md5hash= md5(hash)
	}
}

export default Adquire
