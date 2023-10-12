class Escena3 extends Phaser.Scene{
    constructor(){
        super("Escena3");
        this.platforms = null;
        this.lifeText="";
        this.life=100;
        this.scoreText="";
        this.score=0;
        this.bossLifeText="";
        this.bossLife=700;

    }

    preload(){
        this.load.image('sky', '../public/img/sky.png')
        this.load.spritesheet('nave', '../public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.image('red', '../public/img/red.png')
        this.load.image('boss', '../public/img/enemyBoss.png')
        this.load.image('bullet', '../public/img/shoot.png')
        this.load.image('shootEnemy', '../public/img/shootEnemy.png')

    }

    create(data){
        this.add.image(400, 300, 'sky');
        this.sonidoDisparo = data.sonidoDisparo;
        let particles = this.add.particles(0,0,'red',{
            speed:100,
            angle:{min:150,max:210},
            scale:{start:1,end:0},
            blendMode: 'ADD'
        });
        this.boss= this.physics.add.staticGroup();
        this.boss.create(600,300,'boss',).setScale(0.75).setAngle(90).setSize(300,450).setOffset(150,-40);
        this.player = this.physics.add.sprite(100,100,'nave');
        particles.startFollow(this.player);
        this.Shoot = this.physics.add.group();
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                this.createBossShoots();
            },
            callbackScope: this,
            repeat: -1,
        });
                
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
            
        this.lifeText = this.add.text(16, 16, 'life:' + this.life , { fontSize: '24px', fill: '#FFF' }); 
        this.scoreText = this.add.text(16, 40, 'score: 0', { fontSize: '24px', fill: '#FFF' }); 
        this.bossLifeText = this.add.text(550,16, 'boss life:' + this.bossLife, {fontSize: '24px', fill: '#FFF'})
        this.physics.add.overlap(this.player, this.boss, this.collide, null, this); 
        this.physics.add.overlap(this.Shoot, this.boss, this.collideShoot, null, this);       

        this.input.keyboard.on('keydown-A', event =>
        {
            this.Shoot.create(this.player.x,this.player.y,'bullet').setVelocityX(300);
            this.sonidoDisparo.play();
        });

    }
    createBossShoots() {
        let bossShootGroup = this.physics.add.group();
        let shootHorizontalDistance = 500;
        for (let i = 0; i < 10; i++){
            let shootHeightPosition= Phaser.Math.Between(100,500);
            let bossShoot = bossShootGroup.create(shootHorizontalDistance, shootHeightPosition, 'shootEnemy');
            this.shootHorizontalDistance = shootHorizontalDistance + 300;
            bossShoot.body.velocity.x = -150;
            bossShoot.checkWorldBounds=true;
            bossShoot.on('outOfBounds',() =>{
                bossShoot.destroy();
             });
         }
        this.physics.add.overlap(this.player, bossShootGroup, this.impact, null, this);
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
    collide(player, boss) { //Colisión entre el jugador y el boss
        this.life -= 0.5;
        this.lifeText.setText('life: ' + this.life);
        if(this.life <= 0){
            this.sound.stopAll();
            gameOver=true;
            }
    }
    collideShoot(Shoot, boss) { //Colisión entre el disparo y el boss
         Shoot.disableBody(true, true);
         this.bossLife -= 10;
         this.bossLifeText.setText('life: ' + this.bossLife);
         if(this.bossLife <= 0){
            this.sound.stopAll();
            this.scene.start('Escena4');
             }
     }
    impact(player, bossShoot){  // Colisión entre el disparo del boss y el player
        bossShoot.disableBody(true,true);
        this.life -= 5;
        this.lifeText.setText('life: ' + this.life);
        if(this.life <= 0){
            this.sound.stopAll();
            gameOver=true;
            }
    }

}
export default Escena3;