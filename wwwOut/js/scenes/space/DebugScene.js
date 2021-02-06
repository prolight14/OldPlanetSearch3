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
var DebugScene = /** @class */ (function (_super) {
    __extends(DebugScene, _super);
    function DebugScene() {
        return _super.call(this, "debug") || this;
    }
    DebugScene.prototype.create = function () {
        var world = (this.csPlugin = this.scene.get("main").csPlugin).world;
        this.cellGraphics = this.add.graphics();
        // Will eventually be moved to `UIDebugScene.js`
        // this.addWindow();
    };
    // Will eventually be moved to `UIDebugScene.js`
    DebugScene.prototype.addWindow = function () {
        this.debugGraphics = this.add.graphics().setScrollFactor(0);
        var mainScene = this.scene.get("main");
        var camWindow = mainScene.csPlugin.world.cam.getWindow();
        this.debugGraphics.strokeRect(camWindow.x, camWindow.y, camWindow.width, camWindow.height);
    };
    DebugScene.prototype.update = function (time, delta) {
        this.updateMainCamera();
        this.showCells();
        // this.debugGraphics.clear();
        // this.debugGraphics.lineStyle(4, 0x00ff00, 1);
        // var mainScene = this.scene.get("main");
        // var camWindow = mainScene.csPlugin.world.cam.getWindow();
        // this.debugGraphics.strokeRect(camWindow.x, camWindow.y, camWindow.width, camWindow.height);
    };
    DebugScene.prototype.updateMainCamera = function () {
        var mainSceneCam = this.scene.get("main").cameras.main;
        this.cameras.main.setScroll(mainSceneCam.scrollX, mainSceneCam.scrollY);
        this.cameras.main.setZoom(mainSceneCam.zoom);
        this.cameras.main.setRotation(this.scene.get("main").cameras.main.rotation);
    };
    DebugScene.prototype.showCells = function () {
        var _this = this;
        var world = this.csPlugin.world;
        var dimensions = world.grid.getDimensions();
        var cellWidth = dimensions.cellWidth;
        var cellHeight = dimensions.cellHeight;
        this.cellGraphics.clear();
        this.cellGraphics.lineStyle(4, 0x00ff00, 1);
        world.grid.loopThroughVisibleCells(function (cell, col, row) {
            _this.cellGraphics.strokeRect(col * cellWidth, row * cellHeight, cellWidth, cellHeight);
            // for(var i in cell)
            // {
            //     var gameObject = world.get.gameObject(cell[i].arrayName, cell[i].id);
            //     var box = gameObject.body.boundingBox;
            //     this.cellGraphics.strokeRect(box.minX, box.minY, box.maxX - box.minX, box.maxY - box.minY);
            // }
        });
    };
    return DebugScene;
}(Phaser.Scene));
exports.default = DebugScene;
//# sourceMappingURL=DebugScene.js.map