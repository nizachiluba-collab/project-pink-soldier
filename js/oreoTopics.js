// ==========================================
// PROJECT OREO
// TOPIC DETECTION ENGINE
// VERSION 1.0
// ==========================================


const oreoTopics = {



detect(message){


const text =
message.toLowerCase();





/*
==========================================
RELATIONSHIP
==========================================
*/

if([

"niza",
"boyfriend",
"my man",
"my love",
"my boyfriend",
"relationship",
"us",
"we",
"together",
"argument",
"fight",
"fighting",
"breakup",
"break up",
"love",
"miss him",
"miss you",
"distance",
"cheating",
"trust",
"date",
"dating",
"marriage",
"husband",
"future"

].some(word=>text.includes(word)))

{

return "relationship";

}






/*
==========================================
FAITH
==========================================
*/

if([

"God",
"Jesus",
"bible",
"verse",
"prayer",
"pray",
"church",
"faith",
"blessed",
"blessing",
"scripture",
"Holy spirit",
"Lord"

].some(word=>text.includes(word)))

{

return "faith";

}






/*
==========================================
SCHOOL / STUDY
==========================================
*/

if([

"school",
"university",
"campus",
"class",
"assignment",
"exam",
"exams",
"test",
"studying",
"study",
"lecture",
"degree",
"course",
"teacher",
"professor",
"project"

].some(word=>text.includes(word)))

{

return "school";

}






/*
==========================================
FAMILY
==========================================
*/

if([

"dad",
"father",
"parents",
"family",
"sister",
"home",
"relative"

].some(word=>text.includes(word)))

{

return "family";

}






/*
==========================================
HEALTH
==========================================
*/

if([

"pain",
"sick",
"ill",
"hospital",
"doctor",
"medicine",
"hurt",
"body",
"tired",
"headache",
"period",
"cramps",
"sleep",
"sleeping"

].some(word=>text.includes(word)))

{

return "health";

}






/*
==========================================
SELF ESTEEM
==========================================
*/

if([

"ugly",
"not enough",
"worthless",
"insecure",
"hate myself",
"failure",
"not good enough",
"confidence",
"self esteem",
"compare",
"jealous"

].some(word=>text.includes(word)))

{

return "self-esteem";

}






/*
==========================================
FUTURE / DREAMS
==========================================
*/

if([

"future",
"dream",
"dreams",
"goal",
"goals",
"career",
"job",
"success",
"plan",
"plans",
"life"

].some(word=>text.includes(word)))

{

return "future";

}






/*
==========================================
MONEY
==========================================
*/

if([

"money",
"broke",
"cash",
"salary",
"pay",
"rent",
"budget",
"expensive"

].some(word=>text.includes(word)))

{

return "money";

}






/*
==========================================
FRIENDS
==========================================
*/

if([

"friend",
"friends",
"best friend",
"social",
"people",
"everyone",
"nobody"

].some(word=>text.includes(word)))

{

return "friends";

}






return "general";


}



};





window.oreoTopics = oreoTopics;