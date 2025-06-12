import { stopPropagation } from '~/lib/dom'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'
// import { useTranslation } from 'react-i18next'

dayjs.extend(duration)
dayjs.extend(relativeTime)

import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipTrigger,
} from '../tooltip'
import { getUpdateInterval } from './utils'

const formatTemplateString = 'lll'

const formatTime = (
  date: string | Date,
  relativeBeforeDay?: number,
  template = formatTemplateString,
) => {
  if (
    relativeBeforeDay &&
    Math.abs(dayjs(date).diff(new Date(), 'd')) > relativeBeforeDay
  ) {
    return dayjs(date).format(template)
  }
  return dayjs
    .duration(dayjs(date).diff(dayjs(), 'minute'), 'minute')
    .humanize()
}

export const RelativeTime: FC<{
  date: string | Date
  displayAbsoluteTimeAfterDay?: number
  dateFormatTemplate?: string
}> = props => {
  const {
    displayAbsoluteTimeAfterDay = 29,
    dateFormatTemplate = formatTemplateString,
  } = props
  const nextDateFormatTemplate =
    dateFormatTemplate === 'default' ? formatTemplateString : dateFormatTemplate
  const [relative, setRelative] = useState<string>(() =>
    formatTime(props.date, displayAbsoluteTimeAfterDay, nextDateFormatTemplate),
  )

  const timerRef = useRef<any>(null)

  useEffect(() => {
    const updateRelativeTime = () => {
      setRelative(
        formatTime(
          props.date,
          displayAbsoluteTimeAfterDay,
          nextDateFormatTemplate,
        ),
      )
      const updateInterval = getUpdateInterval(
        props.date,
        displayAbsoluteTimeAfterDay,
      )

      if (updateInterval !== null) {
        timerRef.current = setTimeout(updateRelativeTime, updateInterval)
      }
    }

    updateRelativeTime()

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [props.date, displayAbsoluteTimeAfterDay, nextDateFormatTemplate])
  const formatted = dayjs(props.date).format(nextDateFormatTemplate)

  //   const { t } = useTranslation('common')
  if (formatted === relative) {
    return <>{relative}</>
  }
  return (
    <Tooltip>
      {/* https://github.com/radix-ui/primitives/issues/2248#issuecomment-2147056904 */}
      <TooltipTrigger tabIndex={-1} onFocusCapture={stopPropagation}>
        {relative}
        {/* {t('space')} */}
        {/* {t('words.ago')} */}
        {'ago'}
      </TooltipTrigger>

      <TooltipPortal>
        <TooltipContent>{formatted}</TooltipContent>
      </TooltipPortal>
    </Tooltip>
  )
}
