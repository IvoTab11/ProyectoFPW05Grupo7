class Escena1 extends Phaser.Scene{
    constructor(){
        super("Escena1");
        this.platforms = null;
    }

    preload(){
        this.load.image('inicio', '../public/img/spacerivals.jpg', {frameWidth: 200, frameHeight: 200})
        this.load.audio('sonido', '../public/sounds/musica_fondo.mp3')
    }

    create(){
        this.add.image(400, 300, 'inicio');
        let audio = this.sound.add('sonido', {loop: true});
        this.input.keyboard.on('keydown-SPACE', function () {
            // Cambiar a la Escena2
            this.scene.start('Escena2');
            audio.play();
            audio.seek=7;
        }, this);
    }

    // update(){
    //     if(Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE))){
    //         this.scene.start('Escena2');
    //     }
    // }
}
export default Escena1;