function Parent(name) {
  this.name = name;
}

Parent.prototype.sayname = function() {
  console.log('parent name: ', this.name);
}

function Child(name, parentName) {
  Parent.call(this, parentName);
  this.name = name;
}

Child.prototype.sayname = function() {
  console.log('child name ', this.name);
}

function create(proto) {
  function F(){};
  F.prototype = proto;
  return new F;
}

// 实现继承
Child.prototype = create(Parent.prototype);

var parent = new Parent('father');
var child = new Child('son', 'father');


