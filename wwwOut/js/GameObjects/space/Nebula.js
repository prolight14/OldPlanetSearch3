"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PhysicsSprite_js_1 = require("./PhysicsSprite.js");
var Nebula = /** @class */ (function (_super) {
    __extends(Nebula, _super);
    function Nebula(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.setScale(11, 11);
        _this.going = new Phaser.Math.Vector2(Phaser.Math.FloatBetween(-1, 1), Phaser.Math.FloatBetween(-1, 1));
        _this.timer = Date.now() + Phaser.Math.Between(-3000, 3000);
        _this.alpha = 0.5;
        return _this;
    }
    Nebula.prototype.preUpdate = function () {
        this.x += this.going.x;
        this.y += this.going.y;
        if (Date.now() - this.timer > 3000) {
            this.going.setAngle(Math.random() * 360 * Phaser.Math.DEG_TO_RAD);
            this.timer = Date.now();
        }
        this.body.postUpdate();
    };
    return Nebula;
}(PhysicsSprite_js_1.default));
exports.default = Nebula;
//# sourceMappingURL=Nebula.js.map