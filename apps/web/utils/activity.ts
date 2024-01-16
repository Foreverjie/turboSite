import { useState } from 'react'

type Activity = {
  processName: string
  media: {
    title: string
    artist: string
  } | null
}

export const useActivity = () => {
  const [activity, setActivity] = useState<Activity>({
    processName: '',
    media: null,
  })

  return {
    activity,
    setActivity,
  }
}
