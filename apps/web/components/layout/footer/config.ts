export const defaultLinkSections: LinkSection[] = [
  {
    name: 'About',
    links: [
      {
        name: 'About Site',
        href: '/about-site',
      },
      {
        name: 'About Me',
        href: '/about-me',
      },
      {
        name: 'About TurboSite',
        href: 'https://github.com/Foreverjie/turboSite',
        external: true,
      },
    ],
  },
  {
    name: 'More',
    links: [
      {
        name: 'TimeLine',
        href: '/timeline',
      },
      {
        name: 'Friends',
        href: '/friends',
      },
      //   {
      //     name: '监控',
      //     href: 'https://status.shizuri.net/status/main',
      //     external: true,
      //   },
    ],
  },
  {
    name: 'Contact',
    links: [
      {
        name: 'Message',
        href: '/message',
      },
      {
        name: 'Email',
        href: 'mailto:zhangzjsysu@foxmail.com',
        external: true,
      },
      {
        name: 'GitHub',
        href: 'https://github.com/Foreverjie',
        external: true,
      },
    ],
  },
]

export interface FooterConfig {
  linkSections: LinkSection[]
  otherInfo: OtherInfo
}
