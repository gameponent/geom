var Vector = require('./lib/vector');

function Point (options) {
    options = options || {};
    this.x = options.x || 0;
    this.y = options.y || 0;
};

Point.prototype.translate = function (options) {
    if (options.vector instanceof Vector) {
        _translateByVector(this, options.vector);
    } else {
        _translateByValues(this, options.tx || 0, options.ty || 0);
    }
    return this;
};

function _translateByVector = function (point, vector) {
    point.x += vector.dx;
    point.y += vector.dy;
};

function _translateByValues = function (point, tx, ty) {
    point.x += tx;
    point.y += ty;
};

module.exports = Point;