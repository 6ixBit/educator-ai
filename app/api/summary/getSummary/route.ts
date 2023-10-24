import { NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
   const supabase = createServerComponentClient({ cookies })
   const user = await supabase.auth.getUser()

   if (!user) {
      return NextResponse.json({'status': 'failure', 'reason': 'user not logged in'})
   }

   const body = request.body


    return NextResponse.json({'status': 'success', user, body})
}