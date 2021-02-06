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
var BaseBackgroundScene_js_1 = require("./BaseBackgroundScene.js");
var StarLayer4Scene = /** @class */ (function (_super) {
    __extends(StarLayer4Scene, _super);
    function StarLayer4Scene() {
        return _super.call(this, "starLayer4", "csStars4") || this;
    }
    StarLayer4Scene.prototype.preload = function () {
        this.preloadWorld();
    };
    StarLayer4Scene.prototype.create = function () {
        this.starsPerCell = 40;
        this.starSize = 1;
        this.starScroll = 0.25;
        this.createWorld();
        this.createStars();
    };
    StarLayer4Scene.prototype.update = function () {
        this.updateWorldCamera();
        this.renderStars();
    };
    StarLayer4Scene.prototype.createStars = function () {
        this.starLayer = this.add.graphics();
        var world = this.csStars4.world;
        var rng = new Phaser.Math.RandomDataGenerator(["starLayer1"]);
        world.grid.loopThroughAllCells(function (cell, col, row) {
            Object.defineProperty(cell, "ss", {
                configurable: true,
                enumerable: false,
                writable: true,
                value: rng.integer()
            });
        });
    };
    StarLayer4Scene.prototype.renderStars = function () {
        var _this = this;
        this.starLayer.clear();
        this.starLayer.fillStyle(0xFFFFFF);
        var world = this.csStars4.world;
        var rng, i, x, y;
        var _a = world.grid.getDimensions(), cellWidth = _a.cellWidth, cellHeight = _a.cellHeight;
        world.grid.loopThroughVisibleCells(function (cell, col, row) {
            rng = new Phaser.Math.RandomDataGenerator([cell.ss]);
            x = col * cellWidth;
            y = row * cellHeight;
            for (i = 0; i < _this.starsPerCell; i++) {
                _this.starLayer.fillRect(x + rng.between(0, cellWidth), y + rng.between(0, cellHeight), _this.starSize, _this.starSize);
            }
        });
    };
    return StarLayer4Scene;
}(BaseBackgroundScene_js_1.default));
exports.default = StarLayer4Scene;
//# sourceMappingURL=StarLayer4Scene.js.map