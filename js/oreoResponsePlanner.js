// ==========================================
// PROJECT OREO
// RESPONSE PLANNER ENGINE
// VERSION 3.0
// CONVERSATION AWARE PLANNING
// ==========================================


const oreoResponsePlanner = {



plan(data){


const {

emotion,

secondaryEmotion,

intent,

topic,

context,

conversation


}=data;



let goal = "conversation";

let tone = "warm";

let energy = "normal";

let askQuestion = true;

let giveAdvice = false;

let validate = true;






// ==========================================
// USE CONVERSATION GOAL FIRST
// ==========================================


if(conversation)

{


switch(conversation.responseGoal){



// ==========================
// REASSURANCE
// ==========================


case "reassure":


goal = "provide_reassurance";

tone = "loving";

energy = "gentle";

askQuestion = true;

giveAdvice = false;

break;





// ==========================
// COMFORT
// ==========================


case "comfort":


goal = "comfort_missing_person";

tone = "affectionate";

energy = "soft";

askQuestion = true;

break;






// ==========================
// CONFLICT
// ==========================


case "listen_and_support":


goal = "support_after_conflict";

tone = "calm";

energy = "gentle";

askQuestion = true;

giveAdvice = false;

break;



}


}









// ==========================================
// EMOTION BACKUP
// ==========================================


if(goal==="conversation")

{


switch(emotion){



case "sad":


goal="emotional_support";

tone="comforting";

energy="soft";

break;





case "angry":


goal="listen_and_understand";

tone="calm";

energy="gentle";

break;





case "anxiety":


goal="calm_and_ground";

tone="reassuring";

energy="slow";

break;





case "happy":


goal="celebrate";

tone="excited";

energy="high";

break;





case "love":


goal="share_affection";

tone="romantic";

energy="warm";

break;




}

}










// ==========================================
// TOPIC ADJUSTMENTS
// ==========================================


if(topic==="relationship")

{


if(emotion==="angry")

{

tone="calm";

giveAdvice=false;

}



if(emotion==="love")

{

tone="romantic";

}


}









// ==========================================
// FINAL PLAN
// ==========================================


return {



goal:goal,


tone:tone,


energy:energy,


askQuestion:askQuestion,


giveAdvice:giveAdvice,


validate:validate,



steps:[


"acknowledge emotion",


"respond naturally",


"continue conversation"


]



};



}



};






window.oreoResponsePlanner = oreoResponsePlanner;