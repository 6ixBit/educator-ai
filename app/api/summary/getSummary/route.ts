import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
   const supabase = createServerComponentClient({ cookies })
   const user = await supabase.auth.getUser()

   if (!user) {
      return NextResponse.json({'status': 'failure', 'reason': 'user not authenticated'})
   }

   const body = await request.json()
   const summary = await summarizeText(body?.content)

    return NextResponse.json({'status': 'success', user, body: body.content, gptSummary: summary})
}

async function summarizeText(content: string) {
  
   const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-1106-preview",
        messages: [
          {
            role: "user",
            content: "Summarize the content so it can be used as learning material for the user.",
            function_call: {
              name: "summarize_learning_content",
              content: content
       
            },
          }
        ],
        functions: [
          {
            name: "summarize_learning_content",
            description:
              "Summarizes the text based on the specified preset and length, and generates a title. The 'preset' parameter can be: Blog – A more informal, conversational style. e.g: 'Today, we're going to talk about...' List – A bulleted or numbered list. e.g: '1. First point... 2. Second point...' Email-formal – A formal email style. e.g: 'Dear Sir/Madam, I am writing to inform you that...' Email-informal – A casual email style. e.g: 'Hey there, just wanted to let you know that...' Descriptive – A detailed, descriptive style. e.g: 'The sun set over the horizon, casting long shadows...'. News Article – An informative and straightforward style focusing on key details. e.g: 'In a shocking turn of events...'. Storytelling – A narrative style that includes characters, setting, and plot. e.g: 'Once upon a time, in a land far, far away...'. The 'length' parameter can be 'short' (up to 80 words), 'medium' (80-150 words), or 'long' (150+ words).",
            parameters: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  description: "The text to be summarized.",
                },
              },
              required: ["content"],
            },
            output: {
              type: "object",
              properties: {
                content: {
                  type: "string",
                  description: "The summarized text.",
                },
              },
              required: ["content"],
            },
            tool_choice: 'auto',
            response_format: { "type": "json_object" }
          },
        ],
      }),
    };
  
   const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      requestOptions,
    );

    if (!response.ok) {
      console.error("OpenAI API request failed:", response);
      return {status: "failed to call gpt"};
  }

  const data = await response.json();
  console.log("open ai resp: ", data);

  // Assuming the summarized text is in data.choices[0].message.content
  return data.choices[0]?.message?.content || {status: "no summary generated"};


}