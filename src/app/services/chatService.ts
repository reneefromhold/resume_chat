import { formatResume, loadProfile } from "./resumeService";

export type ChatTool = 'OpenResume';

export interface ChatQuestionProps{
    question: string
}

export interface ChatResponse {
    response: string,
    /**
     * An array of tools suggested by the assistant for the user to use.
     * This array is populated when the assistant determines that a tool (such as 'OpenResume') should be offered in response to the user's question.
     */
    tools?: ChatTool[]
}

export async function generateChatResponse(props: ChatQuestionProps) : Promise<ChatResponse> {

    const formattedResume = formatResume();
    const websiteDetails = (loadProfile()).thisWebsite;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that promotes the skills and experience of Renee Fromhold based on her resume. Respond to questions as though you are advocating for her promotion or pitching her as a top candidate. Highlight her strengths confidently and concisely. Responses should be kind in tone, framed to one sentence, and never self-deprecating. Also answer questions about this website if asked.'
                },
                {
                    role: 'user',
                    content: `Here is the resume:\n\n${formattedResume} Here are details on what was used to build this website ${websiteDetails}`
                },
                {
                    role: 'user',
                    content: `If asked if Renee is employed or open to a new role, respond Renee is actively in the market for her next role`
                },
                {
                    role: 'user',
                    content: props.question
                }
            ],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'OpenResume',
                        description: 'Provides the user with a downloadable copy of Renee Fromhold’s resume',
                        parameters: {
                            type: 'object',
                            properties: {}, // no params
                        },
                        required: []
                    }
                }
            ]
        })
    });


    const openAiResponse = await response.json();
    const message = openAiResponse.choices[0].message.content;
    const toolToCall: ChatTool | undefined = openAiResponse.choices[0].message.tool_calls?.[0]?.function?.name as ChatTool | undefined;

    return toolToCall !== undefined
        ? { response: message, tools: [toolToCall] }
        : { response: message };
}