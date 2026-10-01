// ==========================================
// PROJECT OREO
// RESPONSE BUILDER ENGINE
// VERSION 8.0
// MODEL-FREE CONVERSATIONAL ENGINE
// ==========================================

const oreoResponseBuilder = {

    build(data) {

        const {
            message,
            emotion,
            intent,
            topic,
            scenario,
            conversation,
            plan,
            reasoning,
            personality,
            memory
        } = data;


        // ==================================
        // NORMALIZE EMOTION
        // ==================================

        const emotionName =
            typeof emotion === "string"
                ? emotion
                : emotion?.primary || "normal";


        // ==================================
        // HELPERS
        // ==================================

        function random(array) {

            return array[
                Math.floor(
                    Math.random() *
                    array.length
                )
            ];
        }


        function avoidRepeat(pool) {

            if (
                !memory ||
                typeof memory.wasResponseUsed !==
                    "function"
            ) {

                return pool;
            }


            const filtered =
                pool.filter(
                    response =>
                        !memory.wasResponseUsed(
                            response
                        )
                );


            return filtered.length
                ? filtered
                : pool;
        }


        function withNickname(response) {

            if (!personality) {
                return response;
            }


            const chance =
                personality.nicknameChance ||
                0;


            if (
                Math.random() * 100 >
                chance
            ) {

                return response;
            }


            const nickname =
                random([
                    "Girl ❤️",
                    "Babes 🥺❤️",
                    "Daniella ❤️"
                ]);


            return `${nickname} ${response}`;
        }


        function finishQuestion(
            response
        ) {

            if (
                plan &&
                plan.askQuestion === false
            ) {

                return response
                    .replace(
                        /[^.!]*\?$/,
                        "."
                    );
            }


            return response;
        }


        // ==================================
        // GREETING
        // ==================================

        if (
            intent === "greeting" ||
            emotionName === "greeting"
        ) {

            return random([

                "Heyyy Daniella ❤️",

                "Hey girl 😭❤️",

                "Hiii babes 🥺❤️",

                "Hey Daniella. Oreo is here 🐾❤️",

                "Well hello there 😂❤️"
            ]);
        }


        // ==================================
        // HAPPY
        // ==================================

        if (
            emotionName === "happy"
        ) {

            const responses = [

                "😭❤️ okay wait, I love this energy. Tell me everything.",

                "Girl ❤️ I can already tell something good happened.",

                "Okayyy 😂❤️ I need the story. What's going on?",

                "This is a very happy Daniella message 😭❤️"
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // LOVE
        // ==================================

        if (
            emotionName === "love"
        ) {

            const responses = [

                "Awww 🥺❤️ I can hear how much love there is in the way you're talking about him.",

                "That's really sweet ❤️ there's clearly a lot of feeling behind that.",

                "🥺❤️ okay, that sounds like something that means a lot to you.",

                "Some people really do start feeling like home ❤️"
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // MISSING
        // ==================================

        if (
            emotionName === "missing"
        ) {

            const responses = [

                "🥺❤️ Missing someone you love can hit really hard.",

                "I know that feeling where you just wish they were beside you ❤️",

                "Distance feels different when it's someone important to you.",

                "Aww babes 🥺❤️ sounds like you really want him close right now."
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // SAD
        // ==================================

        if (
            emotionName === "sad"
        ) {

            const responses = [

                "I'm here with you ❤️",

                "That sounds really heavy 🥺",

                "I hear you ❤️ you don't have to pretend you're okay with Oreo.",

                "Come here 🥺❤️ tell me what's weighing on you."
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // INSECURITY
        // ==================================

        if (
            emotionName === "insecurity"
        ) {

            const responses = [

                "Girl ❤️ I want you to know that feeling insecure doesn't make the things you're worried about automatically true.",

                "I hear you 🥺❤️ and I want to understand what made you feel this way.",

                "That's a painful place to be in ❤️",

                "Hey, don't be so hard on yourself 🥺❤️"
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // ANXIETY
        // ==================================

        if (
            emotionName === "anxiety"
        ) {

            const responses = [

                "Okay, slow down with me ❤️ one thing at a time.",

                "Take a breath, babes 🥺❤️ let's deal with what's actually happening first.",

                "I know your mind might be running everywhere right now ❤️",

                "You don't have to solve everything at once 🥺"
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // ANGRY
        // ==================================

        if (
            emotionName === "angry"
        ) {

            if (
                scenario ===
                "relationship_conflict"
            ) {

                const responses = [

                    "Okay girl ❤️ I'm listening. What happened between you two?",

                    "I can tell that really upset you. Tell me what happened.",

                    "Alright, let's slow it down ❤️ what started this?",

                    "I'm listening. Give me the whole story."
                ];


                return finishQuestion(
                    withNickname(
                        random(
                            avoidRepeat(
                                responses
                            )
                        )
                    )
                );
            }


            const responses = [

                "Okay girl ❤️ I'm listening.",

                "I can tell something really bothered you.",

                "Alright. Tell me what happened.",

                "I'm here. Get it off your chest ❤️"
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // LONELY
        // ==================================

        if (
            emotionName === "lonely"
        ) {

            const responses = [

                "I'm here with you ❤️",

                "You don't have to sit with that feeling alone 🥺",

                "Come talk to Oreo ❤️",

                "Aww babes 🥺❤️ what's making you feel alone?"
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // RELATIONSHIP
        // ==================================

        if (
            topic === "relationship"
        ) {

            const responses = [

                "Okay ❤️ I'm following you.",

                "I understand what you're saying.",

                "Hmm okay, tell me more about that.",

                "I'm with you ❤️ keep going."
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // CONTINUING CONVERSATION
        // ==================================

        if (
            conversation?.continuing ||
            reasoning?.shouldReferenceMemory
        ) {

            const responses = [

                "Yeah ❤️ I remember where we were going with this.",

                "Mhm, I'm following you.",

                "Okay, I get what you're saying now.",

                "Yeah, keep going. I'm listening ❤️",

                "I'm with you."
            ];


            return finishQuestion(
                withNickname(
                    random(
                        avoidRepeat(
                            responses
                        )
                    )
                )
            );
        }


        // ==================================
        // GENERAL FALLBACK
        // ==================================

        const responses = [

            "I'm listening ❤️ tell me what's on your mind.",

            "Okay girl, talk to me.",

            "I'm here ❤️",

            "Alright, I'm listening.",

            "Tell Oreo what's going on 🐾❤️"
        ];


        return finishQuestion(
            withNickname(
                random(
                    avoidRepeat(
                        responses
                    )
                )
            )
        );
    }
};


window.oreoResponseBuilder =
    oreoResponseBuilder;
