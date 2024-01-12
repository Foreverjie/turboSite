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
