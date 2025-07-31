import { NextResponse } from "next/server";
import { loadProfile } from "../../services/resumeService" 

export async function GET() {
    return NextResponse.json(loadProfile());
}