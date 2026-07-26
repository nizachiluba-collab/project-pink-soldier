// ===============================
// INTRO DATA
// ===============================

const introLines = [

    "ESTABLISHING SECURE CONNECTION...",

    "CONNECTED TO IMF BLACK SITE NODE // PROJECT OREO",

    "WARNING: THIS TERMINAL IS RESTRICTED TO LEVEL 10 PERSONNEL.",

    "ALL INPUTS ARE BEING MONITORED.",

    "BIOMETRIC HEART SIGNATURE REQUIRED.",

    "BEGIN IDENTITY VERIFICATION."

];
let lineIndex = 0;
let waitingForYN = false;

// ===============================
// TYPE LINE
// ===============================

function typeLine(text, callback) {

    if (!introText) {
        callback();
        return;
    }

    introText.classList.remove("fade");
    introText.textContent = "";

    let i = 0;

    const interval = setInterval(() => {

        introText.textContent += text[i];

        i++;

        if (i >= text.length) {

            clearInterval(interval);

            terminalBeep.currentTime = 0;
            terminalBeep.play().catch(() => {});

            setTimeout(() => {

                introText.classList.add("fade");

                setTimeout(callback, 1600);

            }, 1800);

        }

    }, 45);

}

// ===============================
// START EXPERIENCE
// ===============================

function startExperience() {

    startScreen.style.opacity = "0";

    setTimeout(() => {

        startScreen.style.display = "none";

        introText.style.display = "block";

        playIntro();

    }, 800);

}

// ===============================
// PLAY INTRO
// ===============================

function playIntro() {

    if (!introSequence || !introText) {

        console.error("Intro missing");

        showVerify();

        return;

    }

    if (lineIndex >= introLines.length) {

        askYN();

        return;

    }

    typeLine(introLines[lineIndex], () => {

        lineIndex++;

        playIntro();

    });

}

// ===============================
// Y/N
// ===============================

function askYN() {

    if (waitingForYN) return;

    waitingForYN = true;

    introText.classList.remove("fade");

    introText.textContent =
        "DO YOU WISH TO PROCEED? (Y / N)";

    document.addEventListener(
        "keydown",
        handleYN,
        { once: true }
    );

}

function handleYN(e) {

    if (!waitingForYN) return;

    const key = e.key.toLowerCase();

    if (key === "y") {

        waitingForYN = false;

        introText.classList.add("fade");

        setTimeout(() => {

            showVerify();

        }, 1600);

    }

    else if (key === "n") {

    waitingForYN = false;

    const messages = [

        "ACCESS DENIED.",
        "...",
        "ANALYSING YOUR DECISION...",
        "DECISION ANALYSIS COMPLETE.",
        "YOUR DECISION IS UNACCEPTABLE.",
        "ಠ_ಠ",
        "DON'T PISS ME OFF BINGO!",
        "BATMAN IS DISSAPOINTED.",
        "CATWOMAN WOULD NOT ABONDON A MISSION LIKE THIS.",
        "LEAVE THOSE KAWEMPE MANNERS IN KAWEMPE.",
        "SMH 🙄 LETS DO THIS PROPERLY...",
        "RESTARTING IN 3 SECONDS..."

    ];

    let i = 0;

function nextMessage(){

    introText.classList.remove("fade");
    introText.textContent = messages[i];

    // Stay on screen
    setTimeout(() => {

        introText.classList.add("fade");

        // Wait for fade to finish
        setTimeout(() => {

            i++;

            if(i < messages.length){

                nextMessage();

            }else{

                setTimeout(() => {

                    location.reload();

                },1500);

            }

        },1600);

    },1800);

}

nextMessage();
}
}

// ===============================
// SHOW LOGIN
// ===============================

function showVerify() {

    introSequence.style.display = "none";

    verifyScreen.style.display = "flex";

    missionRoom.style.display = "none";

}