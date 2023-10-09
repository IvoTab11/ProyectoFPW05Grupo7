class Escena2 extends Phaser.Scene{
    constructor(){
        super("Escena2");
        this.platforms = null;
    }

    preload(){
        this.load.image('sky', '../public/img/sky.png')
       // this.c/load.image('nave', '../public/img/nave.png', {frameWidth: 200, frameHeight: 200})
        this.load.spritesheet('nave', '../public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.image('red', '../public/img/red.png')

    }

    create(){
        this.add.image(400, 300, 'sky');
        let particles = this.add.particles(0,0,'red',{
            speed:100,
            angle:{min:150,max:210},
            scale:{start:1,end:0},
            blendMode: 'ADD'
        });
        this.player = this.physics.add.sprite(100,100,'nave');
        particles.startFollow(this.player);
        
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
            });
            this.anims.create({
            key: 'down',
            frames: [ { key: 'nave', frame: 1 } ],
            frameRate: 20
            });
            this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
            });
            this.anims.create({
                key: 'up',
                frames: this.anims.generateFrameNumbers('nave', { start: 2, end: 2 }),
                frameRate: 10,
                repeat: -1
                });
        

            this.cursors = this.input.keyboard.createCursorKeys();
            
        

    }

     update() {
        if (this.cursors.left.isDown) {
         this.player.setVelocityX(-160);
         this.player.anims.play('left', true);
         }
         else if (this.cursors.right.isDown) {
         this.player.setVelocityX(160);
         this.player.anims.play('right', true);
         }
         else if (this.cursors.up.isDown ) {
         this.player.setVelocityY(-160);
         this.player.anims.play('up');
         }
         else if(this.cursors.down.isDown){
            this.player.setVelocityY(160);
            this.player.anims.play('down');
         }
         else{
            this.player.setVelocityY(0);
            this.player.setVelocityX(0);
            this.player.anims.play('right');
         }
         this.player.setCollideWorldBounds(true);
         }

}
export default Escena2;