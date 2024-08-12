"use strict";

// Seleccionar el botón de salir de la sala
let buttonLeaveBtn = document.querySelector("#btn-leave-room");

// Conectar al servidor Socket.IO
const socket = io();
let mySocketId = null;
const url = window.location.href; // Obtener la URL actual

// Dividir la URL en segmentos para obtener el ID de la sala
const segments = url.split('/');
const id = segments.pop() || segments.pop(); // Manejar un posible '/' al final

// Evento al conectar con el servidor
socket.on("connect", e => {
    mySocketId = socket.id;

    console.log("Connected!");

    // Ingresar a la sala
    socket.emit("joinRoom", id); // Emitir evento para unirse a la sala
    console.log("Ingresado a la sala " + id);

});




// Evento al hacer clic en el botón de salir de la sala
buttonLeaveBtn.addEventListener("click", () => {
    const confirmLeave = confirm("Desea irse de la sala?");
    if (confirmLeave) {
        // Emitir evento para salir de la sala
        socket.emit("leaveRoom", id);
        alert("Has salido de la sala exitosamente");
    }
});

