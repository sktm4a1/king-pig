import Phaser from "phaser";

const scene = {
  preload() {
    this.load.setBaseURL("https://labs.phaser.io");
    this.load.image("sky", "assets/skies/space3.png");
    this.load.image("logo", "assets/sprites/phaser3-logo.png");
    this.load.image("red", "assets/particles/red.png");
  },
  create() {
    this.add.image(400, 300, "sky");
    //   this.add.sprite(400,300,'logo').setName('logoName')

    const emitter = this.add.particles(0, 0, "red", {  // 粒子效果
      speed: 300,
      scale: { start: 1, end: 0 },
      blendMode: "ADD",
    });

    const openingText = this.add.text(0, 0, "Press Space to Start", {
      fontFamily: "Monaco, Courier",
      fontSize: 50,
      fill: "#fff",
    });
    openingText.setOrigin(0);

    //   var logo = this.physics.add.image(400, 100, "logo");
    const logo = this.physics.add.sprite(400, 300, "logo").setName("logoName");

    logo.setVelocity(300, 200); // 速度
    logo.setBounce(1, 1); // 弹跳
    logo.setCollideWorldBounds(true); // 碰撞世界边界

    emitter.startFollow(logo);
  },
  update() {
    const sprite = this.children.getByName('logoName')
    sprite.x += 1;
  }
};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene
};

const game = new Phaser.Game(config);
console.log("device: ", game.device);
