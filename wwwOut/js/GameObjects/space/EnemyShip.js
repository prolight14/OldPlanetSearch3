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
//# sourceMappingURL=EnemyShip.js.map