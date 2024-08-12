function Game() {
    this.gameWorld = null;
    this.updateInterval = null; // Guarda la referencia del intervalo aquí
}

Game.prototype.init = function () {
    this.gameWorld = new GameWorld();
}

Game.prototype.start = function () {
    PoolGame.init();
    PoolGame.mainLoop();
    PoolGame.startRooms();
}

Game.prototype.mainLoop = function () {
    Canvas.clear();
    PoolGame.gameWorld.update();
    PoolGame.gameWorld.draw();
    Mouse.reset();
    requestAnimationFrame(PoolGame.mainLoop);
};

Game.prototype.startRooms = function () {
    socket.on("gameStart", data => {
        console.log(data.message);
        this.handleTurn(data.turn);
    });

    socket.on("turn", data => {
        this.handleTurn(data.turn);
    });
}

Game.prototype.updatePoolGame = function () {
    socket.emit("update", PoolGame.gameWorld);
}

Game.prototype.handleTurn = function (turn) {
    if (turn === mySocketId) {
        console.log("Es tu turno");

        // Detiene el intervalo anterior si existe
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }

        // Inicia un nuevo intervalo para enviar los datos
        this.updateInterval = setInterval(() => {
            PoolGame.updatePoolGame();
        }, 100);

    } else {
        console.log("Esperando el turno del otro jugador");

        // Detiene el intervalo para no enviar datos cuando no es tu turno
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }

        // Escuchar los datos del otro jugador
        socket.on("update", data => {
            // Actualizar el estado de PoolGame
            PoolGame.gameWorld.updateState(data);
        });
    }
}


let PoolGame = new Game();
