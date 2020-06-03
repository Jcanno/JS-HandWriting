/**
 * 手写bind函数
 * 通过闭包返回一个函数
 * 
 */
Function.prototype.bind = function (context, ...args) {
	// 异常处理
	if (typeof this !== "function") {
		throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
	}
	var self = this;
	var fbound = function () {
		self.apply(this instanceof self ? 
			this : 
			context, args.concat(Array.prototype.slice.call(arguments)));
	}

	return fbound;
}