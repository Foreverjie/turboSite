import Link from 'next/link'
import type { JSX } from 'react'
import type { FooterConfig } from './config'

import { cn } from 'ui/src/utils'
import { FloatPopover } from '~/components/ui/float-popover'
// import { MLink } from '~/components/ui/link'

import { defaultLinkSections } from './config'
// import { footerConfig } from './config'
import { GatewayInfo } from './GatewayInfo'

// const isVercelEnv = !!process.env.NEXT_PUBLIC_VERCEL_ENV
export const FooterInfo = () => {
  return (
    <>
      <div className="relative">
        <FooterLinkSection />
        {/* {isVercelEnv && (
          <div className="absolute top-0 hidden lg:-right-8 lg:block">
            <VercelPoweredBy />
          </div>
        )} */}
      </div>

      <FooterBottom />

      {/* {isVercelEnv && (
        <div className="mt-6 flex justify-center lg:hidden">
          <VercelPoweredBy />
        </div>
      )} */}
    </>
  )
}

const FooterLinkSection = async () => {
  const footerConfig: FooterConfig = {
    linkSections: defaultLinkSections,
    otherInfo: {
      date: new Date().toLocaleDateString(),
      icp: {
        text: '',
        link: '#',
      },
    },
  }

  return (
    <div className="space-x-0 space-y-3 md:space-x-6 md:space-y-0">
      {footerConfig.linkSections.map(section => {
        return (
          <div
            className="flex items-center gap-4 md:inline-flex"
            key={section.name}
          >
            <b className="inline-flex items-center font-medium">
              {section.name}
              {/* <IonIosArrowDown className="ml-2 inline -rotate-90 select-none" /> */}
            </b>

            <span className="space-x-4 text-neutral-content/90">
              {section.links.map(link => {
                return (
                  <StyledLink
                    external={link.external}
                    className="link-hover link"
                    href={link.href}
                    key={link.name}
                  >
                    {link.name}
                  </StyledLink>
                )
              })}
            </span>
          </div>
        )
      })}
    </div>
  )
}

const StyledLink = (
  props: JSX.IntrinsicElements['a'] & {
    external?: boolean
  },
) => {
  const { external, ...rest } = props
  const As = external ? 'a' : Link

  return (
    // @ts-ignore
    <As
      className="link-hover link"
      target={props.external ? '_blank' : props.target}
      {...rest}
    >
      {props.children}
    </As>
  )
}
const Divider: Component = ({ className }) => {
  return (
    <span className={cn('select-none whitespace-pre opacity-50', className)}>
      {' '}
      |{' '}
    </span>
  )
}

const PoweredBy: Component = ({ className }) => {
  return (
    <span className={className}>
      Powered by{' '}
      <StyledLink href="https://github.com/trpc/trpc" target="_blank">
        trpc
      </StyledLink>
      <span className="mx-1">&</span>
      <FloatPopover
        isDisabled={!process.env.COMMIT_HASH}
        mobileAsSheet
        type="tooltip"
        triggerElement={
          <StyledLink
            href="https://github.com/Foreverjie/turboSite"
            target="_blank"
          >
            turboSite
          </StyledLink>
        }
      >
        这是{' '}
        <StyledLink
          className="underline"
          href="https://github.com/Foreverjie/turboSite"
          target="_blank"
        >
          turboSite
        </StyledLink>{' '}
        的开源版本。
        {/* {process.env.COMMIT_HASH && process.env.COMMIT_URL && (
          <MLink popper={false} href={process.env.COMMIT_URL}>
            版本哈希：{process.env.COMMIT_HASH.slice(0, 8)}
          </MLink>
        )} */}
      </FloatPopover>
      .
    </span>
  )
}

// type VisitorGeolocation = {
//   country: string
//   city?: string
//   flag: string
// }
const FooterBottom = async () => {
  // let lastVisitor: VisitorGeolocation | undefined = undefined
  // if (process.env.VERCEL_ENV === 'production') {
  //   const [lv, cv] = await redis.mget<VisitorGeolocation[]>(
  //     kvKeys.lastVisitor,
  //     kvKeys.currentVisitor,
  //   )
  //   lastVisitor = lv
  //   await redis.set(kvKeys.lastVisitor, cv)
  // }

  // if (isDev) {
  //   lastVisitor = {
  //     country: 'US',
  //     flag: '🇺🇸',
  //   }
  // }

  const currentYear = new Date().getFullYear().toString()

  return (
    <div className="mt-12 space-y-3 text-center md:mt-6 md:text-left">
      <p>
        <span>© {currentYear} </span>
        <a href="/">Shane</a>
        <span>.</span>
        <span>
          <Divider />
          <a href="/feed" target="_blank">
            RSS
          </a>
          <Divider />
          <a href="/sitemap.xml" target="_blank">
            SiteMap
          </a>
          <Divider className="inline" />

          {/* <SubscribeTextButton>
            <Divider className="hidden md:inline" />
          </SubscribeTextButton> */}
        </span>
        <span className="mt-3 block md:mt-0 md:inline">
          Stay hungry. Stay foolish.
        </span>
      </p>
      <div>
        <PoweredBy className="my-3 block md:my-0 md:inline" />
        <GatewayInfo />
      </div>
    </div>
  )
}
