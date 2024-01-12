'use client'

import {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Page, Category } from '@prisma/client'

import { useBeforeMounted } from '~/hooks/common/use-before-mounted'
import { AppConfig } from '~/app/config'

export interface AggregateRoot {
  //   user: UserModel
  //   seo: SeoOptionModel
  //   url: Url
  categories: Category[]
  pageMeta: Pick<Page, 'title' | 'id' | 'slug' | 'order'>[] | null

  //   latestNoteId: { id: string; nid: number }
}

const aggregationDataAtom: AggregateRoot | null = null
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
