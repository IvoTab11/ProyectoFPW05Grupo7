class Escena4 extends Phaser.Scene{
    constructor(){
        super("Escena4");
        this.platforms = null;
    }

    preload(){
        this.load.image('ganar', '../public/img/win.jpg', {frameWidth: 200, frameHeight: 200})
        this.load.audio('sonido', '../public/sounds/musica_fondo.mp3')
    }

    create(){
        this.add.image(400, 300, 'ganar');
        let audio = this.sound.add('sonido', {loop: true});
        this.input.keyboard.on('keydown-SPACE', function () {
         // Cambiar a la Escena2 (restart)
         this.score=0;
         this.life=100;
           this.scene.start('Escena2');
           audio.play();
        }, this);
    } 

    // update(){
    //     if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
    //         this.scene.start('Escena2');
    //     }
    // }
}
export default Escena4;