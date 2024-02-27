'use client'

import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import type { FC } from 'react'

import { parseDate, relativeTimeFromNow } from '~/lib/datetime'

export const RelativeTime: FC<{
  date: string | Date
  displayAbsoluteTimeAfterDay?: number
}> = props => {
  const [relative, setRelative] = useState<string>(
    relativeTimeFromNow(props.date),
  )

  const { displayAbsoluteTimeAfterDay = 29 } = props

  useEffect(() => {
    setRelative(relativeTimeFromNow(props.date))
    let timer: any = setInterval(() => {
      setRelative(relativeTimeFromNow(props.date))
    }, 1000)

    if (
      Math.abs(dayjs(props.date).diff(new Date(), 'd')) >
      displayAbsoluteTimeAfterDay
    ) {
      timer = clearInterval(timer)
      setRelative(parseDate(props.date, 'YYYY-MM-DD'))
    }
    return () => {
      timer = clearInterval(timer)
    }
  }, [props.date, displayAbsoluteTimeAfterDay])

  return <>{relative}</>
}
