"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraShadow = /** @class */ (function () {
    function CameraShadow(scene, cs, x, y, guide) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.guide = guide;
        var bounds = cs.world.cam.getBounds();
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;
        // this.toSubX = (width - width / this.guide) * 0.5;
        // this.toSubY = (height - height / this.guide) * 0.5;
        this.toSubX = (width - width / this.guide) * this.guide;
        this.toSubY = (height - height / this.guide) * this.guide;
    }
    CameraShadow.prototype.update = function () {
        this.x = this.target.x * this.guide - this.toSubX;
        this.y = this.target.y * this.guide - this.toSubY;
    };
    CameraShadow.prototype.setTarget = function (target) {
        this.target = target;
    };
    return CameraShadow;
}());
exports.default = CameraShadow;
//# sourceMappingURL=CameraShadow.js.map