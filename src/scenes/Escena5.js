class Escena5 extends Phaser.Scene{
    constructor(){
        super("Escena5");
        this.platforms = null;
        this.scoreText= "";
    }
    init(data){
        this.score=data.score;
    }   


    preload(){
        this.load.image('perder', '../public/img/gameover.jpg', {frameWidth:200, frameHeight:200})
        this.load.audio('sonido', '../public/sounds/musica_fondo.mp3')
    }

    create(){
       
        this.add.image(400, 300, 'perder');
        let audio = this.sound.add('sonido', {loop: true});
        this.input.keyboard.on('keydown-SPACE', function () {
            // Cambiar a la Escena2 (restart)
              this.score=0;
              this.life=100;
              this.scene.start('Escena2');
              //this.score=0;
              //this.scoreText = this.add.text(16, 16, 'score:' + this.score, { fontSize: '32px', fill: '#FFFFFF' }); 
              audio.play();
           }, this);
       } 
   
    }

export default Escena5;