
var icevw=core.org.vox.icevw
import JsonResponse from "../JsonResponse"
import Child from '../Child'

export default function(Router){
	var app= Router.app


	Router.router.all('/api/version', (args)=>{
		var json= new JsonResponse(args)
		json.write(icevw.version)	
	})

	Router.router.all('/api/load', async (args)=>{
		var req= args.request
		args.response.setTimeout(80000) // 1 minuto tiempo de espera ...
		var data= req.method=="GET" ? req.query : req.body
		await app.adquire.load(data)
		var json= new JsonResponse(args)
		json.write(true)	
	})


	Router.router.all('/api/enable', async (args)=>{
		await app.session(args)
		await app.adquire.enable(args)
		var json= new JsonResponse(args)
		json.write(true)	
	})

	Router.router.all('/api/enabled', async (args)=>{
		await app.session(args)
		await app.adquire.enabled(args)
		var json= new JsonResponse(args)
		json.write(true)	
	})

	Router.router.all('/api/call', async (args)=>{
		var req= args.request
		var data= req.method=="GET" ? req.query : req.body
		if(typeof data.arguments=="string")
			data.arguments= JSON.parse(data.arguments)
		var resultado= await Child.apiCall(data)
		var json= new JsonResponse(args)
		json.write(resultado)	
	})

	


}