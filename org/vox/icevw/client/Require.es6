// $ jQuery. ..

var vox= core.VW.Web.Vox
class Require{
	constructor(){
		this.initEvents()
	}
	start(){
		var self= this
		var form= this.form= $(".modal form")
		form.find("[name]").each(function(){
			this.value= self.arguments[this.name]
		})

		if(self.arguments.enabled){
			self.load()
		}
		$(".modal").voxmodal()[0].open()
		
	}

	async load(){

		$(".modal .load").show();
		$(".modal a").hide();
		var self= this
		var req= new core.VW.Http.Request("/api/load")
		req.body= self.arguments
		req.method='POST'
		try{
			response= await vox.platform.getJsonResponseAsync(req)
		}
		catch(e){
			$(".modal").voxmodal()[0].close();
			window.parent.postMessage(JSON.stringify({
				"type":"icevw.adquireerror",
				"error":e
			}), self.arguments.domain);
			return false
		}

		window.parent.postMessage(JSON.stringify({
			"type":"icevw.adquiredandloaded",
			"data":response
		}), self.arguments.domain);
		return true
	}

	initEvents(){
		this.events= {}
		var self= this
		this.events.permitir= async function(){

			try{
				var req= new core.VW.Http.Request()
				req.form= self.form
				var response= await vox.platform.getJsonResponseAsync(req)
				window.parent.postMessage(JSON.stringify({
					"type":"icevw.adquired",
					"data": response
				}), self.arguments.domain);

				
				await self.load()

				

			}
			catch(e){
				$(".modal").voxmodal()[0].close();
				window.parent.postMessage(JSON.stringify({
					"type":"icevw.adquireerror",
					"error":e
				}), self.arguments.domain);
			}
		}

		this.events.nopermitir= function(){
			$(".modal").voxmodal()[0].close();
			window.parent.postMessage(JSON.stringify({
				"type":"icevw.notauthorized",
				"error":"No fue autorizado para ejecutar ICEVW"
			}), self.arguments.domain);
		}
	}


}

export default Require