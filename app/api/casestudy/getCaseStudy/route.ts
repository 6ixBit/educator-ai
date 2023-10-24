import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
   const supabase = createServerComponentClient({ cookies })
   const user = await supabase.auth.getUser()

   if (!user) {
      return NextResponse.json({'status': 'failure', 'error': 'authentication'})
   }

   const body = await request.json()


    return NextResponse.json({'status': 'success', user, body})
}