'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { headerMenuConfig as baseHeaderMenuConfig } from '../config'
import { useAggregationSelector } from '../../../../providers/root/aggregation-data-provider'
import { cloneDeep } from 'lodash'

const HeaderMenuConfigContext = createContext({
  config: baseHeaderMenuConfig,
})

export const useHeaderConfig = () => useContext(HeaderMenuConfigContext)

export const HeaderDataConfigureProvider: Component = ({ children }) => {
  const pageMeta = useAggregationSelector().aggregationData?.pageMeta
  const categories = useAggregationSelector().aggregationData?.categories

  const [headerMenuConfig, setHeaderMenuConfig] = useState(baseHeaderMenuConfig)

  useEffect(() => {
    if (!pageMeta) return
    const nextMenuConfig = cloneDeep(baseHeaderMenuConfig)

    const homeIndex = nextMenuConfig.findIndex(item => item.type === 'Home')
    if (homeIndex !== -1) {
      nextMenuConfig[homeIndex].subMenu = []
      for (const page of pageMeta) {
        nextMenuConfig[homeIndex].subMenu!.push({
          title: page.title,
          path: `/page/${page.slug}`,
        })
      }
    }

    if (categories?.length) {
      const postIndex = nextMenuConfig.findIndex(item => item.type === 'Post')
      if (postIndex !== -1) {
        nextMenuConfig[postIndex].subMenu = []
        for (const category of categories) {
          nextMenuConfig[postIndex].subMenu!.push({
            title: category.name,
            path: `/category/${category.slug}`,
          })
        }
      }
    }
  }, [pageMeta, categories])

  return (
    <HeaderMenuConfigContext.Provider
      value={useMemo(() => ({ config: headerMenuConfig }), [headerMenuConfig])}
    >
      {children}
    </HeaderMenuConfigContext.Provider>
  )
}
