'use client'

import { usePageIsActive } from '~/hooks/common/use-is-active'
import { FloatPopover } from '../../ui/float-popover'
import { NumberSmoothTransition } from '../../ui/number-smooth-transition/NumberSmoothTransition'
import { Divider } from '../../ui/divider'
import { ImpressionView } from '../../common/ImpressionTracker'
import { TrackerAction } from '../../../constants/tracker'

const Help = () => {
  return (
    <FloatPopover
      mobileAsSheet
      as="span"
      triggerElement={
        <i className="icon-[mingcute--question-line] cursor-help" />
      }
      type="tooltip"
      asChild
      sheet={{
        triggerAsChild: true,
      }}
    >
      <div className="space-y-2 leading-relaxed">
        <p className="flex items-center space-x-1 opacity-80">
          <i className="icon-[mingcute--question-line]" />
          <span className="font-medium">How is this implemented?</span>
        </p>
        <p>
          When you open this page, a WebSocket connection is automatically
          established. When the connection is successfully established, the
          server will push the number of people currently browsing the page.
        </p>
        <p>
          WebSocket Used to notify the site, the owner&apos;s real-time
          activities on the site, including but not limited to the publication
          and update of articles.
        </p>
        <Divider />
        <p>
          Current Socket Status: <ConnectedIndicator />
        </p>
      </div>
    </FloatPopover>
  )
}

const ConnectedIndicator = () => {
  // const connected = useSocketIsConnect()
  const connected = true

  return (
    <div className="inline-flex items-center">
      <ImpressionView
        trackerMessage="socket_status"
        action={TrackerAction.Impression}
      />
      <ConnectionStatus isConnected={connected} />
    </div>
  )
}

function ConnectionStatus({ isConnected }: { isConnected: boolean }) {
  const color = isConnected ? '#00FC47' : '#FC0000'
  const secondaryColor = isConnected
    ? 'rgba(174, 244, 194, 0.46)'
    : 'rgba(244, 174, 174, 0.46)'
  const text = isConnected ? 'Connected' : 'Unconnected'

  const backgroundStyle = {
    background: `radial-gradient(45.91% 45.91% at 49.81% 54.09%, ${color} 7.13%, ${secondaryColor} 65.83%, rgba(252, 252, 252, 0.00) 100%)`,
  }

  return (
    <>
      <span className="absolute size-5" style={backgroundStyle} />
      <span className="ml-6">{text}</span>
    </>
  )
}

export const GatewayInfo = () => {
  const isActive = usePageIsActive()

  const count = 1

  if (!isActive) {
    return null
  }
  return (
    <div className="inline-flex items-center gap-2">
      <FloatPopover
        asChild
        mobileAsSheet
        placement="top"
        trigger="both"
        offset={10}
        triggerElement={
          <span key={count} className="cursor-pointer">
            正在被{' '}
            <span>
              <NumberSmoothTransition>{count}</NumberSmoothTransition>
            </span>{' '}
            人看爆
          </span>
        }
      >
        {/* <RoomsInfo /> */}
      </FloatPopover>
      <Help />
    </div>
  )
}
