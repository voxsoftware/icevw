class Func{
	constructor(icevw){
		this.icevw= icevw
	}

	get invoke(){
		if(this.$func)
			return this.$func
		var self=this
		var icevw= this.icevw
		return this.$func= function(){
			var args= Array.prototype.slice.call(arguments, 0, arguments.length)
			return icevw.apiCall(self.name, args)
		}
	}

}
export default Func