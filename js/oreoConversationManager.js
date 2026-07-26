// ==========================================
// PROJECT OREO
// CONVERSATION MANAGER
// VERSION 6.0
// THREAD + DEPTH AWARENESS
// ==========================================


const oreoConversationManager = {



analyze(data){



const {


message,

emotion,

secondaryEmotion,

intent,

topic,

scenario,

context,

memory


}=data;





const memoryContext =

memory?.context || {};





const depth =

memoryContext.depth || 0;





const lastQuestion =

memoryContext.lastQuestion || null;





const previousEmotion =

memoryContext.lastEmotion || null;





const previousTopic =

memoryContext.topic || null;







// ==========================================
// DETERMINE CONTINUATION
// ==========================================


const continuing =


depth > 1;







// ==========================================
// DETERMINE IF USER IS ANSWERING
// ==========================================


let answering = false;



if(lastQuestion){


answering = true;


}







// ==========================================
// CONVERSATION STAGE
// ==========================================


let stage = "opening";




if(depth >= 2)

{


stage="exploration";


}





if(

depth >= 3 &&

[

"sad",

"insecurity",

"anxiety",

"lonely"

].includes(emotion)

)

{


stage="deep_support";


}







// ==========================================
// AVOID RANDOM MEMORY CARRY OVER
// ==========================================


let shouldReferenceMemory=false;



if(

continuing &&

previousTopic===topic

)

{


shouldReferenceMemory=true;


}







// ==========================================
// SHOULD ASK QUESTION
// ==========================================


let shouldAskQuestion=true;



if(intent==="greeting")

{


shouldAskQuestion=false;


}








// ==========================================
// RESPONSE BEHAVIOUR
// ==========================================


let avoidGeneric=false;



if(depth>=2)

{


avoidGeneric=true;


}








return {



type:

answering

?

"answer"

:

continuing

?

"continuation"

:

"opening",




continuing:continuing,



answering:answering,



stage:stage,



depth:depth,



shouldReferenceMemory:shouldReferenceMemory,



shouldAskQuestion:shouldAskQuestion,



avoidGeneric:avoidGeneric,



previousEmotion:previousEmotion,



previousTopic:previousTopic,



scenario:scenario || null



};



}



};





window.oreoConversationManager = oreoConversationManager;