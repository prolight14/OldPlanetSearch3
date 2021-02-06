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
var CameraShadow_js_1 = require("../../GameObjects/space/CameraShadow.js");
var StarLayer2Scene = /** @class */ (function (_super) {
    __extends(StarLayer2Scene, _super);
    function StarLayer2Scene() {
        return _super.call(this, "starLayer2") || this;
    }
    StarLayer2Scene.prototype.preload = function () {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./js/libraries/CartesianSystemPlugin.js",
            sceneKey: 'csStars'
        });
    };
    StarLayer2Scene.prototype.create = function () {
        this.starsPerCell = 15;
        this.starSize = 2;
        this.starScroll = 0.75;
        var dimensions = this.scene.get("main").worldDimensions;
        var gridConfig = {
            cols: Math.floor(dimensions.width / dimensions.cellWidth),
            rows: Math.floor(dimensions.height / dimensions.cellHeight),
            cell: {
                width: dimensions.cellWidth,
                height: dimensions.cellHeight
            }
        };
        this.csStars.setupWorld({
            camera: {
                window: {
                    x: 0,
                    y: 0,
                    width: this.game.config.width,
                    height: this.game.config.height
                }
            },
            grid: gridConfig
        });
        this.createStars();
        //////////////////////////////////////////////
        var world = this.csStars.world;
        this.cameraShadow = new CameraShadow_js_1.default(this, this.csStars, 0, 0, this.starScroll);
        this.cameraShadow.setTarget(this.scene.get("main").cameraFocus);
        world.cam.setFocus(this.cameraShadow.x, this.cameraShadow.y, "cameraShadow");
        world.cam.update();
        this.cameras.main.startFollow(this.cameraShadow);
        this.cameras.main.setBounds(0, 0, gridConfig.cols * gridConfig.cell.width, gridConfig.rows * gridConfig.cell.height);
        this.lastMscZoom = this.scene.get("main").cameras.main.zoom;
    };
    StarLayer2Scene.prototype.update = function () {
        var world = this.csStars.world;
        this.cameraShadow.update();
        world.cam.updateFocus(this.cameraShadow.x, this.cameraShadow.y);
        world.cam.update();
        var mscZoom = this.scene.get("main").cameras.main.zoom;
        if (mscZoom !== this.lastMSCZoom) {
            this.cameras.main.setZoom(mscZoom);
            var _window = this.scene.get("main").csPlugin.world.cam.getWindow();
            world.cam.setWindow(_window.x, _window.y, _window.width, _window.height);
        }
        this.lastMSCZoom = mscZoom;
        this.cameras.main.setRotation(this.scene.get("main").cameras.main.rotation);
        //////////////////////////////////////////////
        this.renderStars();
    };
    StarLayer2Scene.prototype.createStars = function () {
        this.starLayer = this.add.graphics();
        var world = this.csStars.world;
        var rng = new Phaser.Math.RandomDataGenerator(["starLayer2"]);
        world.grid.loopThroughAllCells(function (cell, col, row) {
            Object.defineProperty(cell, "ss", {
                configurable: true,
                enumerable: false,
                writable: true,
                value: rng.integer()
            });
        });
    };
    StarLayer2Scene.prototype.renderStars = function () {
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
    return StarLayer2Scene;
}(Phaser.Scene));
exports.default = StarLayer2Scene;
//# sourceMappingURL=StarLayer2Scene.js.map