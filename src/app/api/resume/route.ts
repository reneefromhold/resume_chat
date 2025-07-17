import data from '@/data/resume.json';

export async function GET() {
  try{
    return Response.json(data);
  } catch (err) {
    console.error("API error:", err);
    return new Response('Internal Server Error', { status: 500 });
  }
}