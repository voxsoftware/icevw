
var icevw=core.org.vox.icevw
import JsonResponse from "../JsonResponse"

class Router{
	constructor(app){
		this.app= app
		this.server= app.server
		this.router= this.server.router
		this.init()
	}

	init(){
		var app= this.app
		this.router.use('', function(args){
			var res= args.response
			res.setHeader("Access-Control-Allow-Origin", "*")
			res.setHeader("Allow-Access-Control-Credentials", true)
			args.continue()
		})	

		this.router.all('/test', async (args)=>{
			await app.session(args)
			var json= new JsonResponse(args)
			json.write(args.request.session)
		})

		

		this.router.all("/require", async (args)=>{
			var req= args.request
			var res= args.response
			var data= req.method=="GET"? req.query : req.body

			if(!data.domain){
				res.statusCode= 500
				res.write("Debe especificar el dominio en el API")
				res.end()
				return
			}

			var dominio=data.domain
			if(!req.session[dominio] || !req.session[dominio].md5hash){
				await icevw.Adquire.enabled(args)
				
				data.hash=req.session[dominio].md5hash
				await args.App.views.render("requirir", args, {
					arguments: data
				})
				
			}
			else{
				data.hash=req.session[dominio].md5hash
				await args.App.views.render("requirir", args, {
					arguments: data
				})
			}
		})

	}
}

export default Router