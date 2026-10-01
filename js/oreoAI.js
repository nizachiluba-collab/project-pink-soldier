// ==========================================
// PROJECT OREO
// MAIN AI CONTROLLER
// VERSION 7.0
// REAL AI + MEMORY + PERSONALITY
// ==========================================


const oreoAI = {

    version: "7.0",

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


        this.state.initialized = true;


        console.log(
            `%c🐾 OREO AI ${this.version} INITIALIZED`,
            "color:#7c5cff;font-weight:bold;"
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


        this.state.processing = true;


        try {

            const cleanMessage =
                message.trim();


            console.log(
                "🐾 Oreo received:",
                cleanMessage
            );


            // ==================================
            // UNDERSTANDING
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
            // MEMORY RETRIEVAL
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
            // CONTEXT
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


            // ==================================
            // RESPONSE PLAN
            // ==================================

            const plan =
                await this.planResponse(
                    context
                );


            console.log(
                "Response plan:",
                plan
            );


            // ==================================
            // PERSONALITY
            // ==================================

            const personality =
                await this.buildPersonality({

                    understanding:
                        understanding,

                    context:
                        context,

                    plan:
                        plan

                });


            console.log(
                "Personality:",
                personality
            );


            // ==================================
            // EMOTIONAL STYLE
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
            // REAL AI
            // ==================================

            const generated =
                await this.generateResponse({

                    message:
                        cleanMessage,

                    context:
                        context,

                    plan:
                        plan,

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
                "🐾 REAL OREO RESPONSE:",
                generated
            );


            // ==================================
            // EMOTIONAL STATE
            // ==================================

            const emotionalState =
                await this.updateEmotionalState({

                    understanding:
                        understanding,

                    plan:
                        plan,

                    response:
                        generated

                });


            // ==================================
            // ACTIONS
            // ==================================

            const actions =
                await this.determineActions({

                    message:
                        cleanMessage,

                    context:
                        context,

                    plan:
                        plan

                });


            // ==================================
            // SAVE EVERYTHING
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
            // RETURN
            // ==================================

            return this.createResponse(

                generated.text,

                {

                    understanding,

                    memories,

                    context,

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


        } catch (error) {

            console.error(
                "🐾 OREO AI ERROR:",
                error
            );


            return this.createResponse(

                "Give me one second, Daniella. My brain just tripped over itself 😭❤️",

                {
                    error: true,

                    errorMessage:
                        error.message

                }

            );


        } finally {

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


        if (window.oreoEmotions) {

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


        if (window.oreoIntent) {

            result.intent =
                window.oreoIntent.detect(
                    message
                );

        }


        if (window.oreoTopics) {

            result.topic =
                window.oreoTopics.detect(
                    message
                );

        }


        if (window.oreoScenario) {

            result.scenario =
                window.oreoScenario.detect(
                    message
                );

        }


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
    // MEMORY
    // ======================================

    async retrieveMemory(
        message,
        understanding
    ) {

        const memories = [];


        if (!window.oreoMemory) {
            return memories;
        }


        // Previous user message

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


        // Current context

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
    // PLANNING
    // ======================================

    async planResponse(context) {

        let conversation =
            null;


        if (
            window.oreoConversationManager
        ) {

            conversation =
                window.oreoConversationManager
                    .analyze({

                        message:
                            context.userMessage,

                        emotion:
                            context.emotion?.primary,

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


        let plan = {

            goal:
                "conversation",

            tone:
                "warm",

            energy:
                "normal",

            askQuestion:
                false,

            giveAdvice:
                false,

            validate:
                true,

            steps: [

                "understand",

                "respond naturally"

            ]

        };


        if (
            window.oreoResponsePlanner
        ) {

            plan =
                window.oreoResponsePlanner
                    .plan({

                        emotion:
                            context.emotion?.primary,

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
                            conversation

                    });

        }


        // Normalize planner output

        plan.conversation =
            conversation;


        // Do not force questions.

        if (
            conversation &&
            conversation.shouldAskQuestion === false
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
                        data.plan

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
    // REAL AI GENERATION
    // ======================================

    async generateResponse(data) {

        if (
            !window.oreoPromptBuilder
        ) {

            throw new Error(
                "oreoPromptBuilder.js is not loaded."
            );

        }


        const prompt =
            window.oreoPromptBuilder
                .build({

                    message:
                        data.message,

                    context:
                        data.context,

                    memories:
                        data.memories,

                    plan:
                        data.plan,

                    understanding:
                        data.understanding,

                    personality:
                        data.personality,

                    emotionalStyle:
                        data.emotionalStyle

                });


        const modelInput =
            window.oreoPromptBuilder
                .buildModelInput({

                    message:
                        data.message,

                    context:
                        data.context,

                    memories:
                        data.memories,

                    plan:
                        data.plan,

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


        if (!response.ok) {

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


        if (!result.text) {

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
                "gpt-5.6-luna",

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

        if (!window.oreoMemory) {
            return;
        }


        // Save user message

        if (
            typeof window.oreoMemory
                .rememberUserMessage ===
            "function"
        ) {

            window.oreoMemory
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


        // Save Oreo response

        if (
            typeof window.oreoMemory
                .rememberResponse ===
            "function"
        ) {

            window.oreoMemory
                .rememberResponse(
                    data.response.text
                );

        }


        // Remember response question

        const questionMatch =
            data.response.text
                .match(/[^?]*\?/);


        if (questionMatch) {

            if (
                typeof window.oreoMemory
                    .rememberQuestion ===
                "function"
            ) {

                window.oreoMemory
                    .rememberQuestion(
                        questionMatch[0]
                    );

            }

        } else {

            if (
                typeof window.oreoMemory
                    .clearQuestion ===
                "function"
            ) {

                window.oreoMemory
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