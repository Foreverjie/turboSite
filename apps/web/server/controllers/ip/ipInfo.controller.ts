import { IpInfoOutput, ipInfoInput } from '~/server/schemas/ip'

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

    console.log('ipInfo', ipInfoJson)
    return {
      city: ipInfoJson.city ?? 'unknown',
      country: ipInfoJson.country ?? 'unknown',
      region: ipInfoJson.region ?? 'unknown',
    }
  } else {
    return {
      city: 'unknown',
      country: 'unknown',
      region: 'unknown',
    }
  }
}
