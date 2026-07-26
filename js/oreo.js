// ==========================================
// PROJECT OREO
// MAIN AI CONTROLLER
// VERSION 6.0
// FULL CONVERSATIONAL ENGINE
// MEMORY COMPATIBLE
// ==========================================


const oreoAI = {



respond(message){



console.log(
"Oreo received:",
message
);





// ==========================================
// EMOTION DETECTION
// ==========================================


const emotionResult =

oreoEmotions.detect(message);



const emotion =

emotionResult.primary;



const secondaryEmotion =

emotionResult.secondary || null;





console.log(
"Emotion:",
emotion
);







// ==========================================
// INTENT DETECTION
// ==========================================


const intent =

oreoIntent.detect(message);



console.log(
"Intent:",
intent
);







// ==========================================
// TOPIC DETECTION
// ==========================================


const topic =

oreoTopics.detect(message);



console.log(
"Topic:",
topic
);







// ==========================================
// SCENARIO DETECTION
// ==========================================


let scenario = null;



if(typeof oreoScenario !== "undefined"){


scenario =

oreoScenario.detect(message);


}







// Continue existing scenario


if(

(!scenario || scenario==="general")

&&

oreoMemory

&&

oreoMemory.context

&&

oreoMemory.context.scenario

)

{


scenario =

oreoMemory.context.scenario;


}






console.log(
"Scenario:",
scenario
);







// ==========================================
// CONTEXT ANALYSIS
// ==========================================


const context =

oreoContextAnalyzer.analyze(

message,

oreoMemory

);



console.log(
"Context:",
context
);







// ==========================================
// SAVE USER MESSAGE
// ==========================================


oreoMemory.rememberUserMessage({


message:message,


emotion:emotion,


secondaryEmotion:secondaryEmotion,


intent:intent,


topic:topic,


scenario:scenario,


context:context


});







// Update memory


oreoMemory.updateContext({


...context,


scenario:scenario


});








// ==========================================
// CONVERSATION MANAGEMENT
// ==========================================


const conversation =

oreoConversationManager.analyze({


message:message,


emotion:emotion,


secondaryEmotion:secondaryEmotion,


intent:intent,


topic:topic,


scenario:scenario,


context:context,


memory:oreoMemory


});





console.log(
"Conversation:",
conversation
);







// ==========================================
// RESPONSE PLANNER
// ==========================================


const responsePlan =

oreoResponsePlanner.plan({


emotion:emotion,


secondaryEmotion:secondaryEmotion,


intent:intent,


topic:topic,


scenario:scenario,


context:context,


conversation:conversation


});





console.log(
"Response Plan:",
responsePlan
);







// ==========================================
// PERSONALITY ENGINE
// ==========================================


const personality =

oreoPersonalityEngine.analyze({


emotion:emotion,


secondaryEmotion:secondaryEmotion,


topic:topic,


scenario:scenario,


conversation:conversation,


plan:responsePlan


});





console.log(
"Personality:",
personality
);







// ==========================================
// EMOTIONAL STYLE
// ==========================================


const emotionalStyle =

oreoEmotionalFilter.analyze({


emotion:emotion,


secondaryEmotion:secondaryEmotion,


intent:intent,


topic:topic,


scenario:scenario


});





console.log(
"Response Style:",
emotionalStyle
);







// ==========================================
// BUILD RESPONSE
// ==========================================


const response =

oreoResponseBuilder.build({


message:message,


emotion:emotion,


secondaryEmotion:secondaryEmotion,


intent:intent,


topic:topic,


scenario:scenario,


style:emotionalStyle,


context:context,


conversation:conversation,


plan:responsePlan,


personality:personality,


memory:oreoMemory


});







// ==========================================
// SAVE RESPONSE
// ==========================================


oreoMemory.rememberResponse(

response

);







// Save question if Oreo asked one


const questionMatch =

response.match(/[^?]*\?/);



if(questionMatch){


oreoMemory.rememberQuestion(

questionMatch[0]

);


}







console.log(
"Oreo Response:",
response
);






return response;



}





};





window.oreoAI = oreoAI;