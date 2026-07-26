// ==========================================
// PROJECT OREO
// EMOTION DETECTION SYSTEM
// VERSION 5.0 — EMOTIONAL INTELLIGENCE ENGINE
// ==========================================


const oreoEmotions = {


detect(message){


const text = message.toLowerCase();



let scores = {


greeting:0,

missing:0,

love:0,

sad:0,

lonely:0,

insecurity:0,

faith:0,

happy:0,

anxiety:0,

angry:0


};





function scan(words, emotion, points){


words.forEach(word=>{


if(text.includes(word)){


scores[emotion]+=points;


}


});


}






// ===============================
// GREETING
// ===============================


scan([

"hi",
"hello",
"hey",
"good morning",
"good night",
"how are you",
"what's up",
"oreo"

],

"greeting",

5

);






// ===============================
// LOVE
// ===============================


scan([

"love",
"i love him",
"i love you",
"loved",
"loving",
"in love",
"my man",
"my boyfriend",
"boyfriend",
"my baby",
"my person",
"my everything",
"my heart",
"my love",
"soulmate",
"cherish",
"adore",
"relationship",
"together",
"forever"

],

"love",

10

);







// ===============================
// MISSING
// ===============================


scan([

"miss him",
"miss niza",
"i miss",
"missing him",
"wish he was here",
"want him here",
"far away",
"distance",
"apart",
"longing",
"yearning",
"miss his voice",
"miss his hugs"

],

"missing",

10

);







// ===============================
// HURT / SAD
// ===============================


scan([

"hurt",
"hurting",
"sad",
"cry",
"crying",
"heartbroken",
"broken",
"pain",
"empty",
"devastated",
"heavy heart",
"falling apart"

],

"sad",

9

);







// ===============================
// INSECURITY
// ===============================


scan([

"insecure",
"not enough",
"not good enough",
"am i enough",
"does he still love me",
"replaceable",
"ugly",
"worthless",
"self doubt",
"comparing myself",
"clingy",
"too needy"

],

"insecurity",

10

);







// ===============================
// ANXIETY
// ===============================


scan([

"anxious",
"anxiety",
"worried",
"panic",
"overthinking",
"stressed",
"scared",
"afraid",
"what if",
"can't calm down"

],

"anxiety",

10

);







// ===============================
// ANGER
// ===============================


scan([

"angry",
"mad",
"furious",
"argument",
"fight",
"fought",
"fighting",
"frustrated",
"annoyed",
"pissed",
"resentment"

],

"angry",

10

);







// ===============================
// HAPPY
// ===============================


scan([

"happy",
"excited",
"amazing",
"great",
"smiling",
"laughing",
"joy",
"wonderful"

],

"happy",

7

);







// ===============================
// FAITH
// ===============================


scan([

"god",
"pray",
"prayer",
"bible",
"faith",
"church",
"jesus"

],

"faith",

8

);







// ===============================
// FIND EMOTIONS
// ===============================



const priority=[


"missing",

"insecurity",

"anxiety",

"angry",

"sad",

"love",

"happy",

"faith",

"lonely",

"greeting"


];



let sorted = Object.entries(scores)

.sort((a,b)=>b[1]-a[1]);





let primary = sorted[0][0];



let secondary=null;



if(sorted[1][1] > 0){

secondary=sorted[1][0];

}





// ===============================
// PREVENT GREETING OVERRIDE
// ===============================


if(

primary==="greeting"

&&

sorted[1][1]>0

)

{


primary=sorted[1][0];


secondary="greeting";


}







// ===============================
// CONFIDENCE
// ===============================


let highestScore = scores[primary];



let confidence = Math.min(

100,

highestScore * 10

);







console.log(

"Emotion Scores:",

scores

);





console.log(

"Primary Emotion:",

primary

);






return {


primary:primary,


secondary:secondary,


confidence:confidence,


scores:scores



};



}



};




window.oreoEmotions = oreoEmotions;