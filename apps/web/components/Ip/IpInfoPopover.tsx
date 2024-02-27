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
          <span>Region: {region}</span>
          <br />
          <span>City: {city}</span>
          <br />
          <span>Country: {country}</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
