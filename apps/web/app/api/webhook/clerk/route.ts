import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Webhook } from 'svix'

import { clerkEvent } from './type'
import { userSyncController } from '~/server/controllers/users'

const webhookSecret = process.env.WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'Webhook secret not found' },
      { status: 401 },
    )
  }

  const headersList = req.headers

  const headers = {
    'svix-id': headersList.get('svix-id'),
    'svix-signature': headersList.get('svix-signature'),
    'svix-timestamp': headersList.get('svix-timestamp'),
  } as Record<string, string>

  try {
    const json = await req.json()
    const r = clerkEvent.safeParse(json)
    if (!r.success) {
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 },
      )
    }

    const event = r.data.type

    const wh = new Webhook(webhookSecret)
    wh.verify(JSON.stringify(r.data), headers)
    switch (event) {
      case 'user.created':
      case 'user.updated':
        await userSyncController({ input: { data: r.data } })
        break
      // case 'user.deleted':
      //   break

      // case 'session.created':
      //   await caller.clerkRouter.webhooks.userSignedIn({ data: r.data })
      //   break
      // case 'session.revoked':
      // case 'session.removed':
      // case 'session.ended':
      //   break

      // case 'organization.created':
      // case 'organizationMembership.created':
      //   break

      default:
        console.error(`${event} not handled here`)
        return NextResponse.json(
          { error: 'Internal Server Error' },
          { status: 500 },
        )
        break
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json(
      { error: `Verify webhook failed. ${err}` },
      { status: 401 },
    )
  }
}
