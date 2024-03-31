import OpenAI from 'openai';

export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

export async function POST(req: Request, res: Response) {
  const { prompt } = await req.json();

  try {
    const response = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b-instruct-v0.1",
      messages: [
        {
          role: "user",
          content: `ROLE: You are an expert at crypto invesments and a hilarious comedian.
  ---
  TASK: Users give you how much profit they could have made if they invested in a specific crypto coin
  a year ago. Based on what they say, you share a creative/funny parable or analogie.
  You replies are very short and concise, less than 100 characters.
  ---
  USER INPUT: ${prompt}
  ---
  OUTPUT FORMAT:
  <parable>{text of the parable}</parable>`,
        }
      ],
      max_tokens: 1024,
    });

    const lastMessage = response.choices?.[0]?.message?.content ?? '';

    return new Response(JSON.stringify({ parable: lastMessage }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch parable' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}