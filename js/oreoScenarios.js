// ==========================================
// PROJECT OREO
// SCENARIO DETECTION ENGINE
// VERSION 1.0
// ==========================================

const oreoScenarios = {

detect(message){

const text = message.toLowerCase();


// =============================
// GREETINGS
// =============================

if([
"hi",
"hello",
"hey",
"heyy",
"hii",
"yo",
"good morning",
"goodnight",
"good night",
"good afternoon",
"good evening",
"what's up",
"wassup"
].some(word=>text.includes(word)))
return "greeting";


// =============================
// DOES HE LOVE ME
// =============================

if([
"does niza love me",
"does he love me",
"do you think he loves me",
"does my boyfriend love me",
"does he still love me",
"does he even love me",
"do you think niza loves me",
"is he falling out of love",
"has he stopped loving me",
"does he care about me"
].some(word=>text.includes(word)))
return "reassurance_love";


// =============================
// MISSING HIM
// =============================

if([
"i miss niza",
"miss niza",
"i miss him",
"missing him",
"wish he was here",
"wish he were here",
"i need him",
"i want him",
"i want to see him",
"i miss my man",
"i miss my boyfriend",
"i miss his hugs",
"i miss his voice",
"i wish i could hug him"
].some(word=>text.includes(word)))
return "missing_partner";


// =============================
// RELATIONSHIP FIGHT
// =============================

if([
"we fought",
"we had a fight",
"we argued",
"he upset me",
"he hurt me",
"he made me cry",
"i'm angry at him",
"i'm mad at him",
"he annoyed me",
"he disappointed me",
"we aren't talking",
"he ignored me"
].some(word=>text.includes(word)))
return "relationship_fight";


// =============================
// APOLOGY
// =============================

if([
"i hurt him",
"i messed up",
"i made a mistake",
"i feel guilty",
"i want to apologise",
"i should apologise",
"i regret it"
].some(word=>text.includes(word)))
return "apology";


// =============================
// OVERTHINKING
// =============================

if([
"i'm overthinking",
"what if",
"i can't stop thinking",
"my mind won't stop",
"i'm worried about us",
"i think i'm overthinking"
].some(word=>text.includes(word)))
return "relationship_overthinking";


// =============================

return null;

}

};

window.oreoScenarios = oreoScenarios;