// ===============================
// MISSION MESSAGE
// ===============================

function typeMissionMessage() {

    const text = girlfriend.missionMessages.join(" ");

    typedMessage.textContent = "";

    let i = 0;

    const interval = setInterval(() => {

        typedMessage.textContent += text[i];

        i++;

        if (i >= text.length) {

            clearInterval(interval);

        }

    }, 30);

}