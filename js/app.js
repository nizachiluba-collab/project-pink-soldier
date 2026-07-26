// ===============================
// APP STARTUP
// ===============================

console.log("PROJECT OREO INITIALISING...");

window.addEventListener("load", () => {

    console.log("APPLICATION READY");

    verifyScreen.style.display = "none";
    missionRoom.style.display = "none";

    introText.style.display = "none";

    startButton.addEventListener(

        "click",

        startExperience

    );

});