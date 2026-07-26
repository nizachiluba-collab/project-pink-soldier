// ==========================================
// PROJECT OREO
// CONTEXT ANALYZER
// VERSION 2.0
// MASTER CONVERSATION BRAIN
// ==========================================

const oreoContextAnalyzer = {

analyze(message, memory){

const text = message.toLowerCase();

const previous = memory?.conversationState || {};

const context = {

person:null,

relationship:null,

topic:"general",

situation:null,

subSituation:null,

emotion:null,

secondaryEmotion:null,

need:"listening",

stage:previous.emotionalStage || "opening",

referencesPreviousTopic:false,

isAnsweringQuestion:previous.awaitingAnswer || false,

keywords:[],

confidence:0

};


// ======================================
// KEYWORD HELPER
// ======================================

function has(words){

return words.some(word=>text.includes(word));

}

function addKeyword(word){

if(!context.keywords.includes(word)){

context.keywords.push(word);

}

}


// ======================================
// PERSON DETECTION
// ======================================

if(has([
"niza",
"my man",
"boyfriend",
"my boyfriend",
"him",
"he ",
"he's",
"he said",
"he told me"
])){

context.person="Niza";

context.relationship="boyfriend";

context.confidence+=20;

}


// ======================================
// RELATIONSHIP TOPIC
// ======================================

if(has([
"relationship",
"boyfriend",
"love",
"him",
"us",
"together",
"break up",
"fight",
"kiss",
"hug"
])){

context.topic="relationship";

context.confidence+=15;

}


// ======================================
// ARGUMENT
// ======================================

if(has([
"fight",
"fought",
"argument",
"argued",
"disagreement",
"we argued",
"we fought"
])){

context.situation="relationship_argument";

context.confidence+=30;

addKeyword("fight");

}


// ======================================
// FRIENDS
// ======================================

if(has([
"friend",
"friends",
"my friends",
"circle"
])){

context.subSituation="friends";

addKeyword("friends");

}


// ======================================
// CRITICISM
// ======================================

if(has([
"poor choices",
"bad choices",
"wrong choices",
"he said",
"he told me",
"judged",
"criticised",
"criticized"
])){

context.subSituation="being_criticised";

context.confidence+=20;

addKeyword("criticism");

}


// ======================================
// MISSING
// ======================================

if(has([
"miss him",
"miss niza",
"miss my man",
"wish he was here",
"distance",
"far away"
])){

context.situation="missing_partner";

context.need="comfort";
context.emotion="missing";
context.confidence+=35;

}


// ======================================
// LOVE
// ======================================

if(has([
"love",
"i love him",
"he means everything",
"my favourite",
"my favorite"
])){

context.emotion="love";
context.secondaryEmotion=null;
context.confidence+=15;

}


// ======================================
// HURT
// ======================================

if(has([
"hurt",
"hurt me",
"that hurt",
"painful",
"heartbroken"
])){

context.emotion="hurt";

context.need="validation";

context.confidence+=20;

}


// ======================================
// ANGER
// ======================================

if(has([
"angry",
"mad",
"furious",
"annoyed",
"pissed",
"frustrated"
])){

context.emotion="anger";

context.need="understanding";

context.confidence+=20;

}


// ======================================
// ANXIETY
// ======================================

if(has([
"anxious",
"panic",
"worried",
"overthinking",
"stress",
"scared"
])){

context.emotion="anxiety";

context.need="reassurance";

context.confidence+=25;

}


// ======================================
// SELF DOUBT
// ======================================

if(has([
"does he love me",
"am i enough",
"maybe i'm the problem",
"maybe i'm overreacting"
])){

context.situation="reassurance";

context.need="validation";

context.confidence+=25;

}


// ======================================
// CONTINUE PREVIOUS CONVERSATION
// ======================================

// ======================================
// SMART MEMORY INHERITANCE
// ======================================


const hasNewTopic =


context.situation ||

context.emotion ||

context.need !== "listening";





if(

!context.emotion &&

!context.situation &&

!context.subSituation &&

previous.situation &&

previous.awaitingAnswer

)

{


context.situation = previous.situation;


context.referencesPreviousTopic = true;


}

if(

!context.person &&

previous.person

){

context.person=previous.person;

context.referencesPreviousTopic=true;

}

if(

!context.relationship &&

previous.relationship

){

context.relationship=previous.relationship;

}

if(

context.isAnsweringQuestion

){

context.referencesPreviousTopic=true;

}


// ======================================
// FINAL NEED FALLBACK
// ======================================

if(

!context.need

){

context.need="listening";

}


return context;

}

};

window.oreoContextAnalyzer = oreoContextAnalyzer;