import { NextRequest, NextResponse } from 'next/server';
import generateChatResponse, { ChatMessage } from '@/app/services/chatService';

export async function POST(req: NextRequest) {
    const props: ChatMessage[] = await req.json();
    const responses = await generateChatResponse(props);
    return NextResponse.json(responses);
}