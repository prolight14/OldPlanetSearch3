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
var BaseBackgroundScene = /** @class */ (function (_super) {
    __extends(BaseBackgroundScene, _super);
    function BaseBackgroundScene(sceneName, csKeyName) {
        var _this = _super.call(this, sceneName) || this;
        _this.csKeyName = csKeyName;
        return _this;
    }
    BaseBackgroundScene.prototype.preloadWorld = function () {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./js/libraries/CartesianSystemPlugin.js",
            sceneKey: this.csKeyName
        });
    };
    BaseBackgroundScene.prototype.createWorld = function () {
        var dimensions = this.scene.get("main").worldDimensions;
        var gridConfig = {
            cols: Math.floor(dimensions.width / dimensions.cellWidth),
            rows: Math.floor(dimensions.height / dimensions.cellHeight),
            cell: {
                width: dimensions.cellWidth,
                height: dimensions.cellHeight
            }
        };
        this[this.csKeyName].setupWorld({
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
        //////////////////////////////////////////////
        var world = this[this.csKeyName].world;
        var mainScene = this.scene.get("main");
        if (this.starScroll) {
            this.cameraShadow = new CameraShadow_js_1.default(this, this[this.csKeyName], 0, 0, this.starScroll);
            this.cameraShadow.setTarget(mainScene.cameraFocus);
            world.cam.setFocus(this.cameraShadow.x, this.cameraShadow.y, "cameraShadow");
            world.cam.update();
            this.cameras.main.startFollow(this.cameraShadow);
        }
        else {
            var cameraFocus = mainScene.cameraFocus;
            world.cam.setFocus(cameraFocus.x, cameraFocus.y, "cameraFocus");
            world.cam.update();
            this.cameras.main.startFollow(cameraFocus);
        }
        this.cameras.main.setBounds(0, 0, gridConfig.cols * gridConfig.cell.width, gridConfig.rows * gridConfig.cell.height);
        this.lastMscZoom = mainScene.cameras.main.zoom;
    };
    BaseBackgroundScene.prototype.updateWorldCamera = function () {
        var world = this[this.csKeyName].world;
        var mainScene = this.scene.get("main");
        if (this.starScroll && this.cameraShadow) {
            this.cameraShadow.update();
            world.cam.updateFocus(this.cameraShadow.x, this.cameraShadow.y);
            world.cam.update();
        }
        else {
            var cameraFocus = mainScene.cameraFocus;
            world.cam.updateFocus(cameraFocus.x, cameraFocus.y);
            world.cam.update();
        }
        var mscZoom = mainScene.cameras.main.zoom;
        if (mscZoom !== this.lastMSCZoom) {
            this.cameras.main.setZoom(mscZoom);
            var _window = mainScene.csPlugin.world.cam.getWindow();
            world.cam.setWindow(_window.x, _window.y, _window.width, _window.height);
        }
        this.lastMSCZoom = mscZoom;
        this.cameras.main.setRotation(mainScene.cameras.main.rotation);
    };
    BaseBackgroundScene.prototype.updateWorld = function () {
        this[this.csKeyName].updateCS();
    };
    return BaseBackgroundScene;
}(Phaser.Scene));
exports.default = BaseBackgroundScene;
//# sourceMappingURL=BaseBackgroundScene.js.map