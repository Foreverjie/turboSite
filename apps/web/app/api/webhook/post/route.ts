import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
// import { Webhook } from 'svix'

import { feedEvent } from './type'
import { postNewHookController } from '~/server/controllers/posts'

// const webhookSecret = process.env.WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  //   if (!webhookSecret) {
  //     return NextResponse.json(
  //       { error: 'Webhook secret not found' },
  //       { status: 401 },
  //     )
  //   }

  //   const headersList = req.headers

  //   const headers = {
  //     'svix-id': headersList.get('svix-id'),
  //     'svix-signature': headersList.get('svix-signature'),
  //     'svix-timestamp': headersList.get('svix-timestamp'),
  //   } as Record<string, string>

  try {
    const json = await req.json()
    const r = feedEvent.safeParse(json)
    if (!r.success) {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      )
    }

    const type = r.data.event_type

    // const wh = new Webhook(webhookSecret)

    // wh.verify(JSON.stringify(json), headers)

    // manually verify
    // const signedContent = `${headersList.get('svix-id')}.${headersList.get(
    //   'svix-timestamp',
    // )}.${JSON.stringify(r.data)}`

    // const secretBytes = new Buffer(webhookSecret.split('_')[1], 'base64')
    // const signature = crypto
    //   .createHmac('sha256', secretBytes)
    //   .update(signedContent)
    //   .digest('base64')
    // const expectedSignature = headers['svix-signature']
    //   .split(' ')
    //   .map((s: string) => s.split(',')[1])

    // console.log('signature', signature)

    // if (expectedSignature.includes(signature)) {
    //   return NextResponse.json({ success: true })
    // } else {
    //   return NextResponse.json(
    //     { error: 'Incorrect Signature' },
    //     { status: 401 },
    //   )
    // }

    switch (type) {
      case 'new_entries':
        await postNewHookController({ input: r.data, ctx: {} })
        break

      default:
        console.error(`${type} not handled here`)
        return NextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 },
        )
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: `Verify webhook failed. ${err}` },
      { status: 401 },
    )
  }
}
