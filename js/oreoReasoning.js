
// ==========================================
// PROJECT OREO
// OREO REASONING ENGINE
// VERSION 1.0
// MODEL-FREE CONVERSATIONAL REASONING
// ==========================================


const oreoReasoning = {


    analyze(data) {


        const {

            message,
            emotion,
            secondaryEmotion,
            intent,
            topic,
            scenario,
            context,
            conversation,
            memory,
            plan

        } = data;


        // ==========================================
        // NORMALIZE EMOTION
        // ==========================================

        const emotionName =
            typeof emotion === "string"
                ? emotion
                : emotion?.primary || "normal";


        const emotionIntensity =
            typeof emotion === "object"
                ? emotion?.intensity || 0
                : 0;


        // ==========================================
        // DEFAULT REASONING STATE
        // ==========================================

        const reasoning = {

            userNeed: "conversation",

            responseGoal: "continue_conversation",

            shouldValidate: true,

            shouldAdvise: false,

            shouldAskQuestion: false,

            shouldReferenceMemory: false,

            shouldMentionNiza: false,

            emotionalDepth: "normal",

            urgency: "normal",

            conversationalMode: "casual",

            confidence: 0.5

        };


        // ==========================================
        // GREETING
        // ==========================================

        if (
            intent === "greeting" ||
            emotionName === "greeting"
        ) {

            reasoning.userNeed =
                "social_connection";

            reasoning.responseGoal =
                "greet_and_open_conversation";

            reasoning.shouldValidate =
                false;

            reasoning.shouldAskQuestion =
                false;

            reasoning.conversationalMode =
                "casual";

            reasoning.confidence =
                0.95;

        }


        // ==========================================
        // SADNESS
        // ==========================================

        else if (
            emotionName === "sad"
        ) {

            reasoning.userNeed =
                "emotional_support";

            reasoning.responseGoal =
                "comfort_and_understand";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                false;

            reasoning.shouldAskQuestion =
                true;

            reasoning.emotionalDepth =
                emotionIntensity > 0.7
                    ? "deep"
                    : "moderate";

            reasoning.conversationalMode =
                "supportive";

            reasoning.confidence =
                0.9;

        }


        // ==========================================
        // ANXIETY
        // ==========================================

        else if (
            emotionName === "anxiety"
        ) {

            reasoning.userNeed =
                "reassurance";

            reasoning.responseGoal =
                "calm_and_ground";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                true;

            reasoning.shouldAskQuestion =
                true;

            reasoning.emotionalDepth =
                "deep";

            reasoning.urgency =
                emotionIntensity > 0.8
                    ? "high"
                    : "normal";

            reasoning.conversationalMode =
                "calming";

            reasoning.confidence =
                0.9;

        }


        // ==========================================
        // ANGER
        // ==========================================

        else if (
            emotionName === "angry"
        ) {

            reasoning.userNeed =
                "being_heard";

            reasoning.responseGoal =
                "listen_and_understand";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                false;

            reasoning.shouldAskQuestion =
                true;

            reasoning.emotionalDepth =
                "moderate";

            reasoning.conversationalMode =
                "calm";

            reasoning.confidence =
                0.9;

        }


        // ==========================================
        // INSECURITY
        // ==========================================

        else if (
            emotionName === "insecurity"
        ) {

            reasoning.userNeed =
                "reassurance";

            reasoning.responseGoal =
                "reassure_and_understand";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                false;

            reasoning.shouldAskQuestion =
                true;

            reasoning.emotionalDepth =
                "deep";

            reasoning.conversationalMode =
                "gentle";

            reasoning.confidence =
                0.9;

        }


        // ==========================================
        // LONELINESS
        // ==========================================

        else if (
            emotionName === "lonely"
        ) {

            reasoning.userNeed =
                "connection";

            reasoning.responseGoal =
                "provide_companionship";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                false;

            reasoning.shouldAskQuestion =
                true;

            reasoning.emotionalDepth =
                "deep";

            reasoning.conversationalMode =
                "affectionate";

            reasoning.confidence =
                0.9;

        }


        // ==========================================
        // MISSING SOMEONE
        // ==========================================

        else if (
            emotionName === "missing"
        ) {

            reasoning.userNeed =
                "connection";

            reasoning.responseGoal =
                "comfort_and_connect";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                false;

            reasoning.shouldAskQuestion =
                true;

            reasoning.shouldMentionNiza =
                true;

            reasoning.emotionalDepth =
                "moderate";

            reasoning.conversationalMode =
                "affectionate";

            reasoning.confidence =
                0.9;

        }


        // ==========================================
        // LOVE
        // ==========================================

        else if (
            emotionName === "love"
        ) {

            reasoning.userNeed =
                "emotional_connection";

            reasoning.responseGoal =
                "share_affection";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                false;

            reasoning.shouldAskQuestion =
                true;

            reasoning.shouldMentionNiza =
                true;

            reasoning.conversationalMode =
                "romantic";

            reasoning.confidence =
                0.9;

        }


        // ==========================================
        // HAPPINESS
        // ==========================================

        else if (
            emotionName === "happy"
        ) {

            reasoning.userNeed =
                "sharing";

            reasoning.responseGoal =
                "celebrate_with_user";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                false;

            reasoning.shouldAskQuestion =
                true;

            reasoning.conversationalMode =
                "playful";

            reasoning.confidence =
                0.9;

        }


        // ==========================================
        // RELATIONSHIP SCENARIO
        // ==========================================

        if (
            topic === "relationship"
        ) {

            reasoning.conversationalMode =
                "personal";

        }


        // ==========================================
        // RELATIONSHIP CONFLICT
        // ==========================================

        if (
            scenario === "relationship_conflict"
        ) {

            reasoning.userNeed =
                "being_heard";

            reasoning.responseGoal =
                "understand_conflict";

            reasoning.shouldValidate =
                true;

            reasoning.shouldAdvise =
                false;

            reasoning.shouldAskQuestion =
                true;

            reasoning.conversationalMode =
                "calm";

        }


        // ==========================================
        // CONTINUING CONVERSATION
        // ==========================================

        if (
            conversation?.continuing
        ) {

            reasoning.shouldReferenceMemory =
                true;

            reasoning.conversationalMode =
                reasoning.conversationalMode === "casual"
                    ? "familiar"
                    : reasoning.conversationalMode;

        }


        // ==========================================
        // EXISTING MEMORY
        // ==========================================

        if (
            memory &&
            memory.history &&
            memory.history.length > 2
        ) {

            reasoning.shouldReferenceMemory =
                true;

        }


        // ==========================================
        // RETURN
        // ==========================================

        return reasoning;

    }

};


window.oreoReasoning =
    oreoReasoning;

