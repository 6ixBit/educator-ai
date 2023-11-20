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
            description: "Summarizes the content into a viable learning format, it should be easy for the user to decipher and study the content.",
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
      "https://api.openai.com/v1/completions",
      requestOptions,
    );

    if (!response.ok) {
      console.error("OpenAI API request failed:", response);
      return {status: "failed to call gpt"};
  }

  const data = await response.json();

  // Assuming the summarized text is in data.choices[0].message.content
  return data.choices[0]?.message?.content || {status: "no summary generated"};


}