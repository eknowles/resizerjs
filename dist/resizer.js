var Resizer = (function () {
    function Resizer(containerSelector, options) {
        this.containerSelector = containerSelector;
        this.options = options;
        this.offsetX = 0;
        this._dragging = false;
        if (!containerSelector) {
            throw new Error('Missing param containerSelector');
        }
        if (typeof containerSelector === 'string') {
            this.container = document.querySelector(containerSelector);
        }
        else {
            this.container = containerSelector;
        }
        if (!this.container) {
            throw new Error("Can not find element from selector " + containerSelector);
        }
        this.target = this.container.firstElementChild;
        if (!this.container.Resizer) {
            this.setup();
        }
    }
    Resizer.createHandle = function () {
        var el = document.createElement('div');
        el.dataset.rzHandle = '';
        el.style.cursor = 'ew-resize';
        return el;
    };
    Resizer.createGhost = function () {
        var el = document.createElement('div');
        el.style.position = 'absolute';
        el.style.top = '0';
        el.style.bottom = '0';
        el.style.display = 'none';
        return el;
    };
    Resizer.prototype.remove = function () {
        delete this.container.Resizer;
        this.container.style.position = null;
        this.ghost.remove();
        this.handle.remove();
        this.target.style.flex = null;
    };
    Resizer.prototype.setup = function () {
        var _this = this;
        this.setupDom();
        this.handle.addEventListener('mousedown', function (e) { return _this.onDown(e); });
        this.container.addEventListener('mouseup', function (e) { return _this.onUp(e); });
        this.container.addEventListener('mousemove', function (e) { return _this.onMove(e); });
        this.container.Resizer = this;
    };
    Resizer.prototype.setupDom = function () {
        this.container.style.position = 'relative';
        this.handle = Resizer.createHandle();
        this.ghost = Resizer.createGhost();
        this.handle.appendChild(this.ghost);
        this.container.insertBefore(this.handle, this.target.nextElementSibling);
    };
    Object.defineProperty(Resizer.prototype, "dragging", {
        get: function () {
            return this._dragging;
        },
        set: function (value) {
            if (this.dragging) {
                this.ghost.style.display = 'none';
                this.target.style.flex = "0 0 " + this.handleX + "px";
            }
            else {
                this.ghost.style.display = 'block';
            }
            this._dragging = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Resizer.prototype, "handleX", {
        get: function () {
            return this._handleX;
        },
        set: function (value) {
            if (value < 0) {
                value = 0;
            }
            if (value > this.container.clientWidth) {
                value = this.container.clientWidth;
            }
            this.ghost.style.left = value + "px";
            this._handleX = value;
        },
        enumerable: true,
        configurable: true
    });
    Resizer.prototype.onDown = function (e) {
        e.preventDefault();
        if (!this.dragging) {
            this.offsetX = e.offsetX;
            this.handleX = e.screenX - this.container.getBoundingClientRect().left - this.offsetX;
            this.dragging = true;
        }
    };
    Resizer.prototype.onUp = function (e) {
        e.preventDefault();
        if (this.dragging) {
            this.handleX = e.screenX - this.container.getBoundingClientRect().left - this.offsetX;
            this.dragging = false;
        }
    };
    Resizer.prototype.onMove = function (e) {
        e.preventDefault();
        if (this.dragging) {
            var x = e.screenX - this.container.getBoundingClientRect().left - this.offsetX;
            if (e.shiftKey) {
                x = Math.ceil(x / 20) * 20;
            }
            this.handleX = x;
        }
    };
    return Resizer;
}());
//# sourceMappingURL=resizer.js.map