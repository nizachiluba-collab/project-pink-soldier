// ==========================================
// PROJECT OREO
// EMOTIONAL FILTER ENGINE
// VERSION 1.0
// ==========================================


const oreoEmotionalFilter = {



analyze(data){


const {

emotion,

intent,

topic


}=data;



let style = {

tone:"normal",

energy:"medium",

responseMode:"conversation"

};





// ======================================
// EMOTION STYLES
// ======================================


switch(emotion){



case "missing":

style.tone="loving";

style.energy="soft";

style.responseMode="comfort";

break;





case "love":

style.tone="warm";

style.energy="happy";

style.responseMode="celebrate";

break;





case "sad":

style.tone="gentle";

style.energy="low";

style.responseMode="support";

break;





case "angry":

style.tone="calm";

style.energy="controlled";

style.responseMode="deescalate";

break;





case "anxiety":

style.tone="reassuring";

style.energy="slow";

style.responseMode="ground";

break;





case "insecurity":

style.tone="encouraging";

style.energy="soft";

style.responseMode="reassure";

break;





case "happy":

style.tone="excited";

style.energy="high";

style.responseMode="celebrate";

break;





default:

style.tone="friendly";

style.energy="medium";

style.responseMode="conversation";

break;


}





// ======================================
// TOPIC OVERRIDE
// ======================================


if(topic==="relationship"){


if(emotion==="angry")

{

style.tone="gentle";

style.responseMode="relationship_support";

}



}





return style;



}



};





// MAKE AVAILABLE GLOBALLY

window.oreoEmotionalFilter = oreoEmotionalFilter;