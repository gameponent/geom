var Point = require('./lib/point');

function _containsRect = function (rect, other) {
    return (rect.left <= other.left) && (rect.top >= other.top)
            && (rect.left + rect.width >= other.left + other.width)
            && (rect.top - rect.height <= other.top - other.height)
            && (rect.left + rect.width > other.left)
            && (rect.top - rect.height < other.top);
};

function _containsPoint = function (rect, other) {
    return (this.left <= other.x) && (this.top >= other.x)
            && (this.left + this.width > other.x)
            && (this.top - this.height < other.y);
};

function Rect(options) {
    options = options || {};
    this.left = options.left;
    this.top = options.top;
    this.width = options.width;
    this.height = options.height;
}

Rect.prototype.right = function () {
    return this.left + this.height;
};

Rect.prototype.bottom = function () {
    return this.top - this.height;
};

Rect.prototype.contains = function (options) {
    var result = false;
    
    if (options.rect instanceof Rect) {
        result = _containsRect(this, options.rect);
    } else {
        result = _containsPoint(this, options.point);
    }

    return result;
};

Rect.prototype.intersectTop = function (options) {
    var other = options.rect;

    return (other.top > y && (other.contains(topLeftCorner())
            || other.contains(topRightCorner())
            || contains(other.bottomLeftCorner()) 
            || contains(other.bottomRightCorner())));
}

Rect.prototype.intersectBottom = function (options) {
    var other = options.rect;

    return other.intersectTop({rect: this});
}

Rect.prototype.intersectLeft = function (options) {
    var other = options.rect;

    return (other.left < x && (other.contains(topLeftCorner())
            || other.contains(bottomLeftCorner())
            || contains(other.topRightCorner()) 
            || contains(other.bottomRightCorner())));
};

Rect.prototype.intersectRight = function (options) {
    var other = options.rect;

    return other.intersectLeft({rect: this});
};

Rect.prototype.centerPoint = function () {
    return new Point({x: this.left + this.width / 2, y: this.top - this.height / 2});
};

Rect.prototype.topLeftPoint = function () {
    return new Point({x: this.left, y: this.top});
};

Rect.prototype.topRightPoint = function () {
    return new Point({x: this.right(), y: this.top});
};

Rect.prototype.bottomLeftPoint = function () {
    return new Point({x: this.left, y: this.bottom()});
};

Rect.prototype.bottomRightPoint = function () {
    return new Point({x: this.right(), y: this.bottom()});
};

Rect.prototype.copy = function() {
    return new Rect({left: this.left, top: this.top, width: this.width, height: this.height});
};

Rect.createCenteredHitbox = function (width, height) {
    return new Rect(-width / 2, -height / 2, width, height);
};

module.exports = Rect;