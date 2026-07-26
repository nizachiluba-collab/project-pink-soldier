// ===============================
// PROJECT OREO — OUR WORLD
// ===============================

// ELEMENTS
const openOurWorld = document.querySelector("#openOurWorld");
const ourWorld = document.querySelector("#ourWorld");
const closeOurWorld = document.querySelector("#closeOurWorld");

const ourWorldIntro = document.querySelector("#ourWorldIntro");
const ourWorldUniverse = document.querySelector("#ourWorldUniverse");

const openPlanetUs = document.querySelector("#openPlanetUs");
const openTheFuture = document.querySelector("#openTheFuture");

const planetUsExperience = document.querySelector("#planetUsExperience");
const futureExperience = document.querySelector("#futureExperience");

const openPictureLove = document.querySelector("#openPictureLove");
const openVideoLove = document.querySelector("#openVideoLove");

const openChaosDistrict = document.querySelector("#openChaosDistrict");
const chaosDistrict = document.querySelector("#chaosDistrict");
const openChaosPictures = document.querySelector("#openChaosPictures");
const openChaosVideos = document.querySelector("#openChaosVideos");


// ===============================
// OPEN OUR WORLD
// ===============================

openOurWorld?.addEventListener("click", () => {

    memoryFiles.classList.remove("open");

    setTimeout(() => {

        ourWorld.classList.add("open");
        ourWorld.setAttribute("aria-hidden","false");

        ourWorldIntro.style.display = "none";

        ourWorldUniverse.style.display = "block";
        ourWorldUniverse.classList.add("arrived");

    },300);

});


// ===============================
// CLOSE OUR WORLD
// ===============================

closeOurWorld?.addEventListener("click", () => {

    document.querySelectorAll(".world-location").forEach(location=>{

        location.classList.remove("open");
        location.setAttribute("aria-hidden","true");

    });

    ourWorldUniverse.classList.remove("arrived");

    ourWorld.classList.remove("open");
    ourWorld.setAttribute("aria-hidden","true");

    setTimeout(()=>{

        ourWorldUniverse.style.display="none";

        memoryFiles.classList.add("open");

    },300);

});


// ===============================
// OPEN PLANET US
// ===============================

openPlanetUs?.addEventListener("click",()=>{

    planetUsExperience.classList.add("open");
    planetUsExperience.setAttribute("aria-hidden","false");

});


// ===============================
// OPEN FUTURE
// ===============================

openTheFuture?.addEventListener("click",()=>{

    futureExperience.classList.add("open");
    futureExperience.setAttribute("aria-hidden","false");

});


// ===============================
// RETURN TO OUR WORLD MAP
// (used by Planet Us and The Future's
// "← RETURN TO OUR WORLD" buttons)
// ===============================

document.querySelectorAll(".return-to-world").forEach(button=>{

    button.addEventListener("click",()=>{

        button.closest(".world-location").classList.remove("open");
        button.closest(".world-location").setAttribute("aria-hidden","true");

    });

});


// ===============================
// OPEN CHAOS DISTRICT
// (a real sub-page, like Planet Us
// itself — Chaos Pictures/Videos are
// chosen here before the lightbox opens)
// ===============================

openChaosDistrict?.addEventListener("click",()=>{

    planetUsExperience.classList.remove("open");
    planetUsExperience.setAttribute("aria-hidden","true");

    chaosDistrict.classList.add("open");
    chaosDistrict.setAttribute("aria-hidden","false");

});


// ===============================
// RETURN TO PLANET US
// (used by Chaos District's
// "← RETURN TO PLANET US" button)
// ===============================

document.querySelectorAll(".return-to-planet").forEach(button=>{

    button.addEventListener("click",()=>{

        chaosDistrict.classList.remove("open");
        chaosDistrict.setAttribute("aria-hidden","true");

        planetUsExperience.classList.add("open");
        planetUsExperience.setAttribute("aria-hidden","false");

    });

});


// ======================================
// MEMORY VIEWER (fullscreen lightbox)
// Picture Love / Video Love / Chaos
// Pictures / Chaos Videos all open
// straight into this same viewer.
// ======================================

const memoryViewer = document.querySelector("#memoryViewer");
const memoryStage = document.querySelector("#memoryStage");
const viewerCounter = document.querySelector("#viewerCounter");
const viewerDistrict = document.querySelector("#viewerDistrict");
const previousMemory = document.querySelector("#previousMemory");
const nextMemory = document.querySelector("#nextMemory");
const closeMemoryViewer = document.querySelector("#closeMemoryViewer");
const viewerBackground = document.querySelector("#viewerBackground");

let gallery = [];
let galleryType = "";
let currentIndex = 0;


// ===============================
// PICTURE LOVE — file list
// (mixed extensions, matching your
// actual folder contents)
// ===============================

const pictureFiles = [

    "001.jpg","002.jpg","003.jpg","004.jpg","005.jpg",
    "006.jpg","007.jpg","008.jpg","009.jpg","010.jpg",

    "011.jpg","012.jpg","013.jpg","014.jpg","015.jpg",
    "016.jpg","017.jpg","018.jpg","019.jpg","020.jpg",

    "021.jpg","022.jpg","023.jpg","024.jpg","025.jpg",
    "026.jpg","027.jpg","028.jpg","029.jpg","030.jpg",

    "031.jpg","032.jpg","033.jpg","034.jpg","035.jpg",
    "036.jpg","037.jpg",

    "038.jpeg","039.jpeg","040.jpeg","041.jpeg",
    "042.jpeg","043.jpeg","044.jpeg","045.jpeg",

    "046.png","047.png","048.png",

    "049.jpeg","050.jpeg","051.jpeg","052.jpeg","053.jpeg",
    "054.jpeg","055.jpeg","056.jpeg","057.jpeg","058.jpeg"

];

const pictureGallery = pictureFiles.map(
    file => `https://pub-bf59e4faf5904fc0875492866e65f840.r2.dev/assets/Images/Picture Love/${file}`
);


// ===============================
// VIDEO LOVE — file list
// (defaults to .MOV, overridden to
// .MP4/.mov for the exceptions below)
// ===============================

const TOTAL_VIDEOS = 49;

const videoExtensions = {

    "003":"MP4",
    "008":"MP4",
    "011":"MP4",
    "016":"MP4",
    "018":"MP4",
    "025":"MP4",
    "036":"MP4",
    "038":"MP4",
    "039":"MP4",
    "040":"MP4",
    "044":"MP4",

    "042":"mov"

};

const videoGallery = [];

for(let i = 1; i <= TOTAL_VIDEOS; i++){

    const number = String(i).padStart(3,"0");
    const extension = videoExtensions[number] || "MOV";

    videoGallery.push(`https://pub-bf59e4faf5904fc0875492866e65f840.r2.dev/assets/videos/Video Love/${number}.${extension}`);

}


// ===============================
// CHAOS DISTRICT — file lists
// (videos now converted and served
// from the "fixed" subfolder as MP4)
// ===============================

const TOTAL_CHAOS_PICTURES = 82;

const chaosPictures = [];

for(let i = 1; i <= TOTAL_CHAOS_PICTURES; i++){

    const number = String(i).padStart(3,"0");
    chaosPictures.push(`https://pub-bf59e4faf5904fc0875492866e65f840.r2.dev/assets/chaos/Pictures/${number}.jpg`);

}

const TOTAL_CHAOS_VIDEOS = 43;

const chaosVideos = [];

for(let i = 1; i <= TOTAL_CHAOS_VIDEOS; i++){

    const number = String(i).padStart(3,"0");
    chaosVideos.push(`https://pub-bf59e4faf5904fc0875492866e65f840.r2.dev/assets/chaos/Videos/fixed/${number}.MP4`);

}


// ===============================
// DISPLAY CURRENT MEMORY
// ===============================

function displayMemory(){

    memoryStage.innerHTML = "";

    viewerCounter.textContent =
        `${currentIndex + 1} / ${gallery.length}`;

    if(galleryType === "image"){

        const img = document.createElement("img");

        img.src = gallery[currentIndex];
        img.className = "gallery-image";

        memoryStage.appendChild(img);

        viewerBackground.style.backgroundImage =
            `url("${gallery[currentIndex]}")`;

    }
    else{

        const video = document.createElement("video");

        video.src = gallery[currentIndex];

        video.autoplay = true;
        video.loop = true;
        video.controls = true;

        video.className = "gallery-video";

        // Surfaces the real problem on-screen instead of
        // silently showing a blank/black player when a file
        // 404s or the browser can't decode the codec
        video.addEventListener("error", () => {

            memoryStage.innerHTML = `
                <div class="viewer-error">
                    <p>This video couldn't load.</p>
                    <small>${gallery[currentIndex]}</small>
                </div>
            `;

        });

        memoryStage.appendChild(video);

        viewerBackground.style.backgroundImage = "none";

    }

}


// ===============================
// OPEN GALLERY
// ===============================

function openGallery(items, type, title){

    gallery = items;
    galleryType = type;
    currentIndex = 0;

    viewerDistrict.textContent = title;

    displayMemory();

    memoryViewer.classList.add("open");

}


// ===============================
// NAVIGATE / CLOSE
// ===============================

nextMemory?.addEventListener("click", () => {

    currentIndex++;

    if(currentIndex >= gallery.length){
        currentIndex = 0;
    }

    displayMemory();

});

previousMemory?.addEventListener("click", () => {

    currentIndex--;

    if(currentIndex < 0){
        currentIndex = gallery.length - 1;
    }

    displayMemory();

});

closeMemoryViewer?.addEventListener("click", () => {

    memoryViewer.classList.remove("open");

});


// ===============================
// OPEN EACH GALLERY
// (Planet Us / Chaos District stay
// open behind the viewer — no page
// navigation needed to see them)
// ===============================

openPictureLove?.addEventListener("click", () => {

    openGallery(pictureGallery, "image", "PICTURE LOVE");

});

openVideoLove?.addEventListener("click", () => {

    openGallery(videoGallery, "video", "VIDEO LOVE");

});

openChaosPictures?.addEventListener("click", () => {

    openGallery(chaosPictures, "image", "CHAOS PICTURES");

});

openChaosVideos?.addEventListener("click", () => {

    openGallery(chaosVideos, "video", "CHAOS VIDEOS");

});