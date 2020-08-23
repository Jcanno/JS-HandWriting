/**
 * 手写bind函数
 * 通过闭包返回一个函数
 * 
 */
Function.prototype.mybind = function (context) {

	if (typeof this !== "function") {
		throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
	}

	var self = this;
	var args = Array.prototype.slice.call(arguments, 1);

	var fNOP = function () {};

	var fBound = function () {
		var bindArgs = Array.prototype.slice.call(arguments);
		return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
	}

	fNOP.prototype = this.prototype;
	fBound.prototype = new fNOP();
	return fBound;
}
