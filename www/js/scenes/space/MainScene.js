"use strict";

import CameraShadow from "../../GameObjects/space/CameraShadow.js";
import PlayerShip from "../../GameObjects/space/PlayerShip.js";
import EnemyShip from "../../GameObjects/space/EnemyShip.js";
import Nebula from "../../GameObjects/space/Nebula.js";

export default class MainScene extends Phaser.Scene 
{
    constructor ()
    {
        super("main");
    }

    preload ()
    {
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
    }

    addObjectsToWorld ()
    {
        let world = this.csPlugin.world;

        this.playerShip = world.add.gameObjectArray(PlayerShip).add(this, 77900, 60500, "playerShip");

        let enemyShips = world.add.gameObjectArray(EnemyShip);

        var i, angle, length;
        for(i = 0; i < 45; i++)
        {
            angle = Math.random() * Math.PI * 2;
            length = Phaser.Math.Between(0, 1500);
            enemyShips.add(this, 77900 + Math.cos(angle) * length, 60500 + Math.sin(angle) * length, "enemyShip");
        }

        var nebulae = world.add.gameObjectArray(Nebula);

        this.createNebulaeCluster(nebulae, 77900, 53500, 70);
        this.createNebulaeCluster(nebulae, 74900, 51500, 70);
    }

    createNebulaeCluster (nebulae, x, y, amt)
    {
        var i, j, posX, posY;

        for(i = 0; i < amt; i++)
        {
            posX = x + Phaser.Math.Between(-2000, 2000);
            posY = y + Phaser.Math.Between(-2000, 2000);

            for(j = 0; j < Phaser.Math.Between(2, 8); j++)
            {
                nebulae.add(this, posX, posY, "roughNebula", Phaser.Math.Between(0, 12));
            }
        }
    }

    create ()
    {
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
    }

    setupScenes ()
    {
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
    }

    switchToPlanet ()
    {
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
    }

    setupWorldCameraFocus ()
    {
        let world = this.csPlugin.world;

        this.cameraFocus = new CameraShadow(this, this.csPlugin, 0, 0, 1);
        this.cameraFocus.setTarget(this.playerShip);

        world.cam.setFocus(this.cameraFocus.x, this.cameraFocus.y, "cameraFocus");
        world.cam.update();
    }

    setupCamera ()
    {
        var cam = this.cameras.main;
        cam.startFollow(this.playerShip);

        var world = this.csPlugin.world;

        var worldCamBounds = world.cam.getBounds();

        cam.setBounds(
            worldCamBounds.minX, 
            worldCamBounds.minY, 
            worldCamBounds.maxX - worldCamBounds.minX, 
            worldCamBounds.maxY - worldCamBounds.minY
        );
        world.cam.defaultWindow = world.cam.getWindow();

        this.setCameraZoom(1);
    }

    setupCameraControls ()
    {
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

        this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY) => 
        {
            
            this.setCameraZoom(Math.min(Math.max(cam.zoom - deltaY * 0.001, 0.25), 1.75));   
        });

        // Mainly used for when the player presses both the keys at once to "reset" the camera 
        // so that when they let go they don't accidentally move the camera
        this.canRotateCamera = true;
        // Same goes for this one
        this.canZoomUsingUpOrDown = true;

        this.input.addPointer(1);
    }

    runCameraControls ()
    {
        var cam = this.cameras.main;

        if(this.canZoomUsingUpOrDown && this.cameraKeys['down'].isDown || this.cameraKeys['-'].isDown || this.cameraKeys['_'].isDown)
        {
            this.setCameraZoom(Math.max(cam.zoom - 0.01, 0.25));
        }

        if(this.canZoomUsingUpOrDown && this.cameraKeys['up'].isDown || this.cameraKeys['='].isDown || this.cameraKeys['+'].isDown)
        {
            this.setCameraZoom(Math.min(cam.zoom + 0.01, 1.75));     
        }

        if(this.cameraKeys['down'].isDown && this.cameraKeys['up'].isDown)
        {
            this.setCameraZoom(1);   

            this.canZoomUsingUpOrDown = false;

            this.time.delayedCall(500, () =>
            {
                this.canZoomUsingUpOrDown = true;
            });
        }

        if(this.cameraKeys['0'].isDown)
        {
            this.setCameraZoom(1);
        }

        if(this.canRotateCamera)
        {
            if(this.cameraKeys['left'].isDown)
            {
                this.setCameraRotation(this.cameras.main.rotation - Math.PI * 0.01);
            }
            if(this.cameraKeys['right'].isDown)
            {
                this.setCameraRotation(this.cameras.main.rotation + Math.PI * 0.01);
            }
        }

        if(this.cameraKeys['left'].isDown && this.cameraKeys['right'].isDown)
        {
            this.setCameraRotation(0);

            this.canRotateCamera = false;

            this.time.delayedCall(500, () =>
            {
                this.canRotateCamera = true;
            }); 
        }

        if(this.input.pointer1.isDown && this.input.pointer2.isDown)
        {
            var p1 = this.input.pointer1;
            var p2 = this.input.pointer2;

            var dx = p1.x - p2.x;
            var dy = p1.y - p2.y;

            var pointerDistSq = dx * dx + dy * dy;

            // Might get rid of XX !== undefined
            if(this.lastPointerDistSq !== undefined) //&& this.lastPointerDistSq < pointerDistSq)
            {
                this.setCameraZoom(Math.max(Math.min(cam.zoom + (Math.sqrt(pointerDistSq) - Math.sqrt(this.lastPointerDistSq)) * 0.01, 1.75), 0.25));     
            }

            this.lastPointerDistSq = pointerDistSq;
        }
    }

    setCameraZoom (zoom)
    {
        this.cameras.main.setZoom(zoom);

        this.recalculateWorldCamWindow();
    }

    setCameraRotation (rotation)
    {
        this.cameras.main.setRotation(rotation);

        this.recalculateWorldCamWindow();
    }

    recalculateWorldCamWindow ()
    {
        var world = this.csPlugin.world;
        var cam = this.cameras.main;

        var defaultWindow = world.cam.defaultWindow;

        let upperLeft = {};
        let lowerLeft = {};
        let upperRight = {};
        let lowerRight = {};

        defaultWindow.halfWidth = defaultWindow.width / 2;
        defaultWindow.halfHeight = defaultWindow.height / 2;

        let reuseHyp = Math.sqrt(Math.pow(defaultWindow.halfWidth, 2) + Math.pow(defaultWindow.halfHeight, 2));
        let startingAngle = Math.tan(defaultWindow.halfHeight, defaultWindow.halfWidth) + cam.rotation;

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

        this.csPlugin.world.cam.setWindow(
            x - (derivedCamWindowWidth - width) / 2, 
            y - (derivedCamWindowHeight - height) / 2, 
            derivedCamWindowWidth,
            derivedCamWindowHeight
        );
    }

    update (time, delta)
    {
        // Camera
        this.cameraFocus.update();
        this.csPlugin.world.cam.updateFocus(this.cameraFocus.x, this.cameraFocus.y);
        this.runCameraControls();

        // World
        this.csPlugin.updateCS();

        this.fSpeed = (delta / 1000) * this.defaultFps;
    }   
}