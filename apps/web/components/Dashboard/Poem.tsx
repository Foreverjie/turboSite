import { useQuery } from '@tanstack/react-query'

import { HoverCard, HoverCardContent, HoverCardTrigger } from 'ui'

export const Poem = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['poem'],
    queryFn: () => GetTodayPoem(),
    staleTime: Infinity,

    select(data) {
      return {
        poem: data.content,
        poemData: data,
      }
    },
  })
  if (isLoading) return <div className="loading loading-dots" />
  const origin = data?.poemData.origin

  if (!origin) return null
  return (
    <HoverCard>
      <HoverCardTrigger>{<span>{data?.poem}</span>}</HoverCardTrigger>
      <HoverCardContent>
        <div className="max-w-[800px] text-center">
          <h3 className="sticky top-0 py-2 text-2xl font-medium">
            {origin.title}
          </h3>
          <h4 className="my-4">
            【{origin.dynasty.replace(/代$/, '')}】{origin.author}
          </h4>
          <div className="px-6">
            {origin.content.map(c => (
              <p key={c} className="flex">
                {c}
              </p>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

interface PoemData {
  id: number
  content: string
  origin: {
    title: string
    dynasty: string
    author: string
    content: string[]
    matchTags: string[]
  }
}
export const GetTodayPoem = async () => {
  const res = await fetch('https://v2.jinrishici.com/one.json')
  const json = await res.json()
  return json.data as PoemData
}
