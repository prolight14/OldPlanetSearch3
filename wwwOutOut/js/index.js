(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
/**
 * @this {Phaser.Physics.Arcade.Image}
 */
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    /**
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     */
    function Player(scene, x, y, texture) {
        var _this = _super.call(this, scene, x, y, texture) || this;
        scene.add.existing(_this);
        scene.physics.add.existing(_this);
        _this.setMaxVelocity(200, 400).setDrag(1000, 0);
        var _a = Phaser.Input.Keyboard.KeyCodes, LEFT = _a.LEFT, RIGHT = _a.RIGHT, UP = _a.UP, DOWN = _a.DOWN, W = _a.W, A = _a.A, S = _a.S, D = _a.D;
        _this.keys = scene.input.keyboard.addKeys({
            left: LEFT,
            right: RIGHT,
            up: UP,
            down: DOWN,
            w: W,
            a: A,
            s: S,
            d: D
        });
        _this.setCollideWorldBounds(true, 0, 0);
        return _this;
    }
    Player.prototype.preUpdate = function () {
        var keys = this.keys;
        var onGround = this.body.blocked.down;
        var acceleration = 700;
        if (keys.left.isDown || keys.a.isDown) {
            this.setAccelerationX(-acceleration);
        }
        else if (keys.right.isDown || keys.d.isDown) {
            this.setAccelerationX(acceleration);
        }
        else {
            this.setAccelerationX(0);
        }
        if (onGround && (keys.up.isDown || keys.w.isDown)) {
            this.setVelocityY(-380);
        }
    };
    return Player;
}(Phaser.Physics.Arcade.Image));
exports.default = Player;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CameraShadow = /** @class */ (function () {
    function CameraShadow(scene, cs, x, y, guide) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.guide = guide;
        var bounds = cs.world.cam.getBounds();
        var width = bounds.maxX - bounds.minX;
        var height = bounds.maxY - bounds.minY;
        // this.toSubX = (width - width / this.guide) * 0.5;
        // this.toSubY = (height - height / this.guide) * 0.5;
        this.toSubX = (width - width / this.guide) * this.guide;
        this.toSubY = (height - height / this.guide) * this.guide;
    }
    CameraShadow.prototype.update = function () {
        this.x = this.target.x * this.guide - this.toSubX;
        this.y = this.target.y * this.guide - this.toSubY;
    };
    CameraShadow.prototype.setTarget = function (target) {
        this.target = target;
    };
    return CameraShadow;
}());
exports.default = CameraShadow;

},{}],3:[function(require,module,exports){
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
var EnemyShip = /** @class */ (function (_super) {
    __extends(EnemyShip, _super);
    function EnemyShip(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.going = Math.random() <= 0.5 ? "" : (Math.random() <= 0.5 ? "left" : "right");
        _this.swivelTimer = scene.time.addEvent({
            delay: 200,
            callback: function () {
                switch (_this.going) {
                    case "left":
                        _this.going = "";
                        _this.swivelTimer.delay = Phaser.Math.Between(2000, 6000);
                        break;
                    case "right":
                        _this.going = "";
                        _this.swivelTimer.delay = Phaser.Math.Between(2000, 6000);
                        break;
                    default:
                        _this.going = (Math.random() <= 0.5 ? "left" : "right");
                        _this.swivelTimer.delay = Phaser.Math.Between(200, 850);
                        break;
                }
            },
            loop: true
        });
        _this.controls = {
            left: function () {
                return _this.going === "left";
            },
            right: function () {
                return _this.going === "right";
            },
            up: function () {
                return true;
            },
        };
        _this.setScale(2, 2);
        _this.dirSpeed = 0;
        _this.dirSpeedAcl = 0.3;
        _this.dirSpeedDeacl = 0.3;
        _this.dirSpeedAutoDeacl = 0.3;
        _this.maxDirSpeed = 10;
        _this.minDirSpeed = 0;
        _this.rotSpeed = 3;
        _this.setRotation(Math.random() * Math.PI * 2);
        return _this;
    }
    EnemyShip.prototype.preUpdate = function () {
        if (this.controls.left()) {
            this.setRotation(this.rotation - this.rotSpeed * Phaser.Math.DEG_TO_RAD * this.scene.fSpeed);
        }
        if (this.controls.right()) {
            this.setRotation(this.rotation + this.rotSpeed * Phaser.Math.DEG_TO_RAD * this.scene.fSpeed);
        }
        if (this.controls.up()) {
            this.dirSpeed += this.dirSpeedAcl * this.scene.fSpeed;
            this.dirSpeed = Math.min(this.dirSpeed, this.maxDirSpeed);
        }
        var rot = this.rotation - Math.PI / 2;
        this.x += this.dirSpeed * Math.cos(rot) * this.scene.fSpeed;
        this.y += this.dirSpeed * Math.sin(rot) * this.scene.fSpeed;
        this.body.postUpdate();
    };
    return EnemyShip;
}(PhysicsSprite_js_1.default));
exports.default = EnemyShip;

},{"./PhysicsSprite.js":5}],4:[function(require,module,exports){
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
var Nebula = /** @class */ (function (_super) {
    __extends(Nebula, _super);
    function Nebula(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.setScale(11, 11);
        _this.going = new Phaser.Math.Vector2(Phaser.Math.FloatBetween(-1, 1), Phaser.Math.FloatBetween(-1, 1));
        _this.timer = Date.now() + Phaser.Math.Between(-3000, 3000);
        _this.alpha = 0.5;
        return _this;
    }
    Nebula.prototype.preUpdate = function () {
        this.x += this.going.x;
        this.y += this.going.y;
        if (Date.now() - this.timer > 3000) {
            this.going.setAngle(Math.random() * 360 * Phaser.Math.DEG_TO_RAD);
            this.timer = Date.now();
        }
        this.body.postUpdate();
    };
    return Nebula;
}(PhysicsSprite_js_1.default));
exports.default = Nebula;

},{"./PhysicsSprite.js":5}],5:[function(require,module,exports){
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
var PhysicsSprite = /** @class */ (function (_super) {
    __extends(PhysicsSprite, _super);
    function PhysicsSprite(scene, x, y, texture, frame) {
        var _this_1 = _super.call(this, scene, x, y, texture, frame) || this;
        scene.add.existing(_this_1);
        // scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);
        var _this = _this_1;
        _this_1.body = {};
        _this_1.body.boundingBox = {};
        _this_1.body.moves = true;
        _this_1.body.updateBoundingBox = function () {
            this.boundingBox.minX = _this.x - _this.displayWidth / 2;
            this.boundingBox.minY = _this.y - _this.displayHeight / 2;
            this.boundingBox.maxX = _this.x + _this.displayWidth / 2;
            this.boundingBox.maxY = _this.y + _this.displayHeight / 2;
        };
        _this_1.body.updateBoundingBox();
        _this_1.body.postUpdate = function () { };
        _this_1.body.destroy = function () { };
        var lastSetScale = _this_1.setScale;
        _this_1.setScale = function () {
            var toReturn = lastSetScale.apply(this, arguments);
            this.body.updateBoundingBox();
            return toReturn;
        };
        return _this_1;
    }
    return PhysicsSprite;
}(Phaser.GameObjects.Sprite));
exports.default = PhysicsSprite;

},{}],6:[function(require,module,exports){
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

},{"./PhysicsSprite.js":5}],7:[function(require,module,exports){
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
var HALF_PI = Math.PI / 2;
var PlayerShip = /** @class */ (function (_super) {
    __extends(PlayerShip, _super);
    /**
     *
     * @param {Phaser.Scene} scene
     * @param {number} x
     * @param {number} y
     * @param {string} texture
     * @param {string} frame
     */
    function PlayerShip(scene, x, y, texture, frame) {
        var _this = _super.call(this, scene, x, y, texture, frame) || this;
        _this.keys = {
            a: scene.input.keyboard.addKey('a'),
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };
        _this.setScale(2, 2);
        _this.dirSpeed = 0;
        _this.dirSpeedAcl = 0.5;
        _this.dirSpeedDeacl = 0.2;
        _this.dirSpeedAutoDeacl = 0.2;
        _this.maxDirSpeed = 20;
        _this.minDirSpeed = -3;
        _this.rotSpeed = 4;
        _this.thrusterEmitter = _this.scene.scene.get("effects").add.particles("playerShipParticles").createEmitter({
            frame: ["particle1", "particle2", "particle3", "particle4"],
            x: _this.x,
            y: _this.y,
            speed: 200,
            lifespan: 700
        });
        scene.events.on("sleep", function () {
            for (var i in _this.keys) {
                _this.keys[i].reset();
            }
        });
        if (scene.game.mobile) {
            scene.input.on("pointerdown", _this.setRotationBasedOnPointer, _this);
            scene.input.on("pointermove", _this.setRotationBasedOnPointer, _this);
        }
        return _this;
    }
    PlayerShip.prototype.setRotationBasedOnPointer = function (pointer) {
        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY) + HALF_PI);
    };
    PlayerShip.prototype.preUpdate = function () {
        if (this.scene.game.mobile) {
            if (this.scene.input.activePointer.isDown) {
                var pointer = this.scene.input.activePointer;
                this.dirSpeed += /*this.dirSpeedAcl */ this.scene.fSpeed * Math.sqrt(Math.pow(this.x - pointer.worldX, 2) + Math.pow(this.y - pointer.worldY, 2)) / 100;
                this.dirSpeed = Math.min(this.dirSpeed, this.maxDirSpeed);
            }
            else {
                this.dirSpeed -= this.dirSpeedAutoDeacl * this.scene.fSpeed;
                this.dirSpeed = Math.max(this.dirSpeed, 0);
            }
        }
        if (this.keys.a.isDown) {
            this.setRotation(this.rotation - this.rotSpeed * Phaser.Math.DEG_TO_RAD * this.scene.fSpeed);
        }
        if (this.keys.d.isDown) {
            this.setRotation(this.rotation + this.rotSpeed * Phaser.Math.DEG_TO_RAD * this.scene.fSpeed);
        }
        if (this.keys.w.isDown) {
            this.dirSpeed += this.dirSpeedAcl * this.scene.fSpeed;
            this.dirSpeed = Math.min(this.dirSpeed, this.maxDirSpeed);
        }
        else if (this.keys.s.isDown) {
            this.dirSpeed -= this.dirSpeedDeacl * this.scene.fSpeed;
            this.dirSpeed = Math.max(this.dirSpeed, this.minDirSpeed);
        }
        else {
            this.dirSpeed -= this.dirSpeedAutoDeacl * this.scene.fSpeed;
            this.dirSpeed = Math.max(this.dirSpeed, 0);
        }
        var rot = this.rotation - HALF_PI;
        this.x += this.dirSpeed * Math.cos(rot) * this.scene.fSpeed;
        this.y += this.dirSpeed * Math.sin(rot) * this.scene.fSpeed;
        var marginX = this.scene.game.config.width / 2;
        this.x = Math.min(Math.max(this.x, marginX), this.scene.worldDimensions.width - marginX);
        var marginY = this.scene.game.config.height / 2;
        this.y = Math.min(Math.max(this.y, marginY), this.scene.worldDimensions.height - marginY);
        this.updateThrusterParticles();
        this.body.postUpdate();
    };
    PlayerShip.prototype.updateThrusterParticles = function () {
        var rotation = HALF_PI + this.rotation;
        var hyp = (this.displayHeight * 0.2 / this.scene.cameras.main.zoom);
        var range = this.displayWidth * 0.34;
        var thrusterEjectPlace = Phaser.Math.Between(-range, range);
        var _opp = thrusterEjectPlace;
        var _adj = this.displayHeight * 0.2;
        var theta = Math.atan2(_adj, _opp);
        var _hyp = Math.sqrt(_opp * _opp + _adj * _adj);
        this.thrusterEmitter.setPosition(this.x + Math.cos(rotation) * hyp + Math.cos(this.rotation + theta) * _hyp, this.y + Math.sin(rotation) * hyp + Math.sin(this.rotation + theta) * _hyp);
        this.thrusterEmitter.setEmitterAngle(Phaser.Math.Between(40, 140));
        this.thrusterEmitter.setSpeed(30);
        this.thrusterEmitter.setRadial(true);
    };
    return PlayerShip;
}(PhysicsSprite_js_1.default));
exports.default = PlayerShip;

},{"./PhysicsSprite.js":5}],8:[function(require,module,exports){
"use strict";
// Title screen scenes
Object.defineProperty(exports, "__esModule", { value: true });
// import TitleScreenScene from "./scenes/titleScreen/TitleScreen.js";
// Space scenes
var MainScene_js_1 = require("./scenes/space/MainScene.js");
var EffectsScene_js_1 = require("./scenes/space/EffectsScene.js");
var DebugScene_js_1 = require("./scenes/space/DebugScene.js");
var UIDebugScene_js_1 = require("./scenes/space/UIDebugScene.js");
var StarLayerScene_js_1 = require("./scenes/space/StarLayerScene.js");
var PlanetScene_js_1 = require("./scenes/space/PlanetScene.js");
var StarLayer2Scene_js_1 = require("./scenes/space/StarLayer2Scene.js");
var StarLayer3Scene_js_1 = require("./scenes/space/StarLayer3Scene.js");
var StarLayer4Scene_js_1 = require("./scenes/space/StarLayer4Scene.js");
var MiniMapScene_js_1 = require("./scenes/space/MiniMapScene.js");
// Planet Scenes:
var PlatformingScene_js_1 = require("./scenes/planet/PlatformingScene.js");
/**
 * This is just a test of the Cartesian System with Phaser 3 it's not an actual plugin yet...
 * Just a prototype
 *
 * Also, I just realized I can't use arcade physics for space related stuff. I have to use MatterJs.
 * Also use vectors for space ships and space ship AI. Well maybe other things as well. I'd also want gravity. etc. etc.
 *
 */
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 450,
    pixelArt: true,
    // fps: {
    //     target: 300,
    //     forceSetTimeOut: true
    // },
    disableContextMenu: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [
        // Titlescreen scenes
        // TitleScreenScene,
        // Space scenes
        MainScene_js_1.default, UIDebugScene_js_1.default, DebugScene_js_1.default, PlanetScene_js_1.default, StarLayerScene_js_1.default, StarLayer2Scene_js_1.default, StarLayer3Scene_js_1.default, StarLayer4Scene_js_1.default, EffectsScene_js_1.default, MiniMapScene_js_1.default,
        // Planet scenes
        PlatformingScene_js_1.default
    ],
    mobile: true
};
var game = new Phaser.Game(config);
game.mobile = true;
// Debug/Dev only
// window.game = game;
// window.config = config;

},{"./scenes/planet/PlatformingScene.js":9,"./scenes/space/DebugScene.js":11,"./scenes/space/EffectsScene.js":12,"./scenes/space/MainScene.js":13,"./scenes/space/MiniMapScene.js":14,"./scenes/space/PlanetScene.js":15,"./scenes/space/StarLayer2Scene.js":16,"./scenes/space/StarLayer3Scene.js":17,"./scenes/space/StarLayer4Scene.js":18,"./scenes/space/StarLayerScene.js":19,"./scenes/space/UIDebugScene.js":20}],9:[function(require,module,exports){
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
var Player_js_1 = require("../../GameObjects/planet/Player.js");
var PlatformingScene = /** @class */ (function (_super) {
    __extends(PlatformingScene, _super);
    function PlatformingScene() {
        return _super.call(this, {
            key: "platforming",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: { y: 1000 }
                }
            }
        }) || this;
    }
    PlatformingScene.prototype.preload = function () {
        this.load.image("tiles", "./assets/levels/IcyTileset-extruded.png");
        this.load.image("spike", "./assets/levels/spike.png");
        this.load.tilemapTiledJSON("level1", "./assets/levels/level1.json");
        this.load.image("player", "./assets/levels/playerBlank.png");
    };
    PlatformingScene.prototype.create = function () {
        var _this = this;
        this.isPlayerDead = false;
        var background = this.add.graphics();
        background.fillStyle(0x00E9FF, 1);
        background.fillRect(0, 0, this.game.config.width, this.game.config.height);
        background.setScrollFactor(0);
        var tilemap = this.make.tilemap({ key: "level1" });
        var tileset = tilemap.addTilesetImage("IcyTileset-extruded", "tiles");
        var levelLayer = this.levelLayer = tilemap.createDynamicLayer("Level", tileset, 0, 0);
        this.spikeGroup = this.physics.add.staticGroup();
        var TILESET = {
            NO_TILE: 0,
            BRICK: 1,
            RIGHT_BRICK: 2,
            LEFT_BRICK: 3,
            TOP_BRICK: 4,
            TOP_LEFT_BRICK: 5,
            TOP_RIGHT_BRICK: 6,
            UNCONNECTED_BRICK: 7,
            UP_BRICK: 8,
            SPIKES: 9
        };
        levelLayer.forEachTile(function (tile) {
            if (tile.index === TILESET.SPIKES) {
                var cx = tile.getCenterX();
                var cy = tile.getCenterY();
                var spike = _this.spikeGroup.create(cx, cy, "spike");
                spike.body.setSize(16, 6).setOffset(0, 10);
                levelLayer.removeTileAt(tile.x, tile.y);
            }
        });
        var maxTileX = levelLayer.width / tileset.tileWidth;
        var maxTileY = levelLayer.height / tileset.tileHeight;
        var notBrick = function (tile) {
            return !tile || tile.index !== TILESET.BRICK &&
                tile.index !== TILESET.RIGHT_BRICK &&
                tile.index !== TILESET.LEFT_BRICK &&
                tile.index !== TILESET.TOP_BRICK &&
                tile.index !== TILESET.TOP_LEFT_BRICK &&
                tile.index !== TILESET.TOP_RIGHT_BRICK &&
                tile.index !== TILESET.UNCONNECTED_BRICK;
        };
        for (var x = 0; x < maxTileX; x++) {
            for (var y = 0; y < maxTileY; y++) {
                var curTile = levelLayer.getTileAt(x, y);
                if (!curTile || curTile.index !== 1) {
                    continue;
                }
                var leftTile = levelLayer.getTileAt(x - 1, y);
                var rightTile = levelLayer.getTileAt(x + 1, y);
                var upTile = levelLayer.getTileAt(x, y - 1);
                var downTile = levelLayer.getTileAt(x, y + 1);
                if (notBrick(upTile)) {
                    levelLayer.putTileAt(TILESET.TOP_BRICK, x, y);
                }
                if (notBrick(leftTile) && !notBrick(rightTile)) {
                    if (!notBrick(upTile)) {
                        levelLayer.putTileAt(TILESET.LEFT_BRICK, x, y);
                    }
                    else {
                        levelLayer.putTileAt(TILESET.TOP_LEFT_BRICK, x, y);
                    }
                }
                if (!notBrick(leftTile) && notBrick(rightTile)) {
                    if (!notBrick(upTile)) {
                        levelLayer.putTileAt(TILESET.RIGHT_BRICK, x, y);
                    }
                    else {
                        levelLayer.putTileAt(TILESET.TOP_RIGHT_BRICK, x, y);
                    }
                }
                if (notBrick(upTile) && notBrick(leftTile) && notBrick(rightTile) && notBrick(downTile)) {
                    levelLayer.putTileAt(TILESET.UNCONNECTED_BRICK, x, y);
                }
                if (notBrick(leftTile) && notBrick(rightTile)) {
                    if (notBrick(downTile)) {
                        levelLayer.putTileAt(TILESET.UNCONNECTED_BRICK, x, y);
                    }
                    else {
                        levelLayer.putTileAt(TILESET.UP_BRICK, x, y);
                    }
                }
            }
        }
        this.input.keyboard.addListener("keydown", function (event) {
            if (event.key === " ") {
                _this.gotoSpace();
            }
        });
        var playerSpawnPoint = tilemap.findObject("Objects", function (obj) { return obj.properties[0].value === "Player Spawn Point"; });
        this.player = new Player_js_1.default(this, playerSpawnPoint.x, playerSpawnPoint.y, "player");
        levelLayer.setCollisionByProperty({ collides: true });
        this.physics.world.addCollider(this.player, levelLayer);
        var camera = this.cameras.main;
        camera.startFollow(this.player);
        camera.setZoom(2.0, 2.0);
        camera.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels);
        this.physics.world.setBounds(0, 0, tilemap.widthInPixels, tilemap.heightInPixels, true, true, true, false);
    };
    PlatformingScene.prototype.gotoSpace = function () {
        this.scene.stop();
        this.scene.get("main").playerShip.y += 600;
        this.scene.get("main").playerShip.body.postUpdate();
        this.scene.run("main");
        this.scene.get("main").setupScenes();
    };
    PlatformingScene.prototype.update = function () {
        if (this.isPlayerDead) {
            return;
        }
        if (this.player.y > this.levelLayer.height || this.physics.world.overlap(this.player, this.spikeGroup)) {
            this.isPlayerDead = true;
            this.scene.restart();
        }
    };
    return PlatformingScene;
}(Phaser.Scene));
exports.default = PlatformingScene;

},{"../../GameObjects/planet/Player.js":1}],10:[function(require,module,exports){
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

},{"../../GameObjects/space/CameraShadow.js":2}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
var EffectsScene = /** @class */ (function (_super) {
    __extends(EffectsScene, _super);
    function EffectsScene() {
        return _super.call(this, "effects") || this;
    }
    EffectsScene.prototype.create = function () {
        this.updateCamera();
    };
    EffectsScene.prototype.update = function () {
        this.updateCamera();
    };
    EffectsScene.prototype.updateCamera = function () {
        var mainSceneCam = this.scene.get("main").cameras.main;
        var cam = this.cameras.main;
        cam.setScroll(mainSceneCam.scrollX, mainSceneCam.scrollY);
        cam.setZoom(mainSceneCam.zoom);
        cam.setRotation(mainSceneCam.rotation);
    };
    return EffectsScene;
}(Phaser.Scene));
exports.default = EffectsScene;

},{}],13:[function(require,module,exports){
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
var PlayerShip_js_1 = require("../../GameObjects/space/PlayerShip.js");
var EnemyShip_js_1 = require("../../GameObjects/space/EnemyShip.js");
var Nebula_js_1 = require("../../GameObjects/space/Nebula.js");
var MainScene = /** @class */ (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        return _super.call(this, "main") || this;
    }
    MainScene.prototype.preload = function () {
        this.load.scenePlugin({
            key: "CartesianSystemPlugin",
            url: "./js/libraries/CartesianSystemPlugin.js",
            sceneKey: 'csPlugin'
        });
        this.load.image("playerShip", "./assets/space/ships/player/ship.png");
        this.load.atlas("playerShipParticles", "./assets/space/ships/player/particles.png", "./assets/space/ships/player/particles.json");
        this.load.image("enemyShip", "./assets/space/ships/enemy/ship.png");
        this.load.image("icyDwarfPlanet", "./assets/space/planets/icyDwarfPlanet.png");
        this.load.image("redDustPlanet", "./assets/space/planets/RedDustPlanet.png");
        this.load.spritesheet("roughNebula", "./assets/space/nebula/roughNebula.png", {
            frameWidth: 64,
            frameHeight: 16
        });
        // For brevity
        this.game.config.halfWidth = this.game.config.width / 2;
        this.game.config.halfHeight = this.game.config.halfHeight / 2;
    };
    MainScene.prototype.addObjectsToWorld = function () {
        var world = this.csPlugin.world;
        this.playerShip = world.add.gameObjectArray(PlayerShip_js_1.default).add(this, 77900, 60500, "playerShip");
        var enemyShips = world.add.gameObjectArray(EnemyShip_js_1.default);
        var i, angle, length;
        for (i = 0; i < 45; i++) {
            angle = Math.random() * Math.PI * 2;
            length = Phaser.Math.Between(0, 1500);
            enemyShips.add(this, 77900 + Math.cos(angle) * length, 60500 + Math.sin(angle) * length, "enemyShip");
        }
        var nebulae = world.add.gameObjectArray(Nebula_js_1.default);
        this.createNebulaeCluster(nebulae, 77900, 53500, 70);
        this.createNebulaeCluster(nebulae, 74900, 51500, 70);
    };
    MainScene.prototype.createNebulaeCluster = function (nebulae, x, y, amt) {
        var i, j, posX, posY;
        for (i = 0; i < amt; i++) {
            posX = x + Phaser.Math.Between(-2000, 2000);
            posY = y + Phaser.Math.Between(-2000, 2000);
            for (j = 0; j < Phaser.Math.Between(2, 8); j++) {
                nebulae.add(this, posX, posY, "roughNebula", Phaser.Math.Between(0, 12));
            }
        }
    };
    MainScene.prototype.create = function () {
        this.worldDimensions = {
            width: 138000,
            height: 138000,
            cellWidth: 400,
            cellHeight: 400
        };
        this.csPlugin.setupWorld({
            camera: {
                window: {
                    x: 0,
                    y: 0,
                    width: this.game.config.width,
                    height: this.game.config.height
                }
            },
            grid: {
                cols: Math.floor(this.worldDimensions.width / this.worldDimensions.cellWidth),
                rows: Math.floor(this.worldDimensions.height / this.worldDimensions.cellHeight),
                cell: {
                    width: this.worldDimensions.cellWidth,
                    height: this.worldDimensions.cellHeight
                }
            },
        });
        this.addObjectsToWorld();
        this.setupWorldCameraFocus();
        this.setupCamera();
        this.setupScenes();
        this.setupCameraControls();
        this.fSpeed = 1;
        this.defaultFps = 30;
    };
    MainScene.prototype.setupScenes = function () {
        this.scene.run("UIDebug");
        this.scene.run("miniMap").bringToTop("miniMap");
        // Scenes that follow the camera:
        // this.scene.run("debug");
        this.scene.run("effects");
        this.scene.sendToBack("effects");
        this.scene.run("planet");
        this.scene.sendToBack("planet");
        this.scene.run("starLayer");
        this.scene.sendToBack("starLayer");
        this.scene.run("starLayer2");
        this.scene.sendToBack("starLayer2");
        this.scene.run("starLayer3");
        this.scene.sendToBack("starLayer3");
        this.scene.run("starLayer4");
        this.scene.sendToBack("starLayer4");
    };
    MainScene.prototype.switchToPlanet = function () {
        this.scene.sleep("UIDebug");
        this.scene.sleep("debug");
        this.scene.sleep("effects");
        this.scene.sleep("planet");
        this.scene.sleep("starLayer");
        this.scene.sleep("starLayer2");
        this.scene.sleep("starLayer3");
        this.scene.sleep("starLayer4");
        this.scene.sleep("miniMap");
        this.scene.sleep();
        this.scene.run("platforming");
    };
    MainScene.prototype.setupWorldCameraFocus = function () {
        var world = this.csPlugin.world;
        this.cameraFocus = new CameraShadow_js_1.default(this, this.csPlugin, 0, 0, 1);
        this.cameraFocus.setTarget(this.playerShip);
        world.cam.setFocus(this.cameraFocus.x, this.cameraFocus.y, "cameraFocus");
        world.cam.update();
    };
    MainScene.prototype.setupCamera = function () {
        var cam = this.cameras.main;
        cam.startFollow(this.playerShip);
        var world = this.csPlugin.world;
        var worldCamBounds = world.cam.getBounds();
        cam.setBounds(worldCamBounds.minX, worldCamBounds.minY, worldCamBounds.maxX - worldCamBounds.minX, worldCamBounds.maxY - worldCamBounds.minY);
        world.cam.defaultWindow = world.cam.getWindow();
        this.setCameraZoom(1);
    };
    MainScene.prototype.setupCameraControls = function () {
        var _this = this;
        this.cameraKeys = {
            '-': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.MINUS),
            '_': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UNDERSCORE),
            '=': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.EQUALS),
            '+': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PLUS),
            '0': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ZERO),
            'left': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
            'right': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
            'up': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
            'down': this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN)
        };
        var cam = this.cameras.main;
        this.input.on("wheel", function (pointer, gameObjects, deltaX, deltaY) {
            _this.setCameraZoom(Math.min(Math.max(cam.zoom - deltaY * 0.001, 0.25), 1.75));
        });
        // Mainly used for when the player presses both the keys at once to "reset" the camera 
        // so that when they let go they don't accidentally move the camera
        this.canRotateCamera = true;
        // Same goes for this one
        this.canZoomUsingUpOrDown = true;
    };
    MainScene.prototype.runCameraControls = function () {
        var _this = this;
        var cam = this.cameras.main;
        if (this.canZoomUsingUpOrDown && this.cameraKeys['down'].isDown || this.cameraKeys['-'].isDown || this.cameraKeys['_'].isDown) {
            this.setCameraZoom(Math.max(cam.zoom - 0.01, 0.25));
        }
        if (this.canZoomUsingUpOrDown && this.cameraKeys['up'].isDown || this.cameraKeys['='].isDown || this.cameraKeys['+'].isDown) {
            this.setCameraZoom(Math.min(cam.zoom + 0.01, 1.75));
        }
        if (this.cameraKeys['down'].isDown && this.cameraKeys['up'].isDown) {
            this.setCameraZoom(1);
            this.canZoomUsingUpOrDown = false;
            this.time.delayedCall(500, function () {
                _this.canZoomUsingUpOrDown = true;
            });
        }
        if (this.cameraKeys['0'].isDown) {
            this.setCameraZoom(1);
        }
        if (this.canRotateCamera) {
            if (this.cameraKeys['left'].isDown) {
                this.setCameraRotation(this.cameras.main.rotation - Math.PI * 0.01);
            }
            if (this.cameraKeys['right'].isDown) {
                this.setCameraRotation(this.cameras.main.rotation + Math.PI * 0.01);
            }
        }
        if (this.cameraKeys['left'].isDown && this.cameraKeys['right'].isDown) {
            this.setCameraRotation(0);
            this.canRotateCamera = false;
            this.time.delayedCall(500, function () {
                _this.canRotateCamera = true;
            });
        }
    };
    MainScene.prototype.setCameraZoom = function (zoom) {
        this.cameras.main.setZoom(zoom);
        this.recalculateWorldCamWindow();
    };
    MainScene.prototype.setCameraRotation = function (rotation) {
        this.cameras.main.setRotation(rotation);
        this.recalculateWorldCamWindow();
    };
    MainScene.prototype.recalculateWorldCamWindow = function () {
        var world = this.csPlugin.world;
        var cam = this.cameras.main;
        var defaultWindow = world.cam.defaultWindow;
        var upperLeft = {};
        var lowerLeft = {};
        var upperRight = {};
        var lowerRight = {};
        defaultWindow.halfWidth = defaultWindow.width / 2;
        defaultWindow.halfHeight = defaultWindow.height / 2;
        var reuseHyp = Math.sqrt(Math.pow(defaultWindow.halfWidth, 2) + Math.pow(defaultWindow.halfHeight, 2));
        var startingAngle = Math.tan(defaultWindow.halfHeight, defaultWindow.halfWidth) + cam.rotation;
        upperLeft.angle = startingAngle + Math.PI * 1.5;
        upperLeft.x = Math.cos(upperLeft.angle) * reuseHyp;
        upperLeft.y = Math.sin(upperLeft.angle) * reuseHyp;
        lowerLeft.angle = startingAngle + Math.PI;
        lowerLeft.x = Math.cos(lowerLeft.angle) * reuseHyp;
        lowerLeft.y = Math.sin(lowerLeft.angle) * reuseHyp;
        upperRight.angle = startingAngle;
        upperRight.x = Math.cos(upperRight.angle) * reuseHyp;
        upperRight.y = Math.sin(upperRight.angle) * reuseHyp;
        lowerRight.angle = startingAngle + Math.PI / 2;
        lowerRight.x = Math.cos(lowerRight.angle) * reuseHyp;
        lowerRight.y = Math.sin(lowerRight.angle) * reuseHyp;
        var minX = Math.min(upperLeft.x, lowerLeft.x, upperRight.x, lowerRight.x);
        var maxX = Math.max(upperLeft.x, lowerLeft.x, upperRight.x, lowerRight.x);
        var minY = Math.min(upperLeft.y, lowerLeft.y, upperRight.y, lowerRight.y);
        var maxY = Math.max(upperLeft.y, lowerLeft.y, upperRight.y, lowerRight.y);
        var x = minX;
        var y = minY;
        var width = maxX - minX;
        var height = maxY - minY;
        var derivedCamWindowWidth = width / cam.zoom;
        var derivedCamWindowHeight = height / cam.zoom;
        this.csPlugin.world.cam.setWindow(x - (derivedCamWindowWidth - width) / 2, y - (derivedCamWindowHeight - height) / 2, derivedCamWindowWidth, derivedCamWindowHeight);
    };
    MainScene.prototype.update = function (time, delta) {
        // Camera
        this.cameraFocus.update();
        this.csPlugin.world.cam.updateFocus(this.cameraFocus.x, this.cameraFocus.y);
        this.runCameraControls();
        // World
        this.csPlugin.updateCS();
        this.fSpeed = (delta / 1000) * this.defaultFps;
    };
    return MainScene;
}(Phaser.Scene));
exports.default = MainScene;

},{"../../GameObjects/space/CameraShadow.js":2,"../../GameObjects/space/EnemyShip.js":3,"../../GameObjects/space/Nebula.js":4,"../../GameObjects/space/PlayerShip.js":7}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"../../GameObjects/space/Planet.js":6,"./BaseBackgroundScene.js":10}],16:[function(require,module,exports){
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

},{"../../GameObjects/space/CameraShadow.js":2}],17:[function(require,module,exports){
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
var StarLayer3Scene = /** @class */ (function (_super) {
    __extends(StarLayer3Scene, _super);
    function StarLayer3Scene() {
        return _super.call(this, "starLayer3", "csStars3") || this;
    }
    StarLayer3Scene.prototype.preload = function () {
        this.preloadWorld();
    };
    StarLayer3Scene.prototype.create = function () {
        this.starsPerCell = 20;
        this.starSize = 1;
        this.starScroll = 0.5;
        this.createWorld();
        this.createStars();
    };
    StarLayer3Scene.prototype.update = function () {
        this.updateWorldCamera();
        this.renderStars();
    };
    StarLayer3Scene.prototype.createStars = function () {
        this.starLayer = this.add.graphics();
        var world = this.csStars3.world;
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
    StarLayer3Scene.prototype.renderStars = function () {
        var _this = this;
        this.starLayer.clear();
        this.starLayer.fillStyle(0xFFFFFF);
        var world = this.csStars3.world;
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
    return StarLayer3Scene;
}(BaseBackgroundScene_js_1.default));
exports.default = StarLayer3Scene;

},{"./BaseBackgroundScene.js":10}],18:[function(require,module,exports){
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

},{"./BaseBackgroundScene.js":10}],19:[function(require,module,exports){
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

},{"./BaseBackgroundScene.js":10}],20:[function(require,module,exports){
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

},{}]},{},[8]);
