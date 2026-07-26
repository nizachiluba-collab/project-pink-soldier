accessForm?.addEventListener("submit", (e) => {

    e.preventDefault();

    const name = nameInput.value.trim();

    verifyStatus.innerHTML = "SCANNING...";

    const accepted =
        girlfriend.acceptedNames.some(
            n => n.toLowerCase() === name.toLowerCase()
        );

    if (!accepted) {

        setTimeout(() => {

            verifyStatus.innerHTML =
                "ACCESS DENIED<br>UNKNOWN AGENT";

        }, 1200);

        return;

    }

    const terminal =
        document.querySelector(".terminal-window");

    const sequence = [

        "Searching Mission Database...",
        "No Match Found.",
        "Searching Archived Missions...",
        "████████████████████",
        "1 MATCH FOUND",
        "",
        "MISSION ALIAS",
        "PINK SOLDIER",
        "",
        "HEART SIGNATURE VERIFIED",
        "",
        "SMILE VERIFIED",
        "",
        "RETINAL SCAN VERIFIED",
        "",
        "STUBBORNNESS VERIFIED",
        "",
        "IDENTITY CONFIRMED PINK SOLDIER",
        "",
        "WELCOME HOME, DANIELLA"

    ];

    let index = 0;

    function nextLine() {

        if (index >= sequence.length) {

            unlockMission(name, terminal);

            return;

        }

        verifyStatus.innerHTML = sequence[index];

        index++;

        setTimeout(nextLine, 900);

    }

    nextLine();

});

function unlockMission(name, terminal) {

    verifyScreen.classList.add("pink-mode");

    verifyStatus.innerHTML =
        "LOADING PERSONAL DATABASE...";

    setTimeout(() => {

        verifyStatus.innerHTML =
            "SYNCING HEART SIGNATURE...";

    }, 1200);

    setTimeout(() => {

        verifyStatus.innerHTML =
            "WELCOME HOME, DANIELLA.";

        terminal.style.transform = "scale(1.03)";

        terminal.classList.add("glitch");
        terminal.classList.add("bloom");
        terminal.classList.add("awaken");

        heartbeat.currentTime = 0;

        heartbeat.play().catch(() => {});

    }, 2400);

    setTimeout(() => {

        terminal.classList.remove("glitch");
        terminal.classList.remove("bloom");
        terminal.classList.remove("awaken");

        document.body.classList.add("flash");

        setTimeout(() => {

            document.body.classList.remove("flash");

        }, 250);

        verifyScreen.style.transition =
            "opacity 1.5s";

        verifyScreen.style.opacity = "0";

        setTimeout(() => {

            verifyScreen.classList.add("hidden");

            heartbeat.pause();
heartbeat.currentTime = 0;

verifyScreen.style.opacity = "1";
verifyScreen.style.display = "none";
verifyScreen.classList.remove("pink-mode");

showHeartIntro(name);
        }, 1200);

    }, 4200);

}