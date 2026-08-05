// ===============================
// PROJECT OREO
// EMERGENCY MODE
// ===============================
 
// ===============================
// ELEMENTS
// ===============================
const emergencyEnter =
    document.querySelector("#emergencyEnter");

// OPEN BUTTON
const openEmergencyMode =
    document.querySelector("#openEmergencyMode");

// EMERGENCY SCREEN
const emergencyMode =
    document.querySelector("#emergencyMode");

// CLOSE BUTTON
const closeEmergency =
    document.querySelector("#closeEmergency");


// ===============================
// OPEN EMERGENCY MODE
// ===============================
openEmergencyMode.addEventListener("click", () => {
    console.log("Opening Emergency Mode");

    emergencyMode.classList.add("open");
});


// ===============================
// CLOSE EMERGENCY MODE
// ===============================
closeEmergency.addEventListener("click", () => {
    console.log("Closing Emergency Mode");

    emergencyMode.classList.remove("open");
});


// ===============================
// SEND EMERGENCY MESSAGE
// ===============================
emergencyEnter.addEventListener("click", () => {

    // Find selected emergency option
    const selected =
        document.querySelector(
            'input[name="emergency"]:checked'
        );

    if (!selected) {
        alert(
            "PLEASE SELECT AN EMERGENCY SIGNAL ❤️"
        );
        return;
    }

    // Create Oreo emergency message
    const finalMessage = `
🚨 PROJECT OREO // EMERGENCY MODE 🚨

FROM:
PINK SOLDIER ❤️

EMERGENCY SIGNAL:
${selected.value}

STATUS:
I NEED MY AGENT NIZA 🫡

PRIORITY:
HIGH ❤️
`;

    // Your WhatsApp number
    const phone =
        "256700420566";

    // Create WhatsApp URL
    const whatsappURL =
        `https://wa.me/${phone}?text=${encodeURIComponent(finalMessage)}`;

    // Open WhatsApp
    window.open(
        whatsappURL,
        "_blank"
    );
});
