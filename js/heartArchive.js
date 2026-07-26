const heartArchive =
document.querySelector("#heartArchive");

const openHeartArchive =
document.querySelector("#openHeartArchive");

const closeHeartArchive =
document.querySelector("#closeHeartArchive");

// ===============================
// POEM DATA
// Fill in title / date / text for each of the 12 entries.
// (Duplicates below are placeholders — replace with your
// real 12 poems.)
// ===============================
const poems = [

    {
        title: "Your Smile",
    
        text: `Your smile is my sunrise,
            soft after the darkest night.
            A little piece of heaven
            that somehow feels like home.`
    },

    {
        title: "Your Beautiful Brown Eyes",
       
        text: `Your brown eyes hold galaxies,
quiet stories I could never finish reading.
Every time I look at them,
I find a place I want to stay.`
    },
    {
        title: "Your Laugh",
        
        text: `Your laugh is my favorite sound,
a melody the world cannot copy.
It turns ordinary moments
into memories I never want to lose..`
    },{
        title: "Your Touch",
        
        text: `Your touch is a reminder
that I am exactly where I belong.
A simple hand in mine,
and suddenly everything feels okay.`
    },{
        title: "Your Voice",
        
        text: `Your voice is my comfort,
a song my heart recognizes.
Even a simple "hello" from you
feels like a little miracle.`
    },{
        title: "Your Heart",
       
        text: `Your heart is something rare,
a place filled with kindness and warmth.
The world is better
because someone like you exists..`
    },{
        title: "Your Kindness",
        
        text: `You notice the little things,
you care in ways people forget.
Your kindness is the quiet magic
that makes me love you more.`
    },{
        title: "Your Presence",
        
        text: `You don't have to do anything special.
Just being beside me is enough.
You make normal moments
feel like something worth remembering.`
    },{
        title: "Your Hugs",
        
        text: `Your hugs are my safe place,
where worries become smaller.
For a little while,
the whole world disappears.`
    },{
        title: "Your Strength",
        
        text: `I admire the battles you fight,
the courage you carry silently.
You are stronger than you know,
and I hope you always see it.`
    },{
        title: "Your Love",
       
        text: `Your love is not just a feeling,
it is a home I get to visit every day.
A place where my heart
can finally rest.`
    },{
        title: "You",
        
        text: `I love the way you exist,
the little things you don't notice.
The way you smile, laugh, and shine —
you are my favorite person.`
    },

    // Continue until 12

];

let currentPoem = 0;

const title = document.getElementById("entryTitle");
const date = document.getElementById("entryDate");
const text = document.getElementById("poemContent");
const number = document.getElementById("entryNumber");
const counter = document.getElementById("poemCounter");

function loadPoem(index){

    text.classList.add("poem-hidden");

    setTimeout(() => {

        title.textContent = poems[index].title;

        date.textContent = poems[index].date;

        text.textContent = poems[index].text;

        number.textContent =
            `ENTRY // ${String(index + 1).padStart(3, "0")}`;

        counter.textContent =
            `${index + 1} / ${poems.length}`;

        text.classList.remove("poem-hidden");

    }, 800);

}

document
    .getElementById("nextPoem")
    .onclick = () => {

        if (currentPoem < poems.length - 1) {

            currentPoem++;

            loadPoem(currentPoem);

        }

    };

document
    .getElementById("previousPoem")
    .onclick = () => {

        if (currentPoem > 0) {

            currentPoem--;

            loadPoem(currentPoem);

        }

    };

// ===============================
// OPEN / CLOSE CROSSFADE
// ===============================

openHeartArchive.onclick = () => {

    missionInterface.classList.add("fade-out");

    setTimeout(() => {

        heartArchive.classList.add("open");

        currentPoem = 0;
        loadPoem(0);

    }, 400); // starts halfway through mission room's fade-out → true overlap

};

closeHeartArchive.onclick = () => {

    heartArchive.classList.remove("open");
    heartArchive.classList.add("closing");

    setTimeout(() => {
        missionInterface.classList.remove("fade-out");
    }, 400); // mission room starts fading back in while heart archive is still fading out

    setTimeout(() => {
        heartArchive.classList.remove("closing"); // cleanup → back to display:none
    }, 800); // matches heartArchiveFadeOut duration

};