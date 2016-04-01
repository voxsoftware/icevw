
class Log{
	init(){
		//core.VW.Console.writeLine()
		process.stdout.setEncoding('utf8')
		process.stdout.on('error', function(err){})
	}
	printRequest(args){
		core.VW.Console.foregroundColor= core.System.ConsoleColor.White
		core.VW.Console.backgroundColor= core.System.ConsoleColor.Blue
		core.VW.Console.write("",args.request.method,"")
		core.VW.Console.resetColors()
		core.VW.Console.write(" ")
		core.VW.Console.backgroundColor= core.System.ConsoleColor.Yellow
		core.VW.Console.foregroundColor= core.System.ConsoleColor.Black
		core.VW.Console.write(" PID", process.pid,"")
		core.VW.Console.resetColors()
		core.VW.Console.write("", args.request.url).writeLine()
	}

	printInfo(title, msg){
		if(title){
			core.VW.Console.foregroundColor= core.System.ConsoleColor.White
			core.VW.Console.backgroundColor= core.System.ConsoleColor.Blue
			core.VW.Console.write("",title,"")
			core.VW.Console.resetColors()
			core.VW.Console.write(" ")
		}
		
		core.VW.Console.foregroundColor= core.System.ConsoleColor.Yellow
		core.VW.Console.writeLine(msg,"")
		core.VW.Console.resetColors()
	}

	printError(ex){
		core.VW.Console.foregroundColor= core.System.ConsoleColor.White
		core.VW.Console.backgroundColor= core.System.ConsoleColor.Red
		core.VW.Console.write("ERROR")
		core.VW.Console.resetColors()
		core.VW.Console.writeLine("", ex.message +" | " +ex.stack)
		//if(ex.errors){
			core.VW.Console.writeLine("---------- Información extra")
			for(var id in ex){
				if(id!="stack" && id!='message'){
					core.VW.Console.writeLine(id,": ", ex[id])
				}
			}
		//}		
	}

}

export default Log