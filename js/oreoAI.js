// ==========================================
// PROJECT OREO
// MAIN AI CONTROLLER
// VERSION 8.0
// MODEL-FREE CONVERSATIONAL CORE
// REAL AI BACKEND OPTIONAL
// ==========================================


const OREO_CONFIG = {

    // ==========================================
    // OREO OPERATING MODE
    // ==========================================

    USE_LOCAL_AI: true,

    /*
        true  = FREE OREO CORE
        false = OpenAI API mode

        LOCAL MODE DOES NOT CALL THE API.
    */

};


// ==========================================
// OREO AI
// ==========================================

const oreoAI = {


    version: "8.0",


    state: {

        initialized: false,

        processing: false,

        conversationId: null,

        lastResponseId: null

    },


    // ======================================
    // INITIALIZE
    // ======================================

    init() {

        if (this.state.initialized) {

            return;

        }


        this.state.conversationId =
            this.createConversationId();


        this.state.initialized =
            true;


        console.log(
            `%c🐾 OREO AI ${this.version} INITIALIZED`,
            "color:#7c5cff;font-weight:bold;"
        );


        console.log(
            "Operating mode:",
            OREO_CONFIG.USE_LOCAL_AI
                ? "FREE LOCAL"
                : "OPENAI API"
        );


        console.log(
            "Conversation:",
            this.state.conversationId
        );

    },


    // ======================================
    // MAIN RESPONSE PIPELINE
    // ======================================

    async respond(message) {

        if (
            !message ||
            !message.trim()
        ) {

            return this.createResponse(
                "I'm listening, Daniella. ❤️"
            );

        }


        if (!this.state.initialized) {

            this.init();

        }


        if (this.state.processing) {

            console.warn(
                "Oreo is already processing."
            );

        }


        this.state.processing =
            true;


        try {


            const cleanMessage =
                message.trim();


            console.log(
                "🐾 Oreo received:",
                cleanMessage
            );


            // ==================================
            // 1. UNDERSTANDING
            // ==================================

            const understanding =
                await this.understand(
                    cleanMessage
                );


            console.log(
                "Understanding:",
                understanding
            );


            // ==================================
            // 2. MEMORY RETRIEVAL
            // ==================================

            const memories =
                await this.retrieveMemory(
                    cleanMessage,
                    understanding
                );


            console.log(
                "Relevant memories:",
                memories
            );


            // ==================================
            // 3. CONTEXT
            // ==================================

            const context =
                await this.buildContext({

                    message:
                        cleanMessage,

                    understanding:
                        understanding,

                    memories:
                        memories

                });


            console.log(
                "🧩 Oreo Context:",
                context
            );


            // ==================================
            // 4. REASONING
            // ==================================

            const reasoning =
                await this.reason({

                    message:
                        cleanMessage,

                    understanding:
                        understanding,

                    context:
                        context,

                    memories:
                        memories

                });


            console.log(
                "🧠 OREO REASONING:",
                reasoning
            );


            // ==================================
            // 5. RESPONSE PLAN
            // ==================================

            const plan =
                await this.planResponse(

                    context,

                    reasoning

                );


            console.log(
                "Response plan:",
                plan
            );


            // ==================================
            // 6. PERSONALITY
            // ==================================

            const personality =
                await this.buildPersonality({

                    understanding:
                        understanding,

                    context:
                        context,

                    plan:
                        plan,

                    reasoning:
                        reasoning

                });


            console.log(
                "Personality:",
                personality
            );


            // ==================================
            // 7. EMOTIONAL STYLE
            // ==================================

            const emotionalStyle =
                await this.buildEmotionalStyle(
                    understanding
                );


            console.log(
                "Emotional style:",
                emotionalStyle
            );


            // ==================================
            // 8. GENERATE RESPONSE
            // ==================================

            const generated =
                await this.generateResponse({

                    message:
                        cleanMessage,

                    context:
                        context,

                    plan:
                        plan,

                    reasoning:
                        reasoning,

                    memories:
                        memories,

                    understanding:
                        understanding,

                    personality:
                        personality,

                    emotionalStyle:
                        emotionalStyle

                });


            console.log(
                "🐾 OREO RESPONSE:",
                generated
            );


            // ==================================
            // 9. EMOTIONAL STATE
            // ==================================

            const emotionalState =
                await this.updateEmotionalState({

                    understanding:
                        understanding,

                    plan:
                        plan,

                    reasoning:
                        reasoning,

                    response:
                        generated

                });


            console.log(
                "💗 OREO EMOTIONAL STATE:",
                emotionalState
            );


            // ==================================
            // 10. ACTIONS
            // ==================================

            const actions =
                await this.determineActions({

                    message:
                        cleanMessage,

                    context:
                        context,

                    plan:
                        plan,

                    reasoning:
                        reasoning

                });


            // ==================================
            // 11. SAVE CONVERSATION
            // ==================================

            await this.storeConversation({

                message:
                    cleanMessage,

                understanding:
                    understanding,

                response:
                    generated,

                emotionalState:
                    emotionalState

            });


            // ==================================
            // 12. RETURN
            // ==================================

            return this.createResponse(

                generated.text,

                {

                    understanding,

                    memories,

                    context,

                    reasoning,

                    plan,

                    personality,

                    emotionalStyle,

                    emotionalState,

                    actions,

                    source:
                        generated.source,

                    model:
                        generated.model,

                    responseId:
                        generated.responseId

                }

            );


        }

        catch (error) {


            console.error(
                "🐾 OREO AI ERROR:",
                error
            );


            return this.createResponse(

                "Give me one second, Daniella. My brain just tripped over itself 😭❤️",

                {

                    error:
                        true,

                    errorMessage:
                        error.message

                }

            );

        }


        finally {

            this.state.processing =
                false;

        }

    },


    // ======================================
    // UNDERSTANDING
    // ======================================

    async understand(message) {


        const result = {

            message:
                message,

            emotion:
                null,

            secondaryEmotion:
                null,

            intent:
                null,

            topic:
                null,

            scenario:
                null,

            context:
                null

        };


        // ==================================
        // EMOTION
        // ==================================

        if (
            window.oreoEmotions
        ) {

            const emotionResult =
                window.oreoEmotions.detect(
                    message
                );


            result.emotion =
                emotionResult;


            result.secondaryEmotion =
                emotionResult?.secondary ||
                null;

        }


        // ==================================
        // INTENT
        // ==================================

        if (
            window.oreoIntent
        ) {

            result.intent =
                window.oreoIntent.detect(
                    message
                );

        }


        // ==================================
        // TOPIC
        // ==================================

        if (
            window.oreoTopics
        ) {

            result.topic =
                window.oreoTopics.detect(
                    message
                );

        }


        // ==================================
        // SCENARIO
        // ==================================

        if (
            window.oreoScenario
        ) {

            result.scenario =
                window.oreoScenario.detect(
                    message
                );

        }


        // ==================================
        // CONTEXT
        // ==================================

        if (
            window.oreoContextAnalyzer &&
            window.oreoMemory
        ) {

            result.context =
                window.oreoContextAnalyzer.analyze(
                    message,
                    window.oreoMemory
                );

        }


        return result;

    },


    // ======================================
    // MEMORY RETRIEVAL
    // ======================================

    async retrieveMemory(
        message,
        understanding
    ) {


        const memories = [];


        if (
            !window.oreoMemory
        ) {

            return memories;

        }


        // ==================================
        // PREVIOUS USER MESSAGE
        // ==================================

        const previous =
            window.oreoMemory
                .getPreviousMessage?.();


        if (previous) {

            memories.push({

                type:
                    "recent_conversation",

                content:
                    previous,

                relevance:
                    0.5

            });

        }


        // ==================================
        // CURRENT CONVERSATION CONTEXT
        // ==================================

        if (
            window.oreoMemory.context
        ) {

            memories.push({

                type:
                    "conversation_context",

                content:
                    window.oreoMemory.context,

                relevance:
                    0.7

            });

        }


        return memories;

    },


    // ======================================
    // CONTEXT
    // ======================================

    async buildContext(data) {


        const {

            message,

            understanding,

            memories

        } = data;


        return {

            userMessage:
                message,

            emotion:
                understanding.emotion,

            secondaryEmotion:
                understanding.secondaryEmotion,

            intent:
                understanding.intent,

            topic:
                understanding.topic,

            scenario:
                understanding.scenario,

            conversation:
                understanding.context ||
                null,

            memories:
                memories,

            website: {

                currentSection:
                    this.getCurrentSection()

            }

        };

    },


    // ======================================
    // REASONING
    // ======================================

    async reason(data) {


        if (
            window.oreoReasoning
        ) {

            return window
                .oreoReasoning
                .analyze({

                    message:
                        data.message,

                    emotion:
                        data.understanding
                            .emotion,

                    secondaryEmotion:
                        data.understanding
                            .secondaryEmotion,

                    intent:
                        data.understanding
                            .intent,

                    topic:
                        data.understanding
                            .topic,

                    scenario:
                        data.understanding
                            .scenario,

                    context:
                        data.context,

                    conversation:
                        data.context
                            ?.conversation,

                    memory:
                        data.memories

                });

        }


        // ==================================
        // FALLBACK REASONING
        // ==================================

        return {

            userNeed:
                "conversation",

            responseGoal:
                "continue_conversation",

            shouldValidate:
                true,

            shouldAdvise:
                false,

            shouldAskQuestion:
                false,

            shouldReferenceMemory:
                false,

            shouldMentionNiza:
                false,

            emotionalDepth:
                "normal",

            urgency:
                "normal",

            conversationalMode:
                "casual",

            confidence:
                0.3

        };

    },


    // ======================================
    // PLANNING
    // ======================================

    async planResponse(
        context,
        reasoning
    ) {


        let conversation =
            null;


        // ==================================
        // CONVERSATION MANAGER
        // ==================================

        if (
            window.oreoConversationManager
        ) {

            conversation =
                window
                    .oreoConversationManager
                    .analyze({

                        message:
                            context.userMessage,

                        emotion:
                            context.emotion
                                ?.primary,

                        secondaryEmotion:
                            context.secondaryEmotion,

                        intent:
                            context.intent,

                        topic:
                            context.topic,

                        scenario:
                            context.scenario,

                        context:
                            context.conversation,

                        memory:
                            window.oreoMemory

                    });

        }


        // ==================================
        // DEFAULT PLAN
        // ==================================

        let plan = {

            goal:
                reasoning?.responseGoal ||
                "conversation",

            tone:
                "warm",

            energy:
                "normal",

            askQuestion:
                reasoning?.shouldAskQuestion ||
                false,

            giveAdvice:
                reasoning?.shouldAdvise ||
                false,

            validate:
                reasoning?.shouldValidate !== false,

            steps: [

                "understand",

                "respond naturally"

            ]

        };


        // ==================================
        // RESPONSE PLANNER
        // ==================================

        if (
            window.oreoResponsePlanner
        ) {

            plan =
                window
                    .oreoResponsePlanner
                    .plan({

                        emotion:
                            context.emotion
                                ?.primary,

                        secondaryEmotion:
                            context.secondaryEmotion,

                        intent:
                            context.intent,

                        topic:
                            context.topic,

                        scenario:
                            context.scenario,

                        context:
                            context.conversation,

                        conversation:
                            conversation,

                        reasoning:
                            reasoning

                    });

        }


        // ==================================
        // NORMALIZE PLAN WITH REASONING
        // ==================================

        plan.conversation =
            conversation;


        plan.reasoning =
            reasoning;


        /*
         * The reasoning engine is the higher-level
         * decision maker.
         *
         * This prevents the older planner from
         * accidentally forcing behavior.
         */


        if (
            reasoning
        ) {

            plan.askQuestion =
                reasoning.shouldAskQuestion;


            plan.giveAdvice =
                reasoning.shouldAdvise;


            plan.validate =
                reasoning.shouldValidate;


            if (
                reasoning.responseGoal
            ) {

                plan.responseGoal =
                    reasoning.responseGoal;

            }

        }


        // ==================================
        // GREETINGS
        // ==================================

        if (
            context.intent === "greeting"
        ) {

            plan.askQuestion =
                false;

        }


        return plan;

    },


    // ======================================
    // PERSONALITY
    // ======================================

    async buildPersonality(data) {


        if (
            window.oreoPersonalityEngine
        ) {

            return window
                .oreoPersonalityEngine
                .analyze({

                    emotion:
                        data.understanding
                            .emotion?.primary,

                    topic:
                        data.context.topic,

                    conversation:
                        data.plan.conversation,

                    plan:
                        data.plan,

                    reasoning:
                        data.reasoning

                });

        }


        return {

            tone:
                "warm",

            energy:
                "medium",

            emojiLevel:
                "medium",

            nicknameChance:
                60,

            style:
                "friend"

        };

    },


    // ======================================
    // EMOTIONAL STYLE
    // ======================================

    async buildEmotionalStyle(
        understanding
    ) {


        if (
            window.oreoEmotionalFilter
        ) {

            return window
                .oreoEmotionalFilter
                .analyze({

                    emotion:
                        understanding
                            .emotion?.primary,

                    secondaryEmotion:
                        understanding
                            .secondaryEmotion,

                    intent:
                        understanding.intent,

                    topic:
                        understanding.topic,

                    scenario:
                        understanding.scenario

                });

        }


        return {

            tone:
                "warm",

            energy:
                "normal",

            responseMode:
                "conversation"

        };

    },


    // ======================================
    // RESPONSE GENERATION
    // ======================================

    async generateResponse(data) {


        // ==================================
        // FREE LOCAL OREO
        // ==================================

        if (
            OREO_CONFIG.USE_LOCAL_AI === true
        ) {


            console.log(
                "🐾 OREO LOCAL AI MODE"
            );


            // ==================================
            // RESPONSE BUILDER
            // ==================================

            if (
                window.oreoResponseBuilder
            ) {


                const localText =
                    window
                        .oreoResponseBuilder
                        .build({

                            message:
                                data.message,

                            emotion:
                                data.understanding
                                    .emotion?.primary,

                            secondaryEmotion:
                                data.understanding
                                    .secondaryEmotion,

                            intent:
                                data.understanding
                                    .intent,

                            topic:
                                data.understanding
                                    .topic,

                            scenario:
                                data.understanding
                                    .scenario,

                            style:
                                data.emotionalStyle,

                            context:
                                data.context,

                            conversation:
                                data.plan
                                    .conversation,

                            plan:
                                data.plan,

                            reasoning:
                                data.reasoning,

                            personality:
                                data.personality,

                            memory:
                                window.oreoMemory

                        });


                const localResponse = {

                    text:
                        localText,

                    source:
                        "local",

                    model:
                        null,

                    responseId:
                        null

                };


                console.log(
                    "🐾 OREO LOCAL RESPONSE:",
                    localResponse
                );


                return localResponse;

            }


            throw new Error(
                "oreoResponseBuilder.js is not loaded."
            );

        }


        // ==================================
        // API / REAL AI MODE
        // ==================================

        if (
            !window.oreoPromptBuilder
        ) {

            throw new Error(
                "oreoPromptBuilder.js is not loaded."
            );

        }


        const prompt =
            window
                .oreoPromptBuilder
                .build({

                    message:
                        data.message,

                    context:
                        data.context,

                    memories:
                        data.memories,

                    plan:
                        data.plan,

                    reasoning:
                        data.reasoning,

                    understanding:
                        data.understanding,

                    personality:
                        data.personality,

                    emotionalStyle:
                        data.emotionalStyle

                });


        const modelInput =
            window
                .oreoPromptBuilder
                .buildModelInput({

                    message:
                        data.message,

                    context:
                        data.context,

                    memories:
                        data.memories,

                    plan:
                        data.plan,

                    reasoning:
                        data.reasoning,

                    understanding:
                        data.understanding,

                    personality:
                        data.personality,

                    emotionalStyle:
                        data.emotionalStyle

                });


        console.log(
            "🐾 OREO MODEL INPUT:",
            modelInput
        );


        // ==================================
        // CLOUDFLARE BACKEND
        // ==================================

        const response =
            await fetch(
                "/api/oreo",
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            system:
                                prompt.system,

                            input:
                                modelInput

                        })

                }
            );


        if (
            !response.ok
        ) {

            const errorData =
                await response
                    .json()
                    .catch(
                        () => ({})
                    );


            throw new Error(

                errorData.error ||
                `Oreo backend returned ${response.status}`

            );

        }


        const result =
            await response.json();


        if (
            !result.text
        ) {

            throw new Error(
                "Oreo AI returned no text."
            );

        }


        this.state.lastResponseId =
            result.responseId ||
            null;


        return {

            text:
                result.text,

            source:
                "openai",

            model:
                result.model ||
                "api",

            responseId:
                result.responseId ||
                null

        };

    },


    // ======================================
    // EMOTIONAL STATE
    // ======================================

    async updateEmotionalState(data) {


        const emotion =
            data.understanding.emotion;


        const primary =
            emotion?.primary ||
            "normal";


        const confidence =
            typeof emotion?.confidence === "number"
                ? emotion.confidence
                : 0.5;


        const state = {

            mood:
                primary,

            intensity:
                confidence,

            energy:
                0.5,

            affection:
                0.8,

            concern:
                0.1,

            excitement:
                0.2,

            animation:
                "idle",

            expression:
                "neutral",

            glow:
                "soft"

        };


        switch(primary) {


            case "happy":

                state.energy =
                    0.9;

                state.excitement =
                    0.9;

                state.animation =
                    "celebrate";

                state.expression =
                    "happy";

                state.glow =
                    "bright";

                break;


            case "sad":

            case "lonely":

                state.energy =
                    0.3;

                state.concern =
                    0.7;

                state.animation =
                    "gentle";

                state.expression =
                    "soft";

                break;


            case "anxiety":

                state.energy =
                    0.35;

                state.concern =
                    0.8;

                state.animation =
                    "calm";

                state.expression =
                    "concerned";

                break;


            case "love":

            case "missing":

                state.affection =
                    1;

                state.animation =
                    "warm";

                state.expression =
                    "loving";

                state.glow =
                    "warm";

                break;


            case "angry":

                state.energy =
                    0.4;

                state.concern =
                    0.5;

                state.animation =
                    "serious";

                state.expression =
                    "focused";

                break;

        }


        return state;

    },


    // ======================================
    // ACTIONS
    // ======================================

    async determineActions() {

        return [];

    },


    // ======================================
    // SAVE CONVERSATION
    // ======================================

    async storeConversation(data) {


        if (
            !window.oreoMemory
        ) {

            return;

        }


        // ==================================
        // SAVE USER MESSAGE
        // ==================================

        if (
            typeof window.oreoMemory
                .rememberUserMessage ===
            "function"
        ) {

            window
                .oreoMemory
                .rememberUserMessage({

                    message:
                        data.message,

                    emotion:
                        data.understanding
                            .emotion?.primary,

                    secondaryEmotion:
                        data.understanding
                            .secondaryEmotion,

                    intent:
                        data.understanding
                            .intent,

                    topic:
                        data.understanding
                            .topic,

                    scenario:
                        data.understanding
                            .scenario,

                    context:
                        data.understanding
                            .context

                });

        }


        // ==================================
        // SAVE OREO RESPONSE
        // ==================================

        if (
            typeof window.oreoMemory
                .rememberResponse ===
            "function"
        ) {

            window
                .oreoMemory
                .rememberResponse(
                    data.response.text
                );

        }


        // ==================================
        // REMEMBER QUESTION
        // ==================================

        const questionMatch =
            data.response.text
                .match(/[^?]*\?/);


        if (
            questionMatch
        ) {

            if (
                typeof window.oreoMemory
                    .rememberQuestion ===
                "function"
            ) {

                window
                    .oreoMemory
                    .rememberQuestion(
                        questionMatch[0]
                    );

            }

        }

        else {

            if (
                typeof window.oreoMemory
                    .clearQuestion ===
                "function"
            ) {

                window
                    .oreoMemory
                    .clearQuestion();

            }

        }

    },


    // ======================================
    // RESPONSE OBJECT
    // ======================================

    createResponse(
        text,
        metadata = {}
    ) {

        return {

            text:
                text,

            ...metadata,

            timestamp:
                new Date().toISOString()

        };

    },


    // ======================================
    // CONVERSATION ID
    // ======================================

    createConversationId() {

        return (

            "oreo_" +

            Date.now() +

            "_" +

            Math.random()
                .toString(36)
                .substring(2, 8)

        );

    },


    // ======================================
    // CURRENT WEBSITE SECTION
    // ======================================

    getCurrentSection() {


        const sections = [

            "emotionalDatabase",

            "heartArchive",

            "missionRoom",

            "ourWorld"

        ];


        for (
            const id of sections
        ) {


            const element =
                document.getElementById(id);


            if (
                element &&
                !element.hasAttribute(
                    "aria-hidden"
                )
            ) {

                return id;

            }

        }


        return "unknown";

    }

};


// ==========================================
// EXPORT
// ==========================================

window.oreoAI =
    oreoAI;


// ==========================================
// INITIALIZE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        oreoAI.init();

    }
);
