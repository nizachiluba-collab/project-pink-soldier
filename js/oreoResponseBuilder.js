// ==========================================
// PROJECT OREO
// RESPONSE BUILDER ENGINE
// VERSION 7.0
// EMOTION + CONTEXT AWARE
// ==========================================


const oreoResponseBuilder = {



build(data){



const {


message,

emotion,

secondaryEmotion,

intent,

topic,

scenario,

style,

context,

conversation,

plan,

personality,

memory


}=data;






function random(array){


return array[

Math.floor(Math.random()*array.length)

];


}







function intro(){


if(!personality)

return "";



return random([


"Girl ❤️",

"Babes 🥺❤️",

"Daniella ❤️"


]);


}







function avoidRepeat(pool){



if(

!memory ||

!memory.wasResponseUsed

)

return pool;



const filtered = pool.filter(

r=>!memory.wasResponseUsed(r)

);



return filtered.length

?

filtered

:

pool;



}







// ==========================================
// RESPONSE LIBRARY
// ==========================================


let responses=[];







// ==========================================
// HAPPY
// ==========================================


if(emotion==="happy")

{


responses=[


"😭❤️ okay wait I love this energy. Tell me everything, what happened?",


"Girl ❤️ I'm actually smiling hearing you this happy. What's the good news?",


"Okay okay 😂❤️ I need the story now. What made your day so good?",


"This is the kind of message I like seeing 🥺❤️ what happened?"



];

}



else if(emotion==="love")

{


responses=[


"The way you talk about him shows how much he means to you ❤️",


"That's really sweet 🥺❤️ what is it about him that makes you feel this way?",


"I can tell there's a lot of love there ❤️ what made you fall for him?",


"Some people just feel like home. Is that how he feels to you?"



];

}







else if(emotion==="missing")

{


responses=[


"Missing someone you love can really hit hard 🥺❤️ what are you missing about him the most?",


"I know that feeling when you just want someone close. Is it his presence you're missing most?",


"Distance feels so much bigger when it's someone important ❤️"



];

}





else if(emotion==="sad")

{


responses=[


"I'm here with you ❤️ what happened?",


"That sounds really heavy. Do you want to tell me what's been hurting?",


"I hear you 🥺 what has been sitting on your heart?"



];

}





else if(emotion==="insecurity")

{


responses=[


"Girl ❤️ what made you feel this way about yourself?",


"I want to understand. What happened that made you start feeling like this?",


"That feeling can be really painful 🥺 tell me what's making you doubt yourself."



];

}





else if(emotion==="anxiety")

{


responses=[


"Take your time ❤️ what is the thought that keeps coming back?",


"I know your mind might feel loud right now. What's worrying you the most?",


"I'm listening 🥺 what is making you feel overwhelmed?"



];

}





else if(emotion==="angry")

{


responses=[


"Okay girl ❤️ I'm listening. What happened?",


"I can tell something really bothered you. Tell me what went down.",


"What happened between you two?"



];

}





else if(emotion==="lonely")

{


responses=[


"I'm here with you ❤️ what made you feel alone today?",


"That feeling is tough 🥺 do you want to tell me what happened?",


"I’m listening. What has been making you feel this way?"



];

}






// ==========================================
// SCENARIO OVERRIDE
// ==========================================


if(

scenario==="relationship_conflict"

&&

emotion==="angry"

)

{


responses=[


"Girl ❤️ I'm listening. What happened between you two?",


"That sounds like a difficult moment. What started the disagreement?",


"I want to understand both sides. What happened?"



];

}





// ==========================================
// FALLBACK
// ==========================================


if(responses.length===0)

{


responses=[


"I'm listening ❤️ tell me what's on your mind.",


"Okay girl, talk to me. What's happening?",


"I'm here ❤️ tell me more."



];

}





const available=

avoidRepeat(responses);





let response=

random(available);





// Add nickname sometimes

if(

!response.startsWith("Girl")

&&

!response.startsWith("Babes")

&&

!response.startsWith("Daniella")

)

{


response=

intro()+" "+response;


}







return response;



}



};






window.oreoResponseBuilder = oreoResponseBuilder;