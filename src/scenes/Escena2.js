class Escena2 extends Phaser.Scene{
    constructor(){
        super("Escena2");
        this.platforms = null;
        this.lifeText="";
        this.life= 100 ;
        this.scoreText="";
        this.score=0;
       
    }

    preload(){
        this.load.image('sky', '../public/img/sky.jpg')
        this.load.spritesheet('nave', '../public/img/nave.png', { frameWidth: 70, frameHeight: 62 });
        this.load.image('red', '../public/img/red.png')
        this.load.image('bullet', '../public/img/shoot.png')
        this.load.image('enemy', '../public/img/enemy.png')
        this.load.audio('disparo', '../public/sounds/disparo.mp3')
    }
    create(){
        this.add.image(400, 300, 'sky');
        let sonidoDisparo = this.sound.add('disparo', {volume: 0.1});
        let particles = this.add.particles(0,0,'red',{
            speed:100,
            angle:{min:150,max:210},
            scale:{start:1,end:0},
            blendMode: 'ADD'
        });

   
    this.player = this.physics.add.sprite(100,100,'nave');
    particles.startFollow(this.player);
    this.Shoot = this.physics.add.group();
    this.time.addEvent({ //Indica la accion que se repetira cada 1500 milisegundos
        delay: 1500,
        callback: () => {
            this.createEnemies();
        },
        callbackScope: this,
        repeat: -1,
    });
            
    this.anims.create({//Crea las animaciones del personaje
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
        
    //Ubica y define el color y el tamaño de el puntaje y la vida del player en la pantalla 
    this.lifeText = this.add.text(16, 16, 'life:' + this.life , { fontSize: '24px', fill: '#FFF' }); 
    this.scoreText = this.add.text(16, 40, 'score: 0', { fontSize: '24px', fill: '#FFF' }); 

    this.input.keyboard.on('keydown-A', event =>//Indicamos que si se presiona la tecla 'A' el player va a disparar
    {
        this.Shoot.create(this.player.x,this.player.y,'bullet').setVelocityX(300);
        sonidoDisparo.play();
        //sonidoDisparo.volume -= 0.5;
    });

}

    createEnemies() {// Creador de enemigos, actualiza su posicion y los destruye
        let enemyGroup = this.physics.add.group();
        let enemiesHorizontalDistance = 790;
        for (let i = 0; i < 7; i++){
            let enemiesHeightPosition= Phaser.Math.Between(20,580);
            let enemies = enemyGroup.create(enemiesHorizontalDistance, enemiesHeightPosition, 'enemy');
            this.enemiesHorizontalDistance = enemiesHorizontalDistance + 300;
            enemies.body.velocity.x = -150;
            enemies.checkWorldBounds=true;
            enemies.on('outOfBounds',() =>{
            enemies.destroy();
                });
             }
            //Detecta la colision entre el player y las enemigos y la colision entre las balas y los enemigos
            this.physics.add.overlap(this.player, enemyGroup, this.impact, null, this);
            this.physics.add.overlap(this.Shoot, enemyGroup, this.collideShoot, null, this); 
        }



         update() {//Actualizacion de la posicion del personaje con su respectiva animacion
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




        collideShoot(Shoot, enemies) { //Colisión entre el disparo y los enemigos
            Shoot.disableBody(true, true);
            enemies.disableBody(true,true);
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            if(this.score > 250){
            this.scene.start('Escena3'); //Celi esta pasa al level de Nico osea no la toques D:<

              }
        }

        impact(player, enemies){  // Colisión entre el player y los enemigos
         enemies.disableBody(true,true);
            this.life -= 25;
            this.lifeText.setText('life: ' + this.life + '%');
            if(this.life <= 0){
            this.scene.start('Escena5');
                  }
            }       
}


export default Escena2;