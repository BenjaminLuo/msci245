//ES5 syntax

function Shape() { }

Shape.prototype.move = function (x, y) {
    this.X = x;
    this.Y = y;
}
Shape.prototype.distanceFromOrigin = function () {
    return Math.sqrt(this.X * this.X + this.Y * this.Y);
}
Shape.prototype.area = function () {
    throw new Error("I don't have a form yet");
}

Shape.prototype.X = 0;
Shape.prototype.Y = 0;

var s = new Shape();
s.move(10, 10); 
console.log(s.distanceFromOrigin());


//ES6 syntax

class Shape {
    constructor() { }
    move(x, y) {
        this.X = x;
        this.Y = y;
    }
    distanceFromOrigin() {
        return Math.sqrt(this.X * this.X + this.Y * this.Y);
    }
    area() {
        throw new Error("I don't have a form yet");
    }
}

Shape.prototype.X = 0;
Shape.prototype.Y = 0;

var s = new Shape();
s.move(10, 10); 
console.log(s.distanceFromOrigin());

