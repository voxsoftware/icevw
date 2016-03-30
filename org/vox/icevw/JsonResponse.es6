import safejson from "./safe-json.js"
class JsonResponse{

	constructor(args){
		this.response= args.response;
		this.request= args.request;
	}

	write(data){

		
		var isError;
		if(data===undefined || data===null){
			data= "null";
		}
		else{

			if(data instanceof Error || data instanceof core.System.Exception){
				isError= true;
				let keys=[], r={};
				for(var id in data){
					keys.push(id);
				}
				if(keys.indexOf("message")<0){
					keys.push("message");
				}
				if(keys.indexOf("stack")<0){
					keys.push("stack");
				}
				for(var id of keys){
					r[id]= data[id];
				}
				data= safejson(r)
			}
			else{
				data= safejson(data)
			}
		}

		try{

			// Escribir el encabezado
			this.response.writeHead(200,{
				"Content-type": "application/json"
			});

		}catch(e){}

		this.response.write(data);
		this.response.end();

	}
}

export default JsonResponse;