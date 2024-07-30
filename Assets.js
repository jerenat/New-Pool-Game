let sprites = {};
let assetsStillLoading = 0;



function assetsLoadingLoop(callback) {

    if (assetsStillLoading) {
        requestAnimationFrame(assetsLoadingLoop.bind(this, callback));
    }
    else {
        callback();
    }
}

/*
    La función loadAssets tiene como objetivo cargar recursos gráficos (sprites),
    y ejecutar una función de devolución de llamada (callback) una vez que todos los recursos
    han terminado de cargarse.
*/
function loadAssets(callback) {

    function loadSprite(fileName) {
        assetsStillLoading++;

        let spriteImage = new Image();
        spriteImage.src = `./assets/${fileName}`;

        spriteImage.onload = () => {
            assetsStillLoading--;
        }

        return spriteImage;
    }


    // -- mesa de fondo
    sprites.background = loadSprite('spr_background.png');

    // -- palo
    sprites.stick = loadSprite('spr_stick.png');

    // -- pelota blanca
    sprites.whiteBall = loadSprite('spr_ball2.png')

    // lisas
    sprites.yellowBall = loadSprite('1.png')
    sprites.blueBall = loadSprite("2.png")
    sprites.redBall = loadSprite('3.png')
    sprites.violetBall = loadSprite('4.png')
    sprites.orangeBall = loadSprite('5.png')
    sprites.greenBall = loadSprite('6.png')
    sprites.pinkBall = loadSprite('7.png')

    // -- bola 8
    sprites.blackBall = loadSprite('8.png')

    // rayadas
    sprites.lineYellowBall = loadSprite('9.png')
    sprites.lineBlueBall = loadSprite('10.png')
    sprites.lineRedBall = loadSprite('11.png')
    sprites.lineVioletBall = loadSprite('12.png')
    sprites.lineOrangeBall = loadSprite('13.png')
    sprites.lineGreenBall = loadSprite('14.png')
    sprites.linePinkBall = loadSprite('15.png')

    assetsLoadingLoop(callback);
}

function getBallSpriteByColor(color) {
    switch (color) {

        // -- 1
        case COLOR.RED:
            return sprites.redBall;
        // -- 2
        case COLOR.BLUE:
            return sprites.blueBall;
        // -- 3
        case COLOR.YELLOW:
            return sprites.yellowBall;
        // -- 4
        case COLOR.VIOLET:
            return sprites.violetBall;
        // -- 5
        case COLOR.ORANGE:
            return sprites.orangeBall;
        // -- 6
        case COLOR.GREEN:
            return sprites.greenBall;
        // -- 7
        case COLOR.PINK:
            return sprites.pinkBall;

        // bola 8
        case COLOR.BLACK:
            return sprites.blackBall;

        // -- 9
        case COLOR.L_YELLOW:
            return sprites.lineYellowBall;
        // -- 10
        case COLOR.L_BLUE:
            return sprites.lineBlueBall;
        // -- 11
        case COLOR.L_RED:
            return sprites.lineRedBall;
        // -- 12
        case COLOR.L_VIOLET:
            return sprites.lineVioletBall;
        // -- 13
        case COLOR.L_ORANGE:
            return sprites.lineOrangeBall;
        // -- 14
        case COLOR.L_GREEN:
            return sprites.lineGreenBall;
        // -- 15
        case COLOR.L_PINK:
            return sprites.linePinkBall;

        // pelota blanca
        case COLOR.WHITE:
            return sprites.whiteBall;
    }
}