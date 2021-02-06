export default class TreasureChest extends Phaser.Physics.Arcade.Image
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {number} x 
     * @param {number} y 
     * @param {string} texture 
     * @param {number | string} frame
     */
    constructor(scene, x, y, texture, frame)
    {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
    }
}