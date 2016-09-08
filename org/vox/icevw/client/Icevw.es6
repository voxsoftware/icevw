var uniqid= require("uniqid")
var Func= require("./Func.es6").default

var $= core.VW.Web.JQuery
var root={}
var vox= core.VW.Web.Vox

if(typeof window=="object")
	root= window
class Icevw{
	
	
	constructor(){
		this.url= "http://localhost:49671";
		this.uid= uniqid()
		this.Funcs={}
		this.init()
	}

	hab(){
		var self= this
		var task= this.apiCall("??")		
		task.oncomplete= function(){
			if(task.exception){
				console.error("Error al poner la aplicación como activa: ", task.exception)
			}

			setTimeout(function(){
				self.hab()
			}, 15000)
		}


	}

	apiCall(method, args){
		var req= new core.VW.Http.Request(this.url+"/api/call")
		req.method='POST'
		req.body={
			"method": method,
			"uid": this.uid,
			"arguments": JSON.stringify(args||[])
		}
		
		var task= vox.platform.getJsonResponseAsync(req)
		return task
	}

	adquire(args){
		var task= new core.VW.Task()
		var self= this
		var url= args.url||"";
		if(url.substring(0,7)!="http://"&&url.substring(0,8)!="https://"&&url.substring(0,5)!="ws://"){
			url=location.origin + "/"+url
		}
		var spars=[]
		spars.push("domain=" + encodeURIComponent(location.origin))
		spars.push("&")
		spars.push("url=" + encodeURIComponent(url))
		spars.push("&")
		spars.push("uid=" + self.uid)
		spars.push("&")
		spars.push("app=" + args.app)
		
		if(args.module){
			spars.push("&")
			spars.push("module=" + args.module)
		}


		var iframe= self.iframe
		iframe.attr("src",self.url+"/require?"+spars.join(""))
		iframe.css("width","100%")
		iframe.css("height","100%")
		iframe.css("position","fixed")
		iframe.css("top","0")
		iframe.css("left","0")
		iframe.css("z-index","99999")
		iframe.show()
		if(this.callback && this.callback.task){
			var t= this.callback.task
			if(t.executing){
				t.cancel()
			}
		}
		this.callback=function(er,data){
			if(er){
				task.exception= er
			}
			else{
				task.result= data
			}
			task.finish()
		}
		this.callback.task= task
		return task
	}


	func(name){
		var f= this.Funcs
		if(!f[name]){
			f[name]=new Func(this, name)
		}

		return f[name]
	}


	init(){
		this.iframe= $("<iframe>")
		this.iframe.hide()
		this.iframe.css("border","none")
		$("body").append(this.iframe)

		root.addEventListener("message",(event)=>{
			if(event.origin==this.url){
				var data=JSON.parse(event.data);
				if(data.type=="icevw.notauthorized"){
					var er=new core.System.Exception(data.error)
					er.type=data.type
					this.iframe.hide()
					return this.callback(er)
				}
				else if(data.type=="icevw.adquireerror"){
					var er=data.error
					if(!er.message){
						er=new core.System.Exception(er)
					}
					er.type=data.type
					this.iframe.hide()
					return this.callback(er)
				}
				else if(data.type=="icevw.adquiredandloaded"){
					this.iframe.hide()

					this.hab()
					return this.callback(undefined, data.data);
				}
			}
		});

	}

}

export default Icevw