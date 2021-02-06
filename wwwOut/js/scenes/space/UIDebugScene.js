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
var UIDebugScene = /** @class */ (function (_super) {
    __extends(UIDebugScene, _super);
    function UIDebugScene() {
        return _super.call(this, "UIDebug") || this;
    }
    UIDebugScene.prototype.create = function () {
        this.fpsText = this.add.text(24, 24, "Fps: 60").setScrollFactor(0);
        this.posText = this.add.text(600, 24, "(???, ???)").setScrollFactor(0);
        this.cellText = this.add.text(24, 300, "").setScrollFactor(0);
    };
    UIDebugScene.prototype.update = function (time, delta) {
        this.showFps(delta);
        this.showCellInfo();
        this.setPosText();
    };
    UIDebugScene.prototype.setPosText = function () {
        var mainScene = this.scene.get("main");
        this.posText.setText("(" + mainScene.playerShip.x.toFixed(0) + "," + mainScene.playerShip.y.toFixed(0) + ")");
    };
    UIDebugScene.prototype.showFps = function (delta) {
        this.fpsText.setText("Fps: " + Math.floor(1000 / delta));
    };
    UIDebugScene.prototype.showCellInfo = function () {
        var mainScene = this.scene.get("main");
        var world = mainScene.csPlugin.world;
        var scroll = world.cam.getScroll();
        var mainSceneCam = this.scene.get("main").cameras.main;
        var coordinates = world.grid.getCoordinates(scroll.x - world.cam.getWindowWidth() / 2 + this.input.activePointer.x / mainSceneCam.zoom, scroll.y - world.cam.getWindowHeight() / 2 + this.input.activePointer.y / mainSceneCam.zoom);
        var cell = world.grid.getCellFromCoordinates(coordinates.col, coordinates.row);
        this.cellText.setText(coordinates.col + ", " + coordinates.row + "\n" + Object.keys(cell).join("\n"));
    };
    return UIDebugScene;
}(Phaser.Scene));
exports.default = UIDebugScene;
//# sourceMappingURL=UIDebugScene.js.map