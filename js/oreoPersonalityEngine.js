// ==========================================
// PROJECT OREO
// PERSONALITY ENGINE
// VERSION 1.0
// ==========================================


const oreoPersonalityEngine = {



analyze(data){


const {

emotion,

topic,

conversation,

plan


}=data;



let personality = {


tone:"warm",

energy:"medium",

emojiLevel:"medium",

nicknameChance:60,

style:"friend"



};







// ======================================
// EMOTION PERSONALITY MODIFIERS
// ======================================


switch(emotion){



case "sad":

personality.tone="gentle";

personality.energy="low";

personality.emojiLevel="low";

personality.nicknameChance=40;

break;





case "missing":

personality.tone="loving";

personality.energy="soft";

personality.emojiLevel="high";

personality.nicknameChance=80;

break;





case "angry":

personality.tone="calm";

personality.energy="low";

personality.emojiLevel="medium";

personality.nicknameChance=70;

break;





case "happy":

personality.tone="excited";

personality.energy="high";

personality.emojiLevel="high";

personality.nicknameChance=90;

break;





case "love":

personality.tone="romantic";

personality.energy="warm";

personality.emojiLevel="high";

personality.nicknameChance=90;

break;





case "insecurity":

personality.tone="reassuring";

personality.energy="gentle";

personality.emojiLevel="medium";

personality.nicknameChance=70;

break;



case "anxiety":

personality.tone="calming";

personality.energy="slow";

personality.emojiLevel="low";

personality.nicknameChance=50;

break;



}









// ======================================
// SERIOUS MOMENTS
// ======================================


if(

plan &&

plan.goal==="support"

)

{

personality.energy="gentle";

}









// ======================================
// CONTINUING CONVERSATIONS
// ======================================


if(

conversation &&

conversation.continuing

)

{


personality.style="close_friend";


personality.nicknameChance+=20;


}






return personality;



}



};




window.oreoPersonalityEngine =
oreoPersonalityEngine;