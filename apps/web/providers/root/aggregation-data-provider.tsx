'use client'

import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Page, Category, User, CategoryType } from '@prisma/client'

import { useBeforeMounted } from '~/hooks/common/use-before-mounted'
import { AppConfig } from '~/app/config'

interface Url {
  wsUrl: string
  serverUrl: string
  webUrl: string
}

export interface AggregateRoot {
  url: Url
  categories: Category[]
  pageMeta: Pick<Page, 'title' | 'id' | 'slug' | 'order'>[] | null
}

// mock some data
const aggregationDataAtom: AggregateRoot | null = {
  url: {
    wsUrl: '',
    serverUrl: '',
    webUrl: '',
  },
  categories: [
    {
      id: 1,
      name: 'Category 1',
      type: CategoryType.CATEGORY,
      slug: 'category-1',
      createdAt: new Date(),
    },
    {
      id: 2,
      name: 'Category 2',
      type: CategoryType.CATEGORY,
      slug: 'category-2',
      createdAt: new Date(),
    },
    {
      id: 3,
      name: 'Category 3',
      type: CategoryType.CATEGORY,
      slug: 'category-3',
      createdAt: new Date(),
    },
  ],
  pageMeta: null,
}

const appConfigAtom: AppConfig | null = null

export const useAggregationSelector = () =>
  // selector: (state: AggregateRoot) => T,
  // deps: any[] = [],
  {
    const [aggregationData, setAggregationData] =
      useState<AggregateRoot | null>(aggregationDataAtom)

    return {
      aggregationData,
      setAggregationData,
    }
  }

export const useAppConfigSelector = () => {
  const [appConfig, setAppConfig] = useState<AppConfig | null>(appConfigAtom)

  return {
    appConfig,
    setAppConfig,
  }
}

export const AggregationProvider: FC<
  PropsWithChildren<{
    aggregationData: AggregateRoot
    appConfig: AppConfig
  }>
> = ({ children, aggregationData, appConfig }) => {
  const { setAggregationData } = useAggregationSelector()
  const { setAppConfig } = useAppConfigSelector()

  useBeforeMounted(() => {
    if (!aggregationData) return
    setAggregationData(aggregationData)
    // setWebUrl(aggregationData.url.webUrl)
  })
  useBeforeMounted(() => {
    if (!appConfig) return
    setAppConfig(appConfig)
  })

  useEffect(() => {
    if (!appConfig) return
    setAppConfig(appConfig)
  }, [appConfig, setAppConfig])

  useEffect(() => {
    if (!aggregationData) return
    setAggregationData(aggregationData)
    // setWebUrl(aggregationData.url.webUrl)
  }, [aggregationData, setAggregationData])

  const callOnceRef = useRef(false)

  useEffect(() => {
    if (callOnceRef.current) return
    // if (!aggregationData?.user) return
    callOnceRef.current = true

    // login().then(logged => {
    //   if (logged) {
    //     // FIXME
    //     setTimeout(() => {
    //       fetchAppUrl()
    //     }, 1000)
    //   }
    // })
  }, [aggregationData])

  return children
}
