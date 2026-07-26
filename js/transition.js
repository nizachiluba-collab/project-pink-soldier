// ===============================
// PROJECT OREO TRANSITION V2
// ===============================

const transitionLayer = document.querySelector("#transitionLayer");
const missionRoom = document.querySelector("#missionRoom");

function endHeartSequence(){

    beginOrbit();

}

// ===============================
// HEART BECOMES GALAXY
// ===============================

function beginOrbit(){

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    heartParticles.forEach((particle,index)=>{

        const angle =
            Math.atan2(
                particle.baseY-centerY,
                particle.baseX-centerX
            );

        const radius =
            Math.hypot(
                particle.baseX-centerX,
                particle.baseY-centerY
            );

        galaxyOrbit(
            particle,
            angle,
            radius,
            index
        );

    });

    setTimeout(()=>{

        zoomIntoGalaxy();

    },7000);

}

// ===============================
// ORBIT
// ===============================

function galaxyOrbit(
    particle,
    angle,
    radius,
    index
){

    let orbit = angle;
    let r = radius;

    function animate(){

        orbit += 0.03;

        r *= 0.998;

        particle.element.style.left =
            window.innerWidth/2 +
            Math.cos(orbit)*r +
            "px";

        particle.element.style.top =
            window.innerHeight/2 +
            Math.sin(orbit)*r +
            "px";

        particle.element.style.filter =
            `drop-shadow(0 0 ${
                8+r/25
            }px hotpink)`;

        if(r>5){

            requestAnimationFrame(animate);

        }

    }

    animate();

}

// ===============================
// CAMERA ZOOM
// ===============================

function zoomIntoGalaxy(){

    heartWords.animate(

        [

            {

                transform:
                "scale(1)",

                filter:
                "blur(0px)"

            },

            {

                transform:
                "scale(18)",

                filter:
                "blur(12px)"

            }

        ],

        {

            duration:2500,

            easing:"ease-in",

            fill:"forwards"

        }

    ).onfinish=()=>{

        startWarp();

    };

}

// ===============================
// WARP
// ===============================

function startWarp(){

    transitionLayer.innerHTML="";

    transitionLayer.style.opacity="1";

    const centerX=window.innerWidth/2;
    const centerY=window.innerHeight/2;

    for(let i=0;i<350;i++){

        const star=document.createElement("div");

        star.className="warp-streak";

        star.style.left=centerX+"px";
        star.style.top=centerY+"px";

        transitionLayer.appendChild(star);

        const angle=Math.random()*Math.PI*2;

        const distance=
            1200+
            Math.random()*1400;

        requestAnimationFrame(()=>{

            star.style.transition=
            "transform 1.3s ease-out, opacity 1.3s";

            star.style.transform=

            `translate(
                ${
                    Math.cos(angle)*distance
                }px,

                ${
                    Math.sin(angle)*distance
                }px
            )

            rotate(${angle}rad)

            scaleX(40)`;

            star.style.opacity=1;

        });

    }

    setTimeout(()=>{

        enterMissionRoom();

    },1700);

}

// ===============================
// ENTER ROOM
// ===============================

function enterMissionRoom(){

    heartIntro.style.transition="opacity 1s";

    heartIntro.style.opacity="0";

    transitionLayer.style.transition=
    "opacity 1s";

    transitionLayer.style.opacity="0";

    setTimeout(()=>{

        heartIntro.style.display="none";

        missionRoom.style.display="flex";

        missionRoom.classList.remove("hidden");

        missionRoom.animate(

            [

                {

                    opacity:0,

                    transform:
                    "translateY(40px)"

                },

                {

                    opacity:1,

                    transform:
                    "translateY(0)"

                }

            ],

            {

                duration:1800,

                easing:"ease-out",

                fill:"forwards"

            }

        );

    },1000);

}