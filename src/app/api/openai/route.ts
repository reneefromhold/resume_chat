import { NextRequest, NextResponse } from 'next/server';
import { ChatQuestionProps, generateChatResponse } from '@/app/services/chatService';

export async function POST(req: NextRequest) {
    const props : ChatQuestionProps = await req.json();

    const generatedResponse = await generateChatResponse(props);
    return NextResponse.json(generatedResponse);
}