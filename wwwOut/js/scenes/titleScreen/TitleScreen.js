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
var TitleScreenScene = /** @class */ (function (_super) {
    __extends(TitleScreenScene, _super);
    function TitleScreenScene() {
        return _super.call(this, "titleScreen") || this;
    }
    TitleScreenScene.prototype.preload = function () {
        this.load.image("PlanetSearch3", "./assets/titlescreen/PlanetSearch3.png");
    };
    TitleScreenScene.prototype.create = function () {
        var _this = this;
        this.add.sprite(this.game.config.width * 0.5, this.game.config.height * 0.1667, "PlanetSearch3").setScale(5).setOrigin(0.5, 0);
        this.input.on("pointerdown", function () {
            _this.scene.start("main");
        });
    };
    return TitleScreenScene;
}(Phaser.Scene));
exports.default = TitleScreenScene;
//# sourceMappingURL=TitleScreen.js.map