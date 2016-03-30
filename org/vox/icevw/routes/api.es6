
var icevw=core.org.vox.icevw
import JsonResponse from "../JsonResponse"


export default function(Router){
	var app= Router.app


	Router.router.all('/api/version', (args)=>{
		var json= new JsonResponse(args)
		json.write(icevw.version)	
	})

	Router.router.all('/api/load', async (args)=>{
		var req= args.request
		var data= req.method=="GET" ? req.query : req.body
		await app.adquire.load(data)
		var json= new JsonResponse(args)
		json.write(true)	
	})

	


}