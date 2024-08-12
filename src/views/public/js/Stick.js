const STICK_ORIGIN = new Vector2(970, 11);
const STICK_SHOT_ORIGIN = new Vector2(950, 11);
const MAX_POWER = 7500;

// Constructor del palo de billar
function Stick(position, onShoot) {
    this.position = position;
    this.rotation = 0;
    this.origin = STICK_ORIGIN.copy();
    this.power = 0;
    this.onShoot = onShoot;
    this.shot = false;
}

// Actualiza el estado del palo
Stick.prototype.update = function() {
    if (this.shot) {
        return;
    }

    if (Mouse.left.down) {
        this.increasePower();
    } else if (this.power > 0) {
        this.shoot();
    }

    this.updateRotation();
}

// Dibuja el palo en el canvas
Stick.prototype.draw = function() {
    Canvas.drawImage(sprites.stick, this.position, this.origin, this.rotation);
}

// Actualiza la rotación del palo basado en la posición del mouse
Stick.prototype.updateRotation = function() {
    let opposite = Mouse.position.y - this.position.y;
    let adjacent = Mouse.position.x - this.position.x;
    this.rotation = Math.atan2(opposite, adjacent);
}

// Incrementa la potencia del tiro
Stick.prototype.increasePower = function() {
    if (this.power > MAX_POWER) {
        return;
    }
    this.power += 120;
    this.origin.x += 5;
}

// Realiza el tiro
Stick.prototype.shoot = function() {
    this.onShoot(this.power, this.rotation);
    this.power = 0;
    this.origin = STICK_SHOT_ORIGIN.copy();
    this.shot = true;
}

// Reposiciona el palo después del tiro
Stick.prototype.reposition = function(position) {
    this.position = position.copy();
    this.origin = STICK_ORIGIN.copy();
    this.shot = false;
}
