// ===============================
// HEART INTRO
// ===============================
const heartIntro = document.querySelector("#heartIntro");
const heartWords = document.querySelector("#heartWords");

let floatingWords = [];   // { element, x, y, vx, vy, drifting, rafId }

const HEARTBEAT_DURATION = 15000; // total time the heart beats, in ms
const BEAT_INTERVAL = 900;        // ms between pulses (~67 bpm)

function showHeartIntro(){
    heartIntro.style.display = "flex";
    heartIntro.classList.remove("hidden");
    createWords();
}

function createWords(){
    heartWords.innerHTML = "";
    floatingWords = [];

    girlfriend.nicknames.forEach((nickname, index) => {
        setTimeout(() => {
            const span = document.createElement("span");
            span.className = "floating-word";
            span.textContent = nickname;

            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;

            span.style.left = startX + "px";
            span.style.top = startY + "px";
            span.style.opacity = "0";

            heartWords.appendChild(span);

            requestAnimationFrame(() => {
                span.style.transition = "opacity 0.6s ease";
                span.style.opacity = "1";
            });

            const wordObj = {
                element: span,
                x: startX,
                y: startY,
                drifting: true,
                rafId: null
            };

            floatingWords.push(wordObj);
            driftWord(wordObj);

        }, index * 120);
    });

    setTimeout(() => {
        freezeWords();
    }, girlfriend.nicknames.length * 120 + 2000);
}

function driftWord(word){
    const speed = 0.15 + Math.random() * 0.25;
    const angle = Math.random() * Math.PI * 2;

    word.vx = Math.cos(angle) * speed;
    word.vy = Math.sin(angle) * speed;

    function animate(){
        if(!word.drifting) return;

        word.x += word.vx;
        word.y += word.vy;

        if(word.x < 0) word.x = window.innerWidth;
        if(word.x > window.innerWidth) word.x = 0;
        if(word.y < 0) word.y = window.innerHeight;
        if(word.y > window.innerHeight) word.y = 0;

        word.element.style.left = word.x + "px";
        word.element.style.top = word.y + "px";

        word.rafId = requestAnimationFrame(animate);
    }

    animate();
}

function freezeWords(){
    floatingWords.forEach(word => {
        word.drifting = false;
        if(word.rafId) cancelAnimationFrame(word.rafId);
    });

    setTimeout(() => {
        formHeart();
    }, 1000);
}

// ===============================
// FORM HEART (words glide directly into heart shape)
// ===============================

function getHeartPoints(count, scale){
    const points = [];
    for(let i = 0; i < count; i++){
        const t = (i / count) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
        points.push({ x: x * scale, y: y * scale });
    }
    return points;
}

function formHeart(){
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const scale = Math.min(window.innerWidth, window.innerHeight) / 35;

    const points = getHeartPoints(floatingWords.length, scale);

    floatingWords.forEach((word, index) => {
        setTimeout(() => {
            const point = points[index];
            const targetX = centerX + point.x;
            const targetY = centerY + point.y;

            word.baseX = targetX;
            word.baseY = targetY;
            word.centerX = centerX;
            word.centerY = centerY;

            word.element.classList.add("heart-word");
            word.element.style.animation = "none";
            word.element.style.transition = "all 1.2s cubic-bezier(0.2,0.8,0.2,1)";
            word.element.style.left = targetX + "px";
            word.element.style.top = targetY + "px";
            word.element.style.transform = "translate(-50%,-50%) scale(1)";
            word.element.style.filter = "blur(1px)";
        }, index * 25);
    });

    setTimeout(() => {
        startHeartbeat();
    }, floatingWords.length * 25 + 1500);
}

// ===============================
// HEARTBEAT
// ===============================
function startHeartbeat(){
    const totalBeats = Math.round(HEARTBEAT_DURATION / BEAT_INTERVAL);
    let beat = 0;

    heartbeat.currentTime = 0;
    heartbeat.loop = true;
    heartbeat.volume = 0.8;
    heartbeat.play().catch(() => {});

    function pulse(){
        beat++;
        const scaleFactor = 1.2;

        floatingWords.forEach(word => {
            const dx = word.baseX - word.centerX;
            const dy = word.baseY - word.centerY;

            word.element.style.transition = "transform 0.25s ease-out, filter 0.25s ease-out";
            word.element.style.transform = `translate(-50%,-50%) translate(${dx * (scaleFactor - 1)}px, ${dy * (scaleFactor - 1)}px) scale(1.4)`;
            word.element.style.filter = "brightness(1.7)";

            setTimeout(() => {
                word.element.style.transition = "transform 0.4s ease-in, filter 0.4s ease-in";
                word.element.style.transform = "translate(-50%,-50%) scale(1)";
                word.element.style.filter = "brightness(1)";
            }, 250);
        });

        if(beat < totalBeats){
            setTimeout(pulse, BEAT_INTERVAL);
        } else {
            // FIX: this shake was previously nested inside `beat < totalBeats`,
            // which made `beat === totalBeats` impossible to reach in there.
            // It belongs here, on the final beat, right before the explosion.
            document.body.animate(
                [
                    {transform:"translateX(0px)"},
                    {transform:"translateX(-5px)"},
                    {transform:"translateX(5px)"},
                    {transform:"translateX(-3px)"},
                    {transform:"translateX(3px)"},
                    {transform:"translateX(0px)"}
                ],
                { duration:350 }
            );

            fadeOutHeartbeat();

            setTimeout(() => {
                explodeHeart();
            }, 1200);
        }
    }

    pulse();
}

// ===============================
// EXPLODE HEART -> GALAXY -> MISSION ROOM
// ===============================

function explodeHeart(){
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    floatingWords.forEach(word => {
        const dx = word.baseX - centerX;
        const dy = word.baseY - centerY;

        const scatterX = dx + (Math.random() * 160 - 80);
        const scatterY = dy + (Math.random() * 160 - 80);

        word.element.classList.remove("heart-word");
        word.element.classList.add("star-word");

        word.element.style.transition =
            "transform 1.4s cubic-bezier(0.2,0.6,0.3,1), color 1s ease-out, font-size 1s ease-out, text-shadow 1s ease-out";
        word.element.style.transform =
            `translate(-50%,-50%) translate(${scatterX}px, ${scatterY}px) scale(1)`;

        requestAnimationFrame(() => {
            word.element.style.color = "transparent";
            word.element.style.fontSize = "2px";
            word.element.style.filter = "blur(3px)";
        });
    });

    // stars start appearing immediately, overlapping with the word->star morph above
    createGalaxy();

    setTimeout(() => {
        floatingWords = []; // words have visually merged into the starfield, stop tracking them separately
    }, 1600);

    // FIX: removed the block that used to fade #galaxyLayer to opacity 0 and
    // call transitionToMissionRoom() a second time here. The galaxy should
    // persist (it becomes the mission room backdrop) — createGalaxy() already
    // calls transitionToMissionRoom() once, at the right time, after the stars
    // finish spawning.
}

function createGalaxy(){

    let starLayer = document.querySelector("#galaxyLayer");

    if(!starLayer){
        starLayer = document.createElement("div");
        starLayer.id = "galaxyLayer";
        document.body.appendChild(starLayer);
    }

    starLayer.innerHTML = "";

    starLayer.style.position = "fixed";
    starLayer.style.inset = "0";
    starLayer.style.zIndex = "9998";
    starLayer.style.pointerEvents = "none";

    requestAnimationFrame(()=>{
        starLayer.style.transition = "transform 6s ease-in";
        starLayer.style.transform = "scale(1.6)";
        starLayer.classList.add("awaken");
    });

    const starCount = 160;

    for(let i=0;i<starCount;i++){
        setTimeout(()=>{

            const star=document.createElement("div");
            star.className="star";

            const x=Math.random()*window.innerWidth;
            const y=Math.random()*window.innerHeight;
            const size=1+Math.random()*2.5;

            star.style.left=x+"px";
            star.style.top=y+"px";
            star.style.width=size+"px";
            star.style.height=size+"px";

            star.style.animationDelay=(Math.random()*2)+"s";
            star.style.animationDuration=(1.5+Math.random()*4.5)+"s";

            starLayer.appendChild(star);

            const driftX=(Math.random()-0.5)*120;
            const driftY=(Math.random()-0.5)*120;

            requestAnimationFrame(()=>{
                star.style.transition="transform 12s ease-in-out";
                star.style.transform=`translate(${driftX}px,${driftY}px)`;
            });

        },i*8);
    }

    setTimeout(()=>{
        transitionToMissionRoom();
    },starCount*8+1800);
}

function transitionToMissionRoom(){

    heartWords.style.transition = "opacity 2s ease";
    heartWords.style.opacity = "0";

    // FIX: heartIntro is a fixed, full-screen, z-index:9999 element with an
    // opaque black background. The galaxy sits at z-index:9998 — behind it.
    // Without fading heartIntro's own background too, the galaxy was rendering
    // correctly but stayed completely hidden behind solid black the whole time.
    heartIntro.style.transition = "opacity 2s ease";
    heartIntro.style.opacity = "0";

    setTimeout(()=>{

        heartWords.style.display = "none";

        // heartIntro fully steps aside now, revealing the galaxy that's been
        // sitting on document.body the entire time (it's untouched — it holds)
        heartIntro.style.display = "none";
        heartIntro.classList.add("hidden");
        heartIntro.style.opacity = "1"; // reset for next time showHeartIntro() runs

        const galaxy = document.querySelector("#galaxyLayer");

        if(galaxy){
            galaxy.classList.add("galaxy-mission");
        }

        initializeMissionRoom();

    },2000);
}

function fadeOutHeartbeat(){
    const fadeDuration = 1200;
    const steps = 16;
    const stepTime = fadeDuration / steps;

    const startVolume = heartbeat.volume;
    let step = 0;

    const fade = setInterval(() => {
        step++;

        heartbeat.volume = Math.max(0, startVolume * (1 - step / steps));

        if(step >= steps){
            clearInterval(fade);
            heartbeat.pause();
            heartbeat.currentTime = 0;
            heartbeat.volume = startVolume;
        }
    }, stepTime);
}

// ===============================
// BUILD MISSION ROOM
// ===============================

function initializeMissionRoom(){

    missionRoom.style.display = "flex";
    missionRoom.classList.remove("hidden");
    missionRoom.classList.add("show");

    missionRoom.style.opacity = "0";    
    missionRoom.style.transform = "translateY(40px)";

    requestAnimationFrame(()=>{
        missionRoom.style.transition = "opacity 2s ease, transform 2s ease";
        missionRoom.style.opacity = "1";
        missionRoom.style.transform = "translateY(0px)";
    });
}