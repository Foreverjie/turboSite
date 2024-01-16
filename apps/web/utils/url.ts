import { useState } from 'react'
import { useAggregationSelector } from '~/providers/root/aggregation-data-provider'

export const useAppUrl = () => {
  const url = useAggregationSelector().aggregationData?.url
  const [adminUrl, setAdminUrl] = useState<string | null>(null)
  return {
    adminUrl,
    setAdminUrl,
    ...url,
  }
}
export const useResolveAdminUrl = () => {
  const { adminUrl } = useAppUrl()
  return (path?: string) => {
    if (!adminUrl) {
      return ''
    }
    const parsedUrl = new URL(adminUrl.replace(/\/$/, '').concat(path || ''))
    return parsedUrl.toString()
  }
}
