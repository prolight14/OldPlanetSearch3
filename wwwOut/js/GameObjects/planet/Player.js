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
//# sourceMappingURL=Player.js.map