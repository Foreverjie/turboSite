import { IpInfoOutput } from '~/server/schemas/ip'
import prisma from '~/prisma/prisma-client'

export const ipInfoController = async ({
  ctx,
}: {
  ctx: any
}): Promise<IpInfoOutput> => {
  const ip = ctx.headers.get('x-real-ip') ?? ctx.headers.get('x-forwarded-for')
  if (ip) {
    // get ip info
    const ipInfo = await fetch(`https://ipinfo.io/${ip}?token=602560278ff283`)
    const ipInfoJson = await ipInfo.json()

    if (ipInfoJson.region) {
      // can alert user different login location & ip
      // update user last login info
      await prisma.user.update({
        where: {
          userId: ctx.auth.userId,
        },
        data: {
          lastLoginIp: ip,
          lastLoginTime: new Date(),
        },
      })
    }

    return {
      ip,
      city: ipInfoJson.city ?? 'unknown',
      country: ipInfoJson.country ?? 'unknown',
      region: ipInfoJson.region ?? 'unknown',
    }
  } else {
    return {
      ip: null,
      city: 'unknown',
      country: 'unknown',
      region: 'unknown',
    }
  }
}
