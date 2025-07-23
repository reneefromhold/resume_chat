import { NextRequest, NextResponse } from 'next/server';
import data from '@/data/resume.json';

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    const formattedResume = formatResume();

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
                    content: `Here is the resume:\n\n${formattedResume} Here are details on what was used to build this website ${data.thisWebsite}`
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            tools: [
                {
                    type: 'function',
                    function: {
                        name: 'resume',
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
    const toolToCall = openAiResponse.choices[0].message.tool_calls ?? undefined;

    // Extract tool call and route to your tool handler
    //handleToolCall(openAiResponse.choices[0].message.tool_calls);
    return NextResponse.json({ message: message, tool: toolToCall });
}

function formatResume() {

    const roles = data.roles.map(role => {
        const dates = `${role.startDate} – ${role.endDate}`;
        const stack = role.stack.join(', ');
        const achievements = role.achievements.map(a => `- ${a}`).join('\n');

        return `
        ${role.title} at ${role.companyName} (${dates}) — ${role.city}, ${role.state}
        Industry: ${role.industry}
        Stack: ${stack}

        ${role.summary || ''}

        Achievements:
        ${achievements}
            `.trim();
    }).join('\n\n');

    const education = `Education ${data.education.map(e => {
        const degreeDetails = e.degree !== '' ? `Earned a ${e.degree}` : "Paused for family";
        return `Majored in ${e.major} at ${e.school} ${degreeDetails}`;
    })}`;

    const certifications = `Certifications ${data.certifications.map(c =>
        `Earned a ${c.name} from ${c.provider} in ${c.year}`)}`;

    const interests = `Interests and hobbies include ${data.interests}`;

    return `${interests} ${education} ${certifications} ${roles}`;
}

