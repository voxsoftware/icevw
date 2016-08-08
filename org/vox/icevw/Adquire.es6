
// El MD5Hash es necesario para hacer las llamadas...
import md5 from 'md5'
import uniqid from 'uniqid'
import fs from 'fs'
import Path from 'path'
import Registry from 'npm-registry'
//import decompress from 'decompress-zip'
import Child from './Child'

class Adquire{
	
	constructor(App){
		this.app= App
		this.appPath= Path.join(this.app.configurationPath, "apps")
		if(!fs.existsSync(this.appPath))
			fs.mkdirSync(this.appPath)

	}

	getDetails(npm,module){
		var task= new core.VW.Task()
		npm.packages.details(module, function(err,data){
			task.result= data
			if(err)
				task.exception= err

			task.finish()
		})

		return task
	}

	getNumberVersion(ver){
		var vers= ver.split(".")
		var num= (vers[0]|0)* 100000000
		num+= (vers[1]|0)*10000
		num+= (vers[2]|0)

		return num

	}
	
	removeDir(path){
	    var files = [], self=this
	    if( fs.existsSync(path) ) {
	        files = fs.readdirSync(path)
	        files.forEach(function(file,index){
	            var curPath = path + "/" + file
	            if(fs.lstatSync(curPath).isDirectory()) { 
	                self.removeDir(curPath)
	            } else { 
	                fs.unlinkSync(curPath)
	            }
	        })
	        fs.rmdirSync(path)
	    }
	}

	async getModule(app, module){


		var npm= new Registry({}), install, num,num2=-1,result,ins, currentDir
		var name= module.split("@")[0]

		var home= process.env.HOME||process.env.USERPROFILE, icevwExe
		var mod, modulePath = Path.join(home, "node_modules")
		modulePath= Path.join(modulePath, name)
		var packagePath= Path.join(modulePath,"package.json")


		var info,lastVersion, noWeb


		try{
			info= await this.getDetails(npm,module)
			info=info[0]
			lastVersion= info.latest?info.latest.version: info.version
			num2= this.getNumberVersion(lastVersion)

		}
		catch(e){
			noWeb=true
		}

		// Obtener ...
		try{
			mod= require(packagePath)
			num= this.getNumberVersion(mod.version)
			if(num!=num2)
				install= true
		}
		catch(e){
			install= true
		}


		//vw.info(install,noWeb)

		currentDir= process.cwd()
		if(install && !noWeb){
			try{

				if(fs.existsSync(modulePath)){
					fs.renameSync(modulePath, modulePath+".Pold1")
					await this.removeDir(modulePath+".Pold1")
				}


				
				process.chdir(home)
				await core.VW.PackageManager.NpmManager.load()
				result= await core.VW.PackageManager.NpmManager.install({}, module)

				// Buscar el path ...
				for(var i=0;i<result.installed;i++){
					ins=result.installed[i]
					if(ins.module){
						if(ins.module.split("@")[0]==name){
							modulePath= ins.path
						}
					}
				}
			}
			catch(e){
				throw e
			}
			finally{
				process.chdir(currentDir)
			}
		}

		icevwExe= Path.join(modulePath, "icevw.main.json")
		if(fs.existsSync(icevwExe)){
			modulePath= Path.join(modulePath, require(icevwExe).main)
			modulePath= Path.normalize(modulePath)
		}

		vw.info(modulePath)
		return modulePath

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
		vw.info(data)
		
		if(!data.app)
			throw new Error("Debe especificar el id de la aplicación")


		if(!data.url){
			if(!data.module)
				throw new Error("Debe especificar la url de la aplicación")
		}


		if(!data.uid)
			throw new Error("Debe especificar el argumento `uid`")



		var dir
		if(data.module){

			// Revisar si está instalado el módulo 
			dir= await this.getModule(data.app, data.module)

		}

		else if(data.url){
			dir= Path.join(this.appPath, data.app)
			if(!fs.existsSync(dir)){
				await this.download(data.app, data.url)
			}
		}

		 

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
