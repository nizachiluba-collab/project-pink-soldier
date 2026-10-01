// =====================================
// PROJECT OREO
// CHAT INTERFACE SYSTEM
// =====================================


// =====================================
// ELEMENTS
// =====================================

const chatWindow =
    document.getElementById("chatWindow");

const userInput =
    document.getElementById("userMessage");

const sendButton =
    document.getElementById("sendButton");


// =====================================
// ADD MESSAGE
// =====================================

function addMessage(message, type) {

    const messageBox =
        document.createElement("div");

    messageBox.classList.add(type);

    messageBox.textContent =
        message;

    chatWindow.appendChild(
        messageBox
    );

    chatWindow.scrollTop =
        chatWindow.scrollHeight;

    return messageBox;
}


// =====================================
// OREO TYPING INDICATOR
// =====================================

function showTypingIndicator() {

    const typingBox =
        document.createElement("div");

    typingBox.classList.add(
        "ai-message",
        "oreo-typing"
    );

    typingBox.innerHTML =
        "OREO is thinking<span class=\"typing-dots\">...</span>";

    chatWindow.appendChild(typingBox);

    chatWindow.scrollTop =
        chatWindow.scrollHeight;

    return typingBox;
}


// =====================================
// SEND MESSAGE
// =====================================

async function sendMessage() {

    const message =
        userInput.value.trim();


    // Don't send empty messages

    if (message === "") {
        return;
    }


    // ---------------------------------
    // Show user message
    // ---------------------------------

    addMessage(
        message,
        "user-message"
    );


    // ---------------------------------
    // Clear input
    // ---------------------------------

    userInput.value = "";


    // ---------------------------------
    // Disable input while Oreo thinks
    // ---------------------------------

    userInput.disabled = true;
    sendButton.disabled = true;


    // ---------------------------------
    // Show Oreo thinking
    // ---------------------------------

    const typingIndicator =
        showTypingIndicator();


    try {

        // ---------------------------------
        // Give Oreo the message
        // ---------------------------------

        const response =
            await oreoAI.respond(message);


        // ---------------------------------
        // Remove thinking indicator
        // ---------------------------------

        typingIndicator.remove();


        // ---------------------------------
        // Get actual response text
        // ---------------------------------

        const responseText =
            response?.text ||
            "I'm still thinking about that, Daniella ❤️";


        // ---------------------------------
        // Display Oreo's response
        // ---------------------------------

        addMessage(
            responseText,
            "ai-message"
        );


        // ---------------------------------
        // DEBUG
        // ---------------------------------

        console.log(
            "🐾 OREO RESPONSE:",
            response
        );


    } catch (error) {

        console.error(
            "OREO CHAT ERROR:",
            error
        );


        typingIndicator.remove();


        addMessage(
            "Okay... my brain just did something weird 😭❤️ Give me another second.",
            "ai-message"
        );

    }


    // ---------------------------------
    // Re-enable input
    // ---------------------------------

    userInput.disabled = false;
    sendButton.disabled = false;

    userInput.focus();

}


// =====================================
// SEND BUTTON
// =====================================

sendButton.addEventListener(
    "click",
    sendMessage
);


// =====================================
// ENTER KEY
// =====================================

userInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    }
);
