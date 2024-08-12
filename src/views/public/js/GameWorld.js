const DELTA = 1/177;

function GameWorld() {


    this.balls =  CONSTANTS.ballsParams.map(params => new Ball(...params));


    this.whiteBall = this.balls.find(ball => ball.color ===  COLOR.WHITE);

    this.stick = new Stick(
        new Vector2(413, 413), 
        this.whiteBall.shoot.bind(this.whiteBall)
    );

    this.table = {
        TopY: 57,
        RightX: 1443,
        BottomY: 768,
        LeftX: 57,

    }
}


GameWorld.prototype.handleCollisions = function(){
    for(let i = 0; i < this.balls.length; i++){

        this.balls[i].handleBallInPocket()
        this.balls[i].collideWithTable(this.table)

        for(let j = i + 1; j < this.balls.length; j++){
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWithBall(secondBall)
        }
    }
}


GameWorld.prototype.update = function () {

    this.handleCollisions();

    this.stick.update();
    
    for(let i = 0; i < this.balls.length ; i++){
        this.balls[i].update(DELTA)
    }

    if(!this.ballsMoving() && this.stick.shot){

        this.stick.reposition(this.whiteBall.position)

    }
}

GameWorld.prototype.draw = function () {
    Canvas.drawImage(sprites.background, { x: 0, y: 0 });

    for(let i = 0; i < this.balls.length ; i++){
        this.balls[i].draw()
    }


    this.stick.draw();
}


GameWorld.prototype.ballsMoving = function(){
    let ballsMoving = false;


    for(let i = 0 ; i < this.balls.length; i++){
        if(this.balls[i].moving){
            ballsMoving = true;
            break;
        }
    }

    return ballsMoving;
}


GameWorld.prototype.updateState = function(newState) {
    // Actualizar las posiciones de las bolas
    for (let i = 0; i < this.balls.length; i++) {
        const ballState = newState.balls[i];
        this.balls[i].position = new Vector2(ballState.position.x, ballState.position.y);
        this.balls[i].velocity = new Vector2(ballState.velocity.x, ballState.velocity.y);
        this.balls[i].moving = ballState.moving;
        this.balls[i].visible = ballState.visible;
    }

    // Actualizar el estado del palo
    this.stick.position = new Vector2(newState.stick.position.x, newState.stick.position.y);
    this.stick.rotation = newState.stick.rotation;
    this.stick.power = newState.stick.power;
    this.stick.origin = new Vector2(newState.stick.origin.x, newState.stick.origin.y);
    this.stick.shot = newState.stick.shot;
};
