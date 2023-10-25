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
   const summary = summarizeText(body?.content)

    return NextResponse.json({'status': 'success', user, summary: body})
}

async function summarizeText(content: string) {
   
   // TODO: Send to LLM for processing.
   return {}

}