import fs from 'fs'
import FileSession from 'vw-session-file-store'
import Sesion from 'express-session'
FileStore= FileSession(Sesion)

export default function(path){
	var sesion= Sesion({
		store: new FileStore({
			"path": path,
			"fallbackSessionFn": (sesionid)=>{
				arg={
					"cookie":{maxAge: 6000000000}
				}
				fs.writeFileSync(path+`/${sesionid}.json`, JSON.stringify(arg))
				return arg
			}
		}),
		secret: '49671234',
		ttl: 6000000000,
		resave:true,
		saveUninitialized: true, 
		cookie:{
			maxAge: 6000000000
		}
	})

	return function(/*RequestArgs */args){
		var task= new core.VW.Task();
		sesion(args.request, args.response, function(){
			task.finish()
		})
		return task
	}
		
}