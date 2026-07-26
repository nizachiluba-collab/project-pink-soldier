// ===============================
// PROJECT OREO — MISSION ROOM
// ACT I: ARRIVAL
// ===============================

const bootSequence = document.querySelector("#bootSequence");
const terminalBoot = document.querySelector("#terminalBoot");

const bootProgressWrap =
    document.querySelector("#bootProgressWrap");

const bootProgress =
    document.querySelector("#bootProgress");

const bootPercentage =
    document.querySelector("#bootPercentage");

const missionInterface =
    document.querySelector("#missionInterface");


// ===============================
// INITIALIZE MISSION ROOM
// Called after galaxy is created
// ===============================

function initializeMissionRoom(){

    const missionRoom =
        document.querySelector("#missionRoom");

    missionRoom.style.display = "flex";
    missionRoom.classList.remove("hidden");

    // Start terminal
    setTimeout(() => {
        startMissionBoot();
    }, 800);

    // Slowly reveal Entergalactic world behind terminal
    setTimeout(() => {
        revealEntergalacticWorld();
    }, 2500);
}


// ===============================
// TYPE TERMINAL LINE
// ===============================

function typeBootLine(text, speed = 35){

    return new Promise(resolve => {

        const line =
            document.createElement("div");

        line.className = "boot-line";

        terminalBoot.appendChild(line);

        let index = 0;

        function type(){

            if(index < text.length){

                line.textContent +=
                    text.charAt(index);

                index++;

                setTimeout(type, speed);

            }
            else{

                resolve();

            }

        }

        type();

    });

}


// ===============================
// WAIT
// ===============================

function wait(ms){

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


// ===============================
// ACT I — BOOT SEQUENCE
// ===============================

async function startMissionBoot(){

    await typeBootLine(
        "CONNECTING TO IMF MEMORY DATABASE..."
    );

    await wait(700);

    await typeBootLine(
        "✓ CONNECTION ESTABLISHED",
        25
    );

    await wait(700);

    await typeBootLine(
        "VERIFYING AGENT IDENTITY..."
    );

    await wait(1000);

    await typeBootLine(
        "✓ AGENT IDENTIFIED"
    );

    await wait(500);


    // Get her entered name if available

    const enteredName =
        document.querySelector("#nameInput")?.value
        || "PRINCESS";


    await typeBootLine(
        `AGENT: ${enteredName.toUpperCase()}`
    );

    await wait(700);

    await typeBootLine(
        "CLEARANCE LEVEL: ∞"
    );

    await wait(700);

    await typeBootLine(
        "MISSION: PROJECT OREO"
    );

    await wait(900);

    await typeBootLine(
        "DECRYPTING MEMORY VAULT..."
    );

    await wait(500);

    await runBootProgress();

    await wait(800);

    await typeBootLine(
        "✓ MEMORY ARCHIVE DECRYPTED"
    );

    await wait(1000);

    await typeBootLine(
        "WELCOME HOME, DANIELLA."
    );

    await wait(600);

    await typeBootLine(
        "I'VE BEEN WAITING FOR YOU."
    );

    await wait(1800);

    completeMissionBoot();

}


// ===============================
// PROGRESS BAR
// ===============================

function runBootProgress(){

    return new Promise(resolve => {

        bootProgressWrap.classList.remove("hidden");
        bootProgressWrap.style.display = "flex";

        let progress = 0;

        const interval =
            setInterval(() => {

                progress +=
                    Math.floor(
                        Math.random() * 5
                    ) + 1;

                if(progress >= 100){

                    progress = 100;

                    clearInterval(interval);

                    setTimeout(
                        resolve,
                        500
                    );

                }

                bootProgress.style.width =
                    progress + "%";

                bootPercentage.textContent =
                    progress + "%";

            }, 90);

    });

}


// ===============================
// BOOT COMPLETE
// ===============================

function completeMissionBoot(){

    // Update agent name in interface

    const enteredName =
        document.querySelector("#nameInput")?.value
        || "Princess";

    const missionAgentName =
        document.querySelector(
            "#missionAgentName"
        );

    if(missionAgentName){

        missionAgentName.textContent =
            enteredName + ".";

    }


    // Fade terminal away

    bootSequence.style.transition =
        "opacity 1.5s ease";

    bootSequence.style.opacity = "0";


    setTimeout(() => {

        bootSequence.style.display = "none";

        revealMissionInterface();

    }, 1500);

}


// ===============================
// REVEAL MISSION INTERFACE
// ===============================

function revealMissionInterface(){

    missionInterface.style.visibility =
        "visible";

    missionInterface.animate(

        [

            {
                opacity: 0,
                transform:
                    "translateY(40px) scale(.98)",
                filter:
                    "blur(10px)"
            },

            {
                opacity: 1,
                transform:
                    "translateY(0) scale(1)",
                filter:
                    "blur(0px)"
            }

        ],

        {

            duration: 2200,

            easing:
                "cubic-bezier(.16,1,.3,1)",

            fill: "forwards"

        }

    );

}
function revealEntergalacticWorld(){

    const background =
        document.querySelector(
            "#entergalacticBackground"
        );

    if(!background) return;

    requestAnimationFrame(() => {

        background.classList.add("enter");

    });

}
// ===============================
// MEMORY FILES
// ===============================

const openMemoryFiles =
    document.querySelector("#openMemoryFiles");

const closeMemoryFiles =
    document.querySelector("#closeMemoryFiles");

const memoryFiles =
    document.querySelector("#memoryFiles");
    // ===============================


// RETURN TO MEMORY FILES

closeOurWorld.addEventListener("click", () => {

    ourWorld.classList.remove("open");

    ourWorld.setAttribute(
        "aria-hidden",
        "true"
    );

    setTimeout(() => {

        memoryFiles.classList.add("open");

    }, 450);

});


// ===============================
// OPEN MEMORY ARCHIVE
// ===============================

openMemoryFiles.addEventListener("click", () => {

    missionInterface.classList.add(
        "archive-open"
    );

    setTimeout(() => {

        memoryFiles.classList.add("open");

        memoryFiles.setAttribute(
            "aria-hidden",
            "false"
        );

    }, 350);

});


// ===============================
// CLOSE MEMORY ARCHIVE
// ===============================

closeMemoryFiles.addEventListener("click", () => {

    memoryFiles.classList.remove("open");

    memoryFiles.setAttribute(
        "aria-hidden",
        "true"
    );

    setTimeout(() => {

        missionInterface.classList.remove(
            "archive-open"
        );

    }, 450);

});
// ===============================
// FILE 001 — THROUGH MY EYES
// ===============================

const openThroughMyEyes =
    document.querySelector("#openThroughMyEyes");

const closeThroughMyEyes =
    document.querySelector("#closeThroughMyEyes");

const throughMyEyes =
    document.querySelector("#throughMyEyes");

const beginMemoryReconstruction =
    document.querySelector("#beginMemoryReconstruction");

const memoryReconstruction =
    document.querySelector("#memoryReconstruction");

const reconstructionText =
    document.querySelector("#reconstructionText");

const memoryFragments =
    document.querySelector("#memoryFragments");


// ===============================
// OPEN FILE 001
// ===============================

openThroughMyEyes.addEventListener("click", () => {

    memoryFiles.classList.remove("open");

    setTimeout(() => {

        throughMyEyes.classList.add("open");

        throughMyEyes.setAttribute(
            "aria-hidden",
            "false"
        );

        throughMyEyes.scrollTop = 0;

    }, 400);

});


// ===============================
// BEGIN RECONSTRUCTION
// ===============================

beginMemoryReconstruction.addEventListener(
    "click",
    () => {

        memoryReconstruction.classList.add(
            "active"
        );

        reconstructionText.textContent =
            "ACCESSING VISUAL MEMORY...";


        setTimeout(() => {

            reconstructionText.textContent =
                "RECOVERING IMAGE FRAGMENTS...";

        }, 900);


        setTimeout(() => {

            reconstructionText.textContent =
                "RECOVERING MOTION FILES...";

        }, 1800);


        setTimeout(() => {

            reconstructionText.textContent =
                "MEMORY RECONSTRUCTION COMPLETE.";

        }, 2700);


        setTimeout(() => {

            memoryFragments.classList.add(
                "reconstructed"
            );

            memoryReconstruction.classList.remove(
                "active"
            );

            beginMemoryReconstruction.style.display =
                "none";

            startMemoryFragmentObserver();
            startMemoryVideoObserver();

            setTimeout(() => {

                memoryFragments.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            }, 500);

        }, 3600);

    }
);


// ===============================
// SCROLL REVEAL
// ===============================

function startMemoryFragmentObserver(){

    const fragments =
        document.querySelectorAll(
            ".memory-fragment"
        );

    const observer =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    if(entry.isIntersecting){

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },

            {
                threshold:0.2
            }

        );


    fragments.forEach(fragment => {

        observer.observe(fragment);

    });

}
// ===============================
// MEMORY VIDEO AUTOPLAY
// ===============================

function startMemoryVideoObserver(){

    const videos =
        document.querySelectorAll(
            "#throughMyEyes video"
        );

    const videoObserver =
        new IntersectionObserver(

            entries => {

                entries.forEach(entry => {

                    const video = entry.target;

                    if(entry.isIntersecting){

                        video.play().catch(() => {
                            console.log(
                                "Video autoplay blocked"
                            );
                        });

                    } else {

                        video.pause();

                    }

                });

            },

            {
                threshold: 0.5
            }

        );

    videos.forEach(video => {

        videoObserver.observe(video);

    });

}

// ===============================
// RETURN TO MEMORY FILES
// ===============================

closeThroughMyEyes.addEventListener(
    "click",
    () => {

        throughMyEyes.classList.remove(
            "open"
        );

        throughMyEyes.setAttribute(
            "aria-hidden",
            "true"
        );


        // Pause videos when leaving

        throughMyEyes
            .querySelectorAll("video")
            .forEach(video => {

                video.pause();

            });


        setTimeout(() => {

            memoryFiles.classList.add(
                "open"
            );

        }, 450);

    }
);
