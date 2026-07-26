document.addEventListener("DOMContentLoaded", () => {

console.log("EMOTIONAL DATABASE LOADED 😭");});

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}


// ===============================
// ELEMENT REFERENCES
// ===============================

const openDatabase = document.getElementById("openEmotionalDatabase");
const closeDatabase = document.getElementById("closeDatabase");

const emotionalDatabase = document.getElementById("emotionalDatabase");

const emotionSearch = document.getElementById("emotionSearch");
const emotionInput = document.getElementById("emotionInput");

const databaseLoading = document.getElementById("databaseLoading");
const databaseResult = document.getElementById("databaseResult");

const loadingText = document.getElementById("loadingText");

const resultTitle = document.getElementById("resultTitle");
const resultAnswer = document.getElementById("resultAnswer");


// ===============================
// DEBUG CHECK
// ===============================

if(!openDatabase)
    console.error("MISSING: openEmotionalDatabase");

if(!closeDatabase)
    console.error("MISSING: closeDatabase");

if(!emotionalDatabase)
    console.error("MISSING: emotionalDatabase");

if(typeof missionInterface === "undefined" || !missionInterface)
    console.warn("MISSING: missionInterface (archive animation may not work)");


// ===============================
// OPEN DATABASE
// ===============================

if(openDatabase && emotionalDatabase){

    openDatabase.addEventListener(
        "click",
        () => {

            console.log("EMOTIONAL DATABASE BUTTON CLICKED");

            emotionalDatabase.classList.add("open");

            emotionalDatabase.setAttribute(
                "aria-hidden",
                "false"
            );

            // ===============================
            // DIAGNOSTIC — tells us exactly what
            // the browser thinks is happening the
            // instant the button is clicked
            // ===============================

            const computed = getComputedStyle(emotionalDatabase);

            console.log(
                "emotionalDatabase classes:",
                emotionalDatabase.className
            );

            console.log(
                "computed opacity:", computed.opacity,
                "| computed display:", computed.display,
                "| computed position:", computed.position,
                "| computed z-index:", computed.zIndex,
                "| computed pointer-events:", computed.pointerEvents
            );

        }
    );

}


// ===============================
// CLOSE DATABASE
// ===============================

if(closeDatabase && emotionalDatabase){

    closeDatabase.addEventListener(
        "click",
        () => {


            console.log("CLOSING EMOTIONAL DATABASE");


            emotionalDatabase.classList.remove(
                "open"
            );


            emotionalDatabase.setAttribute(
                "aria-hidden",
                "true"
            );


            if(databaseResult){

                databaseResult.classList.add(
                    "hidden"
                );

            }


            if(databaseLoading){

                databaseLoading.classList.add(
                    "hidden"
                );

            }


            if(emotionInput){

                emotionInput.value = "";

            }



            setTimeout(() => {


                if(typeof missionInterface !== "undefined" && missionInterface){

                    missionInterface.classList.remove(
                        "archive-open"
                    );

                }


            },450);


        }
    );

}


// ===============================
// EMOTIONAL SEARCH ENGINE
// ===============================

if(
    emotionSearch &&
    databaseLoading &&
    loadingText &&
    databaseResult &&
    resultTitle &&
    resultAnswer
){

    emotionSearch.addEventListener(
        "click",
        async () => {


            console.log("SEARCHING EMOTIONAL DATABASE");


            databaseLoading.classList.remove(
                "hidden"
            );


            loadingText.textContent =
                "Thinking of a response...";


            await wait(1200);



            loadingText.textContent =
                "...";


            await wait(1200);



            loadingText.textContent =
                "Response finalised.";


            await wait(1000);



            databaseLoading.classList.add(
                "hidden"
            );


            databaseResult.classList.remove(
                "hidden"
            );



            resultTitle.textContent =
                "I'm slow on puropose babe";



            resultAnswer.textContent =
                "This is where Oreo AI answers will appear.";

        }
    );

}