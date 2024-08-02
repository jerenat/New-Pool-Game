"use strict";

let buttonLeaveBtn = document.querySelector("#btn-leave-room");


const socket = io();
const id = 1;

socket.on("connect", e => {
    console.log("Connected!")

    socket.emit("joinRoom", id);    // ingresa a la sala
    console.log("Ingresado a la sala " + id);

})