// =====================================
// PROJECT OREO
// CHAT INTERFACE SYSTEM
// =====================================


const chatWindow =
document.getElementById("chatWindow");


const userInput =
document.getElementById("userMessage");


const sendButton =
document.getElementById("sendButton");




// Add messages to screen

function addMessage(message,type){


const messageBox =
document.createElement("div");



messageBox.classList.add(type);



messageBox.innerHTML =
message;



chatWindow.appendChild(messageBox);



chatWindow.scrollTop =
chatWindow.scrollHeight;


}




function sendMessage(){


const message =
userInput.value.trim();



if(message === "") return;




// User message

addMessage(
message,
"user-message"
);



// Clear input

userInput.value="";



// Oreo thinking effect

setTimeout(()=>{


const response =
oreoAI.respond(message);



addMessage(
response,
"ai-message"
);



},700);



}




sendButton.addEventListener(
"click",
sendMessage
);



userInput.addEventListener(
"keypress",
function(event){


if(event.key === "Enter"){

sendMessage();

}


});