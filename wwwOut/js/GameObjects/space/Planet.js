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
var Planet = /** @class */ (function (_super) {
    __extends(Planet, _super);
    function Planet(scene, x, y, texture, frame) {
        return _super.call(this, scene, x, y, texture, frame) || this;
    }
    Planet.prototype.canInteract = function (sprite) {
        var dx = this.x - sprite.x;
        var dy = this.y - sprite.y;
        return dx * dx + dy * dy < Math.pow((this.displayWidth + this.displayHeight) / 4, 2);
    };
    return Planet;
}(PhysicsSprite_js_1.default));
exports.default = Planet;
//# sourceMappingURL=Planet.js.map