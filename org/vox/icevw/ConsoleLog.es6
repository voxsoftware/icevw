
class Log{
	init(){
		//core.VW.Console.writeLine()
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

	printError(ex){
		core.VW.Console.foregroundColor= core.System.ConsoleColor.White
		core.VW.Console.backgroundColor= core.System.ConsoleColor.Red
		core.VW.Console.write("ERROR")
		core.VW.Console.resetColors()
		core.VW.Console.write("", ex.message +" | " +ex.stack).writeLine()	
		//if(ex.errors){
			core.VW.Console.write("---------- Información extra")
			for(var id in ex){
				if(id!="stack" && id!='message'){
					core.VW.Console.coloredWriteLine(id,": ", ex[id])
				}
			}
		//}		
	}

}

export default Log