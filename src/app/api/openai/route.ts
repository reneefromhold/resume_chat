import { NextRequest, NextResponse } from 'next/server';
import data from '@/data/resume.json';

export async function POST(req: NextRequest) {
    const { prompt } = await req.json();

    const formattedResume = formatResume(); // From earlier example

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
                content: 'You are a helpful assistant that answers questions about a Renee Fromhold based on her resume. You also answer questions asked about this webiste. When responding, please answer as though you are responding to an interview question. Keep the reponse to one short sentence that has a kind tone'
            },
            {
                role: 'user',
                content: `Here is the resume:\n\n${formattedResume}`
            },
            {
                role: 'user',
                content: `Here are details of this website. It was built in July 2025 using NextJs, React, and Tailwind. It is the first time Renee has worked with NextJS`
            },
            {
                role: 'user',
                content: prompt  // e.g., "What are this candidate's strongest frontend skills?"
            }
            ],
       })
    });


  const data = await response.json();
  const message = data.choices[0].message.content;
  console.log(message);
  //return NextResponse.json(data);
  return NextResponse.json(message);
}

function formatResume() {
  
  return data.roles.map(role => {
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
}

