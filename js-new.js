/**
 *  手写new
 *  1.新建一个对象
 *  2.改变这个对象的原型对象
 *  3.实现原构造函数 
 */
function New(ctor, ...args) {
	if(typeof ctor !== 'function'){
		throw 'newOperator function the first param must be a function';
	}
	let obj = Object.create(ctor.prototype);
	let res = ctor.apply(obj, args);
	
	let isObject = typeof res === 'object' && res !== null;
	let isFunction = typeof res === 'function';
	return isObject || isFunction ? res : obj;
}