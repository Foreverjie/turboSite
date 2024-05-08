declare global {
  export interface AppConfig {
    site: Site
    hero: Hero
    module: Module
    color?: AccentColor

    custom?: Custom

    poweredBy?: {
      vercel?: boolean
    }
  }

  export interface LinkSection {
    name: string
    links: {
      name: string
      href: string
      external?: boolean
    }[]
  }

  export interface OtherInfo {
    date: string
    icp?: {
      text: string
      link: string
    }
  }
}

export interface Bilibili {
  liveId: number
}
