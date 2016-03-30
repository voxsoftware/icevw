
// El MD5Hash es necesario para hacer las llamadas...
import md5 from 'md5'
import uniqid from 'uniqid'
import fs from 'fs'
import Path from 'path'
import decompress from 'decompress-zip'

class Adquire{
	
	constructor(App){
		this.app= App
		this.appPath= Path.join(this.app.configurationPath, "apps")
		if(!fs.existsSync(dir))
			fs.mkdirSync(dir)

	}

	/*
	enable(req,res,callback){
		try
			data=if req.method=="GET" then req.query else req.body
			if not data.domain
				throw new Error("Debe especificar el dominio")
			if not req.session[data.domain]
				req.session[data.domain]={}
			if req.session[data.domain].md5hash!=data.hash
				throw new Error("El token de comprobación no es válido")

			req.session[data.domain].enabled= true
			callback undefined,
				"enabled":true,
				"hash":req.session[data.domain].md5hash
		catch e
			return callback e
	}
	*/
	

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

					
					fs.move(tpath,rpath,(er)=>{
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
			req.timeoout= 60000
			var task1= req.getResponseAsync()
			req.originalReq.pipe(fs.createWriteStream(file))
			task1.oncomplete= function(){
				if(task1.exception){
					task.exception= task1.exception
					return task.finish()
				}
				else{

					var response= task.result
					if(response.statusCode==404){
						task.exception= "La url de la aplicación no es válida"
						task.finish()
						return 
					}

					// Descomprimir ....
					unzipper = new decompress(file)
					unzipper.on("error", (er)=>{
						task.exception= er
						task.finish()
					})

					unzipper.on('extract', (log)=>{
						task.finish()
					})
					unzipper.extract({
						"path":tpath
					})
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
			throw new Error "Debe especificar el id de la aplicación"
		if(!data.url)
			throw new Error "Debe especificar la url de la aplicación"
		if(!data.uid)
			throw new Error "El API no es compatible. Debe especificar un id alfanúmerico"

		var dir= Path.join(this.appPath, data.app)
		if(!fs.existsSync(dir))
			await this.download(data.app, data.url)

		var child= Child.get(data.uid, dir)
		await child.init()
	}

	static enabled(args,callback){
		
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
