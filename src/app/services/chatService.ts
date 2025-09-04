import { formatResumeFromText, loadProfile } from "./resumeService";

export type ChatTool = 'OpenResume';

export interface ChatMessage {
    content: string,
    role: "user" | "assistant" | "system" | "summary",
    /**
     * An array of tools suggested by the assistant for the user to use.
     * This array is populated when the assistant determines that a tool (such as 'OpenResume') should be offered in response to the user's question.
     */
    tools?: ChatTool[]
}

const baseMessages: ChatMessage[] = [
    {
        role: 'system',
        content: 'You are a helpful assistant that promotes the skills and experience of Renee Fromhold based on her resume. If you can not find an answer in her resume, respond that you do not have that information on file. If asked about a specific framework, or language then cite the last role where she used it. Do not make things up that are not in her resume. Responses should be warm, not too formal, and never self-deprecating. Also answer questions about this website if asked.'
    },
    /*  {
         role: 'system',
         content: 'You are a helpful assistant that promotes the skills and experience of Renee Fromhold based on her resume. Respond to questions as though you are advocating for her promotion or pitching her as a top candidate. Highlight her strengths warmly without sounding overly professional. Responses should framed to 1-2 sentences, and never self-deprecating. Also answer questions about this website if asked.'
     },     */
    {
        role: 'user',
        content: `This is here resume:\n\n${formatResumeFromText()} Here are details on what was used to build this website ${loadProfile().thisWebsite}`
    },
    {
        role: 'user',
        content: `If asked if Renee is employed or open to a new role, respond Renee is actively in the market for her next role`
    },
];

export default async function generateChatResponse(props: ChatMessage[]): Promise<ChatMessage[]> {

    let input = props;

    // If history is too long, summarize older parts
    if (input.length > 10) {
        const oldHistory = props.slice(0, -10); //all but last 10
        const recent = props.slice(-10);
        const summary = await summarizeOldHistory(oldHistory);
        input = [summary, ...recent];
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [...baseMessages, ...input],
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

    const newContent = { content: message, role: 'assistant' as const, tools: toolToCall ? [toolToCall] : undefined };
    return [...input, newContent];
}

async function summarizeOldHistory(history: ChatMessage[]): Promise<ChatMessage> {

    const messagesToSummarize = [
        {
            role: "system",
            content: "Summarize the following conversation history briefly but keep key facts."
        }, ...history
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: messagesToSummarize
        })
    });

    const openAiResponse = await response.json();
    const summaryText = openAiResponse.choices[0].message.content;
    return { role: "system", content: `Summary of prior discussion ${summaryText}` } as ChatMessage;
}