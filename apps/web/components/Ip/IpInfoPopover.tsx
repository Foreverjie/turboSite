import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui'

import { IpInfoOutput } from '../../server/schemas/ip'

export const IpInfoPopover: Component<IpInfoOutput> = props => {
  const { ip, city, country, region, className } = props

  return (
    <HoverCard>
      <HoverCardTrigger>
        <span className={className}>{ip}</span>
      </HoverCardTrigger>
      <HoverCardContent>
        <div>
          <span>IP: {ip}</span>
          <br />
          <span>地区: {region}</span>
          <br />
          <span>城市: {city}</span>
          <br />
          <span>国家: {country}</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
