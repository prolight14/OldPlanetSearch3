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
var StarLayerScene = /** @class */ (function (_super) {
    __extends(StarLayerScene, _super);
    function StarLayerScene() {
        return _super.call(this, "starLayer", "csStars") || this;
    }
    StarLayerScene.prototype.preload = function () {
        this.preloadWorld();
    };
    StarLayerScene.prototype.create = function () {
        this.starsPerCell = 10;
        this.starSize = 2;
        this.createWorld();
        this.createStars();
    };
    StarLayerScene.prototype.update = function () {
        this.updateWorldCamera();
        this.renderStars();
    };
    StarLayerScene.prototype.createStars = function () {
        this.starLayer = this.add.graphics();
        var world = this.csStars.world;
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
    StarLayerScene.prototype.renderStars = function () {
        var _this = this;
        this.starLayer.clear();
        this.starLayer.fillStyle(0xFFFFFF);
        var world = this.csStars.world;
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
    return StarLayerScene;
}(BaseBackgroundScene_js_1.default));
exports.default = StarLayerScene;
//# sourceMappingURL=StarLayerScene.js.map