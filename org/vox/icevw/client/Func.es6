class Func{
	constructor(icevw,name,prefix){
		this.icevw= icevw
		this.name= name
		this.prefix= prefix||""
	}

	get invoke(){
		if(this.$func)
			return this.$func
		var self=this
		var icevw= this.icevw
		return this.$func= function(){
			var args= Array.prototype.slice.call(arguments, 0, arguments.length)
			return icevw.apiCall(self.prefix+ self.name, args)
		}
	}

}
export default Func