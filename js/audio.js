    // ===============================
    // AUDIO
    // ===============================

    const heartbeat = new Audio(
    `${R2_BASE}/assets/audio/heartbeat.mp3`);
    heartbeat.volume = 0.25;
    heartbeat.loop = true;

    const terminalBeep = new Audio(
    `${R2_BASE}/assets/audio/terminal-beep.mp3`);
    terminalBeep.preload = "auto";
    terminalBeep.volume = 0.30;

    /*
    const accessGranted = new Audio("./assets/audio/access-granted.mp3");
    accessGranted.volume = 0.45;

    const accessDenied = new Audio("./assets/audio/access-denied.mp3");
    accessDenied.volume = 0.45;

    const glitchSound = new Audio("./assets/audio/glitch.mp3");
    glitchSound.volume = 0.4;

    const shatterSound = new Audio("./assets/audio/shatter.mp3");
    shatterSound.volume = 0.55;

    const ambience = new Audio("./assets/audio/ambient.mp3");
    ambience.volume = 0.18;
    ambience.loop = true;
    */