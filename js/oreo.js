// ==========================================
// PROJECT OREO
// OREO AI — SECURE BACKEND
// CLOUDFLARE PAGES FUNCTION
// ==========================================

export async function onRequestPost(context) {

    try {

        // ======================================
        // READ REQUEST
        // ======================================

        const body =
            await context.request.json();


        const {
            system,
            input
        } = body;


        // ======================================
        // VALIDATE INPUT
        // ======================================

        if (
            typeof input !== "string" ||
            !input.trim()
        ) {

            return Response.json(
                {
                    error: "Missing input."
                },
                {
                    status: 400
                }
            );

        }


        // ======================================
        // GET SECRET
        // ======================================

        const apiKey =
            context.env.OPENAI_API_KEY;


        if (!apiKey) {

            console.error(
                "OPENAI_API_KEY is not configured."
            );


            return Response.json(
                {
                    error:
                        "Oreo AI backend is not configured."
                },
                {
                    status: 500
                }
            );

        }


        // ======================================
        // CALL OPENAI RESPONSES API
        // ======================================

        const openAIResponse =
            await fetch(
                "https://api.openai.com/v1/responses",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${apiKey}`

                    },

                    body: JSON.stringify({

                        model: "gpt-5.6-luna",

                        instructions:
                            typeof system === "string"
                                ? system
                                : "",

                        input: input,

                        store: false

                    })

                }
            );


        // ======================================
        // READ RESPONSE
        // ======================================

        const data =
            await openAIResponse.json();


        // ======================================
        // HANDLE OPENAI ERROR
        // ======================================

        if (!openAIResponse.ok) {

            console.error(
                "OpenAI API error:",
                data
            );


            return Response.json(
                {
                    error:
                        data?.error?.message ||
                        "OpenAI request failed."
                },
                {
                    status:
                        openAIResponse.status
                }
            );

        }


        // ======================================
        // EXTRACT TEXT
        // ======================================

        const text =
            data.output_text || "";


        if (!text) {

            console.error(
                "OpenAI returned no output text.",
                data
            );


            return Response.json(
                {
                    error:
                        "Oreo received an empty response."
                },
                {
                    status: 502
                }
            );

        }


        // ======================================
        // RETURN TO FRONTEND
        // ======================================

        return Response.json({

            success: true,

            text: text,

            responseId:
                data.id || null,

            model:
                data.model ||
                "gpt-5.6-luna"

        });


    } catch (error) {

        console.error(
            "OREO BACKEND ERROR:",
            error
        );


        return Response.json(
            {
                error:
                    "Oreo's backend encountered an error."
            },
            {
                status: 500
            }
        );

    }

}
