var icevw=core.org.vox.icevw
import Path from 'path'
import Log from './ConsoleLog'
import fs from 'fs'
import Router from "./routes/Router"
import sesion from './session'
import JsonResponse from './JsonResponse'
class App{

	constructor({port}){
		App.current= this	
		this.path= Path.normalize(__dirname + "/server/")
		this.viewpath= Path.join(this.path, "views")
		this.port= 49671
		this.alive= true
		this.init()
		this.log= new Log()
		
	}


	init(){
		this.initConfig()
		this.server= new core.VW.E6Html.Http.Server()
		this.views= this.server.viewManager(this.viewpath)
		this.server.timeout= 30000
		this.server.port= this.port
		this.server.path= this.path
	}


	initConfig(){

		
		this.configurationPath= Path.join((process.env.HOME || process.env.USERPROFILE), ".icevw")
		if(!fs.existsSync(this.configurationPath))		
			fs.mkdirSync(this.configurationPath)

		/*
		this.configurationFile= Path.join(this.configurationPath, "config.js")
		// La configuración se guarda en el directorio ~/.vox-populi/config.js
		if(!fs.existsSync(this.configurationFile))
			fs.writeFileSync(this.configurationFile, fs.readFileSync(Path.normalize(__dirname + "/config/config.js")))


		this.configuration= require(this.configurationFile)
		*/
		 

	}


	async accept(){
		this.log.init()
		while(this.alive){
			var args= await this.server.acceptAsync()
			this.procesar(args)
		}
	}

	async procesar(args){
		try{

			this.log.printRequest(args)
			args.App= this
			await args.catch(args.continue)

		}catch(e){
			try{
				args.response.statusCode=500
				var json= new JsonResponse(args)
				try{json.write(e)}catch(ex){}
				args.response.end()
			}
			catch(ex){}			
			this.log.printError(e)

		}
	}


	async prepareServer(){
		this.session= this.getSession()
		new Router(this)
		this.adquire= new icevw.Adquire(this)
	}

	getSession(){
		this.sessionPath= Path.join(this.configurationPath, "sessions")
		if(!fs.existsSync(this.sessionPath))		
			fs.mkdirSync(this.sessionPath)
		return sesion(this.sessionPath)
	}

	async start(){
		try{
			await this.server.listen()
			vw.info(`ICEVW ha sido iniciado en el puerto ${this.server.port}`)
			await this.prepareServer()
			this.accept()
		}
		catch(er){
			this.log.printError(er)
		}
	}
}

export default App