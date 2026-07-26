// ==========================================
// PROJECT OREO
// CONTEXT MEMORY SYSTEM
// VERSION 6.0
// COMPATIBILITY MEMORY CORE
// ==========================================


const oreoMemory = {



history: [],



context:{


topic:"general",

emotion:"normal",

secondaryEmotion:null,


person:null,

relationship:null,


situation:null,

subSituation:null,


scenario:null,


lastUserMessage:null,

lastQuestion:null,


conversationStage:"opening",


responseHistory:[],


depth:0,


awaitingAnswer:false,


lastIntent:null,


lastEmotion:null,





conversationState:{


scenario:null,


topic:null,


emotion:null,


person:null,


lastQuestion:null,


awaitingAnswer:false,


depth:0


}



},






messageCount:0,

conversationStarted:false,







rememberUserMessage(data){



const {


message,

emotion,

secondaryEmotion,

intent,

topic,

scenario,

context


}=data;






this.history.push({


role:"user",

message:message,

emotion:emotion,

secondaryEmotion:secondaryEmotion,

intent:intent,

topic:topic,

scenario:scenario,

timestamp:new Date()


});







this.messageCount++;

this.conversationStarted=true;







this.context.lastUserMessage = message;


this.context.emotion = emotion;


this.context.lastEmotion = emotion;


this.context.secondaryEmotion = secondaryEmotion;


this.context.lastIntent = intent;


this.context.topic = topic;


this.context.scenario = scenario;





this.context.depth++;







// ================================
// SYNC OLD SYSTEM
// ================================


this.context.conversationState.depth =

this.context.depth;



this.context.conversationState.scenario =

scenario;



this.context.conversationState.topic =

topic;



this.context.conversationState.emotion =

emotion;






if(context){



Object.keys(context).forEach(key=>{


if(

context[key] !== null &&

context[key] !== undefined

)

{


this.context[key]=context[key];


}



});



}







},







updateContext(data){



if(!data)

return;



Object.keys(data).forEach(key=>{


if(

data[key] !== null &&

data[key] !== undefined

)

{


this.context[key]=data[key];


}



});





},







rememberResponse(response){



this.history.push({


role:"oreo",

message:response,

timestamp:new Date()


});







this.context.responseHistory.push(response);







if(

this.context.responseHistory.length > 30

)

{


this.context.responseHistory.shift();


}



},







rememberQuestion(question){



this.context.lastQuestion = question;


this.context.awaitingAnswer=true;


this.context.conversationState.lastQuestion = question;


this.context.conversationState.awaitingAnswer=true;



},







clearQuestion(){



this.context.awaitingAnswer=false;


this.context.conversationState.awaitingAnswer=false;



},







wasResponseUsed(response){



return this.context.responseHistory.includes(response);


},







getContext(){


return this.context;


},







getPreviousMessage(){



for(

let i=this.history.length-1;

i>=0;

i--

){



if(

this.history[i].role==="user"

)

{


return this.history[i].message;


}



}



return null;


},







reset(){



this.history=[];


this.messageCount=0;


this.conversationStarted=false;


this.context={


topic:"general",

emotion:"normal",

secondaryEmotion:null,

person:null,

relationship:null,

situation:null,

subSituation:null,

scenario:null,

lastUserMessage:null,

lastQuestion:null,

conversationStage:"opening",

responseHistory:[],

depth:0,

awaitingAnswer:false,

lastIntent:null,

lastEmotion:null,

conversationState:{


scenario:null,

topic:null,

emotion:null,

person:null,

lastQuestion:null,

awaitingAnswer:false,

depth:0


}


};



}



};





window.oreoMemory = oreoMemory;