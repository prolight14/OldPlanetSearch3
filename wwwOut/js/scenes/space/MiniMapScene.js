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
var MiniMapScene = /** @class */ (function (_super) {
    __extends(MiniMapScene, _super);
    function MiniMapScene() {
        var _this = _super.call(this, "miniMap") || this;
        _this.PADDING = 3.6;
        return _this;
    }
    MiniMapScene.prototype.preload = function () {
        this.load.image("planetSymbol", "./assets/space/miniMap/planetSymbol.png");
    };
    MiniMapScene.prototype.create = function () {
        var _a = this.game.config, GAME_WIDTH = _a.width, GAME_HEIGHT = _a.height;
        var miniMapWidth = this.miniMapWidth = GAME_WIDTH * 0.3;
        var miniMapHeight = this.miniMapHeight = GAME_HEIGHT * 0.3;
        this.miniMapHalfWidth = this.miniMapWidth / 2;
        this.miniMapHalfHeight = this.miniMapHeight / 2;
        this.cameras.main.setViewport(GAME_WIDTH - miniMapWidth - 1.5, GAME_HEIGHT - miniMapHeight - 1.5, miniMapWidth, miniMapWidth);
        this.backGraphics = this.add.graphics();
        this.backGraphics.fillStyle(0x000000, 0.75);
        this.backGraphics.fillRect(0, 0, miniMapWidth, miniMapHeight);
        this.innerWindowGraphics = this.add.graphics();
        this.drawInnerWindowGraphics();
        this.innerGraphics = this.add.graphics();
        this.graphics = this.add.graphics();
        this.graphics.lineStyle(3, 0x56BE2A, 0.5);
        this.graphics.strokeRect(0, 0, miniMapWidth, miniMapHeight);
    };
    MiniMapScene.prototype.drawInnerWindowGraphics = function () {
        var padding = this.PADDING;
        var mainScene = this.scene.get("main");
        var csWindow = mainScene.csPlugin.world.cam.getWindow();
        var camera = mainScene.cameras.main;
        this.innerWindowWidth = (csWindow.width * this.miniMapWidth / (csWindow.width * padding)) * camera.zoom;
        this.innerWindowHeight = (csWindow.height * this.miniMapHeight / (csWindow.height * padding)) * camera.zoom;
        this.innerWindowGraphics.clear();
        this.innerWindowGraphics.lineStyle(2, 0x56BE2A, 0.2);
        if (this.innerWindowWidth > this.miniMapWidth || this.innerWindowHeight > this.miniMapHeight) {
            this.innerWindowWidth = this.miniMapWidth;
            this.innerWindowHeight = this.miniMapHeight;
        }
        this.halfInnerWindowWidth = this.innerWindowWidth / 2;
        this.halfInnerWindowHeight = this.innerWindowHeight / 2;
        this.innerWindowInnerX = (this.miniMapWidth - this.innerWindowWidth) / 2 + 1.5;
        this.innerWindowInnerY = (this.miniMapHeight - this.innerWindowHeight) / 2 + 1.5;
    };
    MiniMapScene.prototype.drawMiniMapShips = function () {
        var _this = this;
        var mainScene = this.scene.get("main");
        var csWorld = mainScene.csPlugin.world;
        var padding = this.PADDING;
        var camera = mainScene.cameras.main;
        var PADDED_WIDTH = this.game.config.width * padding / camera.zoom;
        var PADDED_HEIGHT = this.game.config.height * padding / camera.zoom;
        var HALF_PADDED_WIDTH = PADDED_WIDTH / 2;
        var HALF_PADDED_HEIGHT = PADDED_HEIGHT / 2;
        var minX = camera.scrollX - HALF_PADDED_WIDTH;
        var minY = camera.scrollY - HALF_PADDED_HEIGHT;
        var maxX = camera.scrollX + HALF_PADDED_WIDTH + mainScene.worldDimensions.cellWidth;
        var maxY = camera.scrollY + HALF_PADDED_HEIGHT + mainScene.worldDimensions.cellHeight;
        var minCell = csWorld.grid.getCoordinates(minX, minY);
        var maxCell = csWorld.grid.getCoordinates(maxX, maxY);
        this.innerGraphics.fillStyle(0x56BE2A);
        csWorld.grid.loopThroughCoordinates(function (cell) {
            for (var i in cell) {
                switch (cell[i].arrayName) {
                    case "enemyShip":
                        var enemyShip = csWorld.get.gameObject(cell[i].arrayName, cell[i].id);
                        var x = (enemyShip.x - minX) * _this.miniMapWidth / PADDED_WIDTH - _this.halfInnerWindowWidth;
                        var y = (enemyShip.y - minY) * _this.miniMapHeight / PADDED_HEIGHT - _this.halfInnerWindowHeight;
                        if (x > 0 && x < _this.miniMapWidth && y > 0 && y < _this.miniMapWidth) {
                            _this.innerGraphics.fillRect(x, y, 2, 2);
                        }
                        break;
                }
            }
        }, minCell.col, minCell.row, maxCell.col, maxCell.row);
    };
    MiniMapScene.prototype.drawMiniMapPlanets = function () {
        var _this = this;
        var planetScene = this.scene.get("planet");
        var csPlanets = planetScene.csPlanets;
        var mainScene = this.scene.get("main");
        var camera = mainScene.cameras.main;
        var padding = this.PADDING;
        var PADDED_WIDTH = this.game.config.width * padding / camera.zoom;
        var PADDED_HEIGHT = this.game.config.height * padding / camera.zoom;
        var HALF_PADDED_WIDTH = PADDED_WIDTH / 2;
        var HALF_PADDED_HEIGHT = PADDED_HEIGHT / 2;
        var minX = camera.scrollX - HALF_PADDED_WIDTH;
        var minY = camera.scrollY - HALF_PADDED_HEIGHT;
        var maxX = camera.scrollX + HALF_PADDED_WIDTH + mainScene.worldDimensions.cellWidth;
        var maxY = camera.scrollY + HALF_PADDED_HEIGHT + mainScene.worldDimensions.cellHeight;
        var planetWorld = csPlanets.world;
        var minCell = planetWorld.grid.getCoordinates(minX, minY);
        var maxCell = planetWorld.grid.getCoordinates(maxX, maxY);
        this.innerGraphics.fillStyle(0x56BE2A);
        planetWorld.grid.loopThroughCoordinates(function (cell) {
            for (var i in cell) {
                var planet = planetWorld.get.gameObject(cell[i].arrayName, cell[i].id);
                var x = (planet.x - minX) * _this.miniMapWidth / PADDED_WIDTH - _this.halfInnerWindowWidth;
                var y = (planet.y - minY) * _this.miniMapHeight / PADDED_HEIGHT - _this.halfInnerWindowHeight;
                if (x > -planet.width / 2 && x < _this.miniMapWidth && y > -planet.height / 2 && y < _this.miniMapWidth) {
                    _this.innerGraphics.fillCircle(x, y, (planet.width / 2) * camera.zoom);
                }
            }
        }, minCell.col, minCell.row, maxCell.col, maxCell.row);
    };
    MiniMapScene.prototype.update = function () {
        this.innerGraphics.clear();
        this.innerGraphics.fillStyle(0x01C5C5);
        this.innerGraphics.fillRect(this.innerWindowInnerX + this.input.activePointer.x * this.innerWindowWidth / this.game.config.width, this.innerWindowInnerY + this.input.activePointer.y * this.innerWindowHeight / this.game.config.height, 2, 2);
        this.drawInnerWindowGraphics();
        this.drawMiniMapShips();
        this.drawMiniMapPlanets();
        this.innerGraphics.fillStyle(0xB50009);
        this.innerGraphics.fillRect(this.miniMapHalfWidth - 2, this.miniMapHalfHeight - 2, 4, 4);
    };
    return MiniMapScene;
}(Phaser.Scene));
exports.default = MiniMapScene;
//# sourceMappingURL=MiniMapScene.js.map