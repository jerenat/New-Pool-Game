const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER/2;

function Ball(position, color) {
    this.position = position;
    this.velocity = new Vector2()
    this.moving = false;
    this.sprite = getBallSpriteByColor(color)
    this.color = color;
    this.visible = true;
}

Ball.prototype.update = function (delta) {

    if(!this.visible){
        return;
    }


    this.position.addTo(this.velocity.mult(delta));


    // friccion
    this.velocity = this.velocity.mult(0.984)

    if (this.velocity.length() < 5) {
        this.velocity = new Vector2()
        this.moving = false;
    }
}

Ball.prototype.draw = function () {

    if(!this.visible){
        return;
    }

    Canvas.drawImage(this.sprite, this.position, CONSTANTS.ballOrigin);
}

Ball.prototype.shoot = function (power, rotation) {

    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation))
    this.moving = true
}

Ball.prototype.collideWithBall = function (ball) {

    if(!this.visible || !ball.visible){
        return;
    }




    // buscar un vector normal
    const n = this.position.subtract(ball.position)

    // obtener distancia
    const dist = n.length();

    if (dist > BALL_DIAMETER) {
        return;
    }

    const mtd = n.mult((BALL_DIAMETER - dist) / dist)

    this.position = this.position.add(mtd.mult(1 / 2))
    ball.position = ball.position.subtract(mtd.mult(1 / 2))

    // encontrar vector normal unitario
    const un = n.mult(1 / n.length())


    // encontrar tangente unitaria
    const ut = new Vector2(-un.y, un.x);


    // Velocidades del proyector
    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);


    // encontrar la nueva velocidad normal
    let v1nTag = v2n;
    let v2nTag = v1n;


    v1nTag = un.mult(v1nTag)
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag)
    const v2tTag = ut.mult(v2t);

    // actualizar velocidades
    this.velocity = v1nTag.add(v1tTag)
    ball.velocity = v2nTag.add(v2tTag)

    this.moving = true;
    ball.moving = true;
}

// -- Prototipo: Administra pelota en hoyo
Ball.prototype.handleBallInPocket = function(){

    if(!this.visible){
        return;
    }

    let inPocket = CONSTANTS.pockets.some(pocket => {
        return this.position.distFrom(pocket) < CONSTANTS.pocketRadius
    })


    if(!inPocket){
        return;
    }


    // -- Si la pelota ingresó al hoyo
    if(inPocket){
        console.log(this.color)
    }

    this.visible = false;
    this.moving = false;
}



Ball.prototype.collideWithTable = function (table) {


    if(!this.moving || !this.visible) {
        return;
    }

    let collided = false

    // -- arriba
    if(this.position.y <= table.TopY + BALL_RADIUS){
        this.position.y = table.TopY + BALL_RADIUS
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y)
        collided = true
    }


    // -- derecha
    if(this.position.x >= table.RightX - BALL_RADIUS){
        this.position.x = table.RightX - BALL_RADIUS
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y)
        collided = true
    }

    // -- abajo
    if(this.position.y >= table.BottomY - BALL_RADIUS){
        this.position.y = table.BottomY - BALL_RADIUS
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y)
        collided = true
    }

    // -- izquierda
    if(this.position.x <= table.LeftX + BALL_RADIUS){
        this.position.x = table.LeftX + BALL_RADIUS
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y)
        collided = true
    }

    if(collided)
        this.velocity = this.velocity.mult(0.98)
}

