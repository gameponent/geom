var Point = require('./point');

function _containsRect(rect, other) {
    return (rect.left <= other.left) && (rect.top >= other.top)
        && (rect.left + rect.width >= other.left + other.width)
        && (rect.top - rect.height <= other.top - other.height)
        && (rect.left + rect.width > other.left)
        && (rect.top - rect.height < other.top);
};

function _containsPoint(rect, other) {
    return (rect.left <= other.x)
        && (rect.top >= other.y)
        && (rect.left + rect.width >= other.x)
        && (rect.top - rect.height <= other.y);
};

function Rect(options) {
    options = options || {};
    this.left = options.left || 0;
    this.top = options.top || 0;
    this.width = options.width || 0;
    this.height = options.height || 0;
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

    return (other.top > this.top && (
        other.contains({point: this.topLeftPoint()})
        || other.contains({point: this.topRightPoint()})
        || this.contains({point: other.bottomLeftPoint()}) 
        || this.contains({point: other.bottomRightPoint()})
    ));
}

Rect.prototype.intersectBottom = function (options) {
    var other = options.rect;

    return other.intersectTop({rect: this});
}

Rect.prototype.intersectLeft = function (options) {
    var other = options.rect;

    return (other.left < this.left && (
        other.contains({point: this.topLeftPoint()})
        || other.contains({point: this.bottomLeftPoint()})
        || this.contains({point: other.topRightPoint()}) 
        || this.contains({point: other.bottomRightPoint()})
    ));
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