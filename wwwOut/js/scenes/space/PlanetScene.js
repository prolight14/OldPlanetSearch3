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
var Planet_js_1 = require("../../GameObjects/space/Planet.js");
var PlanetScene = /** @class */ (function (_super) {
    __extends(PlanetScene, _super);
    function PlanetScene() {
        return _super.call(this, "planet", "csPlanets") || this;
    }
    PlanetScene.prototype.preload = function () {
        this.preloadWorld();
    };
    PlanetScene.prototype.create = function () {
        this.createWorld();
        var world = this.csPlanets.world;
        var planets = world.add.gameObjectArray(Planet_js_1.default);
        planets.add(this, 77777, 60000, "icyDwarfPlanet").setScale(10, 10);
        planets.add(this, 74637, 64000, "redDustPlanet").setScale(10, 10);
    };
    PlanetScene.prototype.update = function () {
        this.updateWorldCamera();
        this.updateWorld();
        var mainScene = this.scene.get("main");
        var playerShip = mainScene.playerShip;
        var world = this.csPlanets.world;
        var planet = world.get.gameObject("planet", 0);
        var planetRadius = Math.pow((planet.displayWidth + planet.displayHeight) / 4, 2);
        if (Math.pow(playerShip.x - planet.x, 2) + Math.pow(playerShip.y - planet.y, 2) < planetRadius) {
            mainScene.switchToPlanet(planet);
        }
    };
    return PlanetScene;
}(BaseBackgroundScene_js_1.default));
exports.default = PlanetScene;
//# sourceMappingURL=PlanetScene.js.map