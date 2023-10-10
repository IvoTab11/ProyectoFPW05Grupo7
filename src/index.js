import Escena1 from "./scenes/Escena1.js"
import Escena2 from "./scenes/Escena2.js"
import Escena3 from "./scenes/Escena3.js";
import Escena4 from "./scenes/Escena4.js";
import Escena5 from "./scenes/Escena5.js";


let config = {

    type: Phaser.AUTO,
    width: 820,
    height: 622,
    physics:{
        default: 'arcade',
        arcade: {
            gravity: {y:0},
            debug: false
        }
    },

    scene:[Escena1, Escena2, Escena3, Escena4, Escena5]

};

let game = new Phaser.Game(config);