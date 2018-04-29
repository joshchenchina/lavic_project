const class2type = {};
// Save a reference to some core methods
const

	core_toString = class2type.toString;

// Populate the class2type map
("Boolean Number String Function Array Date RegExp Object Error".split(" ")).forEach(function (name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function getType( obj ) {
	if ( obj == null ) {
		return String( obj );
	}
	// Support: Safari <= 5.1 (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ core_toString.call(obj) ] || "object" :
		typeof obj;
}

export {
	getType
}
