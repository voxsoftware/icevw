import App from './App'

var retry= 4, init,app
init= async function() {

	while(retry>0){
		try{
			app= new App({})
			await app.start(true)
			retry=-1
		}
		catch(e){
			retry--
			if(retry<=0)
				throw e


			await core.VW.Task.sleep(3000)
		}
	}


}

init()