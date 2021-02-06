import PhysicsSprite from "./PhysicsSprite.js";

const HALF_PI = Math.PI / 2;

export default class PlayerShip extends PhysicsSprite
{
    /**
     * 
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     * @param {string} frame 
     */
    constructor (scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        this.keys = {
            a: scene.input.keyboard.addKey('a'), 
            d: scene.input.keyboard.addKey('d'),
            w: scene.input.keyboard.addKey('w'),
            s: scene.input.keyboard.addKey('s')
        };

        this.setScale(2, 2);

        this.dirSpeed = 0;
        this.dirSpeedAcl = 0.5;
        this.dirSpeedDeacl = 0.2;
        this.dirSpeedAutoDeacl = 0.2;
        this.maxDirSpeed = 20;
        this.minDirSpeed = -3;
        this.rotSpeed = 4;

        this.thrusterEmitter = this.scene.scene.get("effects").add.particles("playerShipParticles").createEmitter({
            frame: ["particle1", "particle2", "particle3", "particle4"],
            x: this.x,
            y: this.y,
            speed: 200,
            lifespan: 700
        });

        scene.events.on("sleep", () =>
        {
            for(var i in this.keys)
            {
                this.keys[i].reset();
            }
        });

        if(scene.game.mobile)
        {
            scene.input.on("pointerdown", this.setRotationBasedOnPointer, this);
            scene.input.on("pointermove", this.setRotationBasedOnPointer, this);
        }
    }

    setRotationBasedOnPointer (pointer)
    {
        this.setRotation(Phaser.Math.Angle.Between(this.x, this.y, pointer.worldX, pointer.worldY) + HALF_PI);
    }

    preUpdate ()
    {
        if(this.scene.game.mobile)
        {
            if(this.scene.input.activePointer.isDown)
            {
                var pointer = this.scene.input.activePointer;
                this.dirSpeed += /*this.dirSpeedAcl */ this.scene.fSpeed * Math.sqrt(Math.pow(this.x - pointer.worldX, 2) + Math.pow(this.y - pointer.worldY, 2)) / 100;
                this.dirSpeed = Math.min(this.dirSpeed, this.maxDirSpeed);
            }
            else
            {
                this.dirSpeed -= this.dirSpeedAutoDeacl * this.scene.fSpeed;
                this.dirSpeed = Math.max(this.dirSpeed, 0);
            }
        }

        if(this.keys.a.isDown)
        {
            this.setRotation(this.rotation - this.rotSpeed * Phaser.Math.DEG_TO_RAD * this.scene.fSpeed);
        }
        if(this.keys.d.isDown)
        {
            this.setRotation(this.rotation + this.rotSpeed * Phaser.Math.DEG_TO_RAD * this.scene.fSpeed);
        }

        if(this.keys.w.isDown)
        {
            this.dirSpeed += this.dirSpeedAcl * this.scene.fSpeed;
            this.dirSpeed = Math.min(this.dirSpeed, this.maxDirSpeed);
        }
        else if(this.keys.s.isDown)
        {
            this.dirSpeed -= this.dirSpeedDeacl * this.scene.fSpeed;
            this.dirSpeed = Math.max(this.dirSpeed, this.minDirSpeed);
        }
        else
        {
            this.dirSpeed -= this.dirSpeedAutoDeacl * this.scene.fSpeed;
            this.dirSpeed = Math.max(this.dirSpeed, 0);
        }

        var rot = this.rotation - HALF_PI; 
        this.x += this.dirSpeed * Math.cos(rot) * this.scene.fSpeed;
        this.y += this.dirSpeed * Math.sin(rot) * this.scene.fSpeed;

        let marginX = this.scene.game.config.width / 2;
        this.x = Math.min(Math.max(this.x, marginX), this.scene.worldDimensions.width - marginX);
        let marginY = this.scene.game.config.height / 2;
        this.y = Math.min(Math.max(this.y, marginY), this.scene.worldDimensions.height - marginY);

        this.updateThrusterParticles();

        this.body.postUpdate();
    }

    updateThrusterParticles ()
    {
        var rotation = HALF_PI + this.rotation;
        var hyp = (this.displayHeight * 0.2 / this.scene.cameras.main.zoom);
        var range = this.displayWidth * 0.34;
        var thrusterEjectPlace = Phaser.Math.Between(-range, range);

        var _opp = thrusterEjectPlace;
        var _adj = this.displayHeight * 0.2;
        
        var theta = Math.atan2(_adj, _opp);
        var _hyp = Math.sqrt(_opp * _opp + _adj * _adj);

        this.thrusterEmitter.setPosition(
            this.x + Math.cos(rotation) * hyp + Math.cos(this.rotation + theta) * _hyp, 
            this.y + Math.sin(rotation) * hyp + Math.sin(this.rotation + theta) * _hyp
        );

        this.thrusterEmitter.setEmitterAngle(Phaser.Math.Between(40, 140));
        this.thrusterEmitter.setSpeed(30);
        this.thrusterEmitter.setRadial(true);
    }
}