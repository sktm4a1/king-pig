import Phaser from "phaser";
import kingRunImg from "../static/Sprites/01-King Human/Run (78x58).png"
import platform from "../static/Sprites/14-TileSets/platform.png"
import kingIdleImg from "../static/Sprites/01-King Human/Idle (78x58).png"
import kingJump from "../static/Sprites/01-King Human/Jump (78x58).png"
import kingFall from "../static/Sprites/01-King Human/Fall (78x58).png"
import kingAttack from "../static/Sprites/01-King Human/Attack (78x58).png"

const scene = {
    preload() {
        this.load.image('platform', platform)
        this.load.image('king-jump', kingJump)
        this.load.image("king-fall", kingFall)
        this.load.spritesheet('king-run', kingRunImg, {frameWidth: 78 ,frameHeight: 58})
        this.load.spritesheet('king-attack', kingAttack, {frameWidth: 78 ,frameHeight: 58})
        this.load.spritesheet('king-idle', kingIdleImg, {frameWidth: 78 ,frameHeight: 58})
    },
    create() {
        this.king = this.physics.add.sprite(400, 300, 'king-idle')
        this.king.body.setSize(34, 30);
        this.king.setInteractive()
        this.isKingAttack = false;
        this.anims.create({
            key: 'king-idle',
            frames: this.anims.generateFrameNumbers('king-idle'),
            repeat: -1
        });
        this.anims.create({
            key: 'king-run',
            frames: this.anims.generateFrameNumbers('king-run'),
            repeat: -1
        });
        this.anims.create({
            key: 'king-attack',
            frames: this.anims.generateFrameNumbers('king-attack'),
            repeat: 0
        });
        this.king.play('king-idle', true)
        this.king.on('pointerdown', (pointer) => {
            console.log(pointer);
        })
        this.king.on('animationcomplete', (animation) => {
            if (animation.key === "king-attack") {
                this.isKingAttack = false;
            }
        })

        const platform = this.physics.add.sprite(400, 400, 'platform');
        platform.body.allowGravity = false;
        platform.body.immovable = true;

        this.physics.add.collider(this.king, platform) // 添加碰撞

        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.setZoom(2);
    },
    update() {
        if(this.cursors.left.isDown) {
            this.king.setFlipX(true)
            this.king.body.setVelocityX(-100)
            !this.isKingAttack && this.king.play('king-run', true)
        }
        if(this.cursors.right.isDown) {
            this.king.setFlipX(false)
            this.king.body.setVelocityX(100)
            !this.isKingAttack && this.king.anims.play('king-run', true); // 正在播放时重复调用无效
        }
        if(this.cursors.up.isDown && this.king.body.onFloor()) {
            this.king.body.setVelocityY(-200);
        }
        if(this.cursors.left.isUp && this.cursors.right.isUp) {
            this.king.body.setVelocityX(0);
            !this.isKingAttack && this.king.play('king-idle', true)
        }
        if(this.king.body.velocity.y < 0) {
            this.king.setTexture('king-jump')
        }
        if(this.king.body.velocity.y > 0) {
            this.king.setTexture('king-fall')
        }
        if(this.cursors.space.isDown && this.king.body.onFloor() && !this.isKingAttack) {
            this.isKingAttack = true;
            this.king.play('king-attack', true);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 300 },
        debug: false
      }
    },
    scene
  };
  
const game = new Phaser.Game(config);
