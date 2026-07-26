// ==========================================
// PROJECT OREO
// INTENT DETECTION SYSTEM
// VERSION 3.0
// ==========================================


const oreoIntent = {


detect(message){


const text = message.toLowerCase();



function has(words){

return words.some(word =>
text.includes(word)
);

}





// ===============================
// QUESTIONS
// ===============================


if(

text.includes("?")

)

{

return "question";

}





if(has([

"does he love me",
"does he still love me",
"do you think",
"what should i do",
"why does he",
"how do i"

]))

{

return "question";

}







// ===============================
// EMOTIONAL SHARING
// ===============================


if(has([

"i love",
"i miss",
"i feel",
"i am",
"i'm",
"i dont know",
"i don't know",
"i hate",
"i wish",
"i want"

]))

{

return "sharing";

}







// ===============================
// ARGUMENT / CONFLICT
// ===============================


if(has([

"we fought",
"we fight",
"we argued",
"argument",
"he said",
"she said",
"upset with",
"angry with"

]))

{

return "conflict";

}







// ===============================
// REQUEST FOR ADVICE
// ===============================


if(has([

"help me",
"what should i do",
"advice",
"tell me what to do",
"should i"

]))

{

return "advice";

}







// ===============================
// GREETING LAST
// ===============================


if(has([

"hi",
"hello",
"hey",
"good night",
"how are you",
"what's up"

]))

{

return "greeting";

}






return "sharing";


}



};



window.oreoIntent = oreoIntent;