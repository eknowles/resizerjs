var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var Resizer = function () {
    function Resizer(containerSelector, resizerOptions) {
        if (resizerOptions === void 0) {
            resizerOptions = {};
        }
        this.containerSelector = containerSelector;
        this.offsetX = 0;
        this.dragging = false;
        if (!containerSelector) {
            throw new Error('Missing param containerSelector');
        }
        this.options = _extends(Resizer.defaultOptions, resizerOptions, {});
        if (typeof containerSelector === 'string') {
            this.container = document.querySelector(containerSelector);
        } else {
            this.container = containerSelector;
        }
        if (!this.container) {
            throw new Error("Can not find element from selector " + containerSelector);
        }
        this.target = this.container.firstElementChild;
        if (this.container.Resizer) {
            this.remove();
        }
        this.setup();
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
        this.container.querySelector('[data-rz-handle]').remove();
        this.target.style.flex = null;
    };
    Resizer.prototype.setup = function () {
        var _this = this;
        this.setupDom();
        this.handle.addEventListener('mousedown', function (e) {
            return _this.onDown(e);
        });
        this.container.addEventListener('mouseup', function (e) {
            return _this.onUp(e);
        });
        this.container.addEventListener('mousemove', function (e) {
            return _this.onMove(e);
        });
        this.container.Resizer = this;
    };
    Resizer.prototype.setupDom = function () {
        this.container.style.position = 'relative';
        this.handle = Resizer.createHandle();
        this.ghost = Resizer.createGhost();
        this.handle.appendChild(this.ghost);
        this.container.insertBefore(this.handle, this.target.nextElementSibling);
    };
    Resizer.prototype.setDragging = function (value) {
        if (value === void 0) {
            value = true;
        }
        if (this.dragging) {
            this.ghost.style.display = 'none';
            this.target.style.flex = "0 0 " + this.handleX + "px";
        } else {
            this.ghost.style.display = 'block';
        }
        return this.dragging = value;
    };
    Resizer.prototype.setHandleX = function (value) {
        if (value < 0) {
            value = 0;
        }
        if (value > this.container.clientWidth) {
            value = this.container.clientWidth;
        }
        this.ghost.style.left = value + "px";
        return this.handleX = value;
    };
    Resizer.prototype.onDown = function (e) {
        e.preventDefault();
        if (!this.dragging) {
            this.offsetX = e.offsetX;
            this.setHandleX(e.pageX - this.container.getBoundingClientRect().left - this.offsetX);
            this.setDragging(true);
        }
    };
    Resizer.prototype.onUp = function (e) {
        e.preventDefault();
        if (this.dragging) {
            this.setHandleX(e.pageX - this.container.getBoundingClientRect().left - this.offsetX);
            this.setDragging(false);
        }
    };
    Resizer.prototype.onMove = function (e) {
        e.preventDefault();
        if (this.dragging) {
            var x = e.pageX - this.container.getBoundingClientRect().left - this.offsetX;
            if (e.shiftKey) {
                x = Math.ceil(x / 20) * 20;
            }
            this.setHandleX(x);
        }
    };
    return Resizer;
}();
Resizer.defaultOptions = {
    width: 8
};
//# sourceMappingURL=resizer.js.map