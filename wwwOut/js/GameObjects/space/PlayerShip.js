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
//# sourceMappingURL=PlayerShip.js.map