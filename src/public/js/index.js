const socket = io();

const input = document.getElementById("textbox");
const log = document.getElementById("log");
input.addEventListener("keyup", (evt) => {
	if (evt.key == "Enter") {
		socket.emit("message2", input.value);
		input.value = "";
	}
});

socket.on("log", (data) => {
	let mensajes = "";
	data.logs.forEach((log) => {
		mensajes += `${log.socketId} dice: ${log.message} <br/>`;
	});
	log.innerHTML = mensajes;
});
