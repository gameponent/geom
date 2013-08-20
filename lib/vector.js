function Vector(dx, dy) {
    this.dx = dx || 0;
    this.dy = dy || 0;
}

Vector.prototype.getLength = function () {
    Math.sqrt(Math.pow(this.dx) + Math.pow(this.dy));
};

module.exports = Vector;