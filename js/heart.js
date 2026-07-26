// ===============================
// HEART
// ===============================

function buildHeart() {

    if (!nicknameHeart) return;

    nicknameHeart.innerHTML = "";


const totalPoints = girlfriend.nicknames.length;

for(let i = 0; i < totalPoints; i++){

    const t = (i / totalPoints) * Math.PI * 2;

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    points.push({x, y});

}
    points.forEach((point, i) => {

        const span = document.createElement("span");

        span.className = "heart-word";

        span.textContent =
            girlfriend.nicknames[
                i % girlfriend.nicknames.length
            ];

        span.style.left =
            `${50 + point.x * 2}%`;

        span.style.top =
            `${50 - point.y * 2}%`;

        nicknameHeart.appendChild(span);

    });

}