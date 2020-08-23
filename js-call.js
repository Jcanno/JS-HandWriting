/**
 * 手写call函数
 * 
 */
Function.prototype.mycall = function(context) {
	var context = context || window;
	context.fn = this;

	var args = [];
	for(var i = 0;i < arguments.length;i++) {
		args.push('arguments[' + i + ']');
	}
	var result = eval('context.fn(' + args + ')');

	delete context.fn;
	return result;
}