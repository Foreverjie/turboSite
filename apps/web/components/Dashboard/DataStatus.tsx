import { Button } from 'ui'
import { trpc } from '../../utils/trpc'
import { RelativeTime } from '../ui/RelativeTime'
import { MessageCircleIcon, TwitterIcon } from 'lucide-react'
import { cn } from 'ui/src/utils'

export const DataStatus = () => {
  const { data: userData } = trpc.user.me.useQuery()

  const dataStatus = [
    {
      label: 'Posts',
      value: userData?.Post.length ?? 0,
      icon: <TwitterIcon />,
      actions: [
        {
          primary: true,
          name: 'View',
          onClick: () => {
            console.log('View posts')
          },
        },
      ],
      highlight: true,
    },
    {
      label: 'Comments',
      value: userData?.Comment.length ?? 0,
      icon: <MessageCircleIcon />,
      actions: [
        {
          primary: true,
          name: 'View',
          onClick: () => {
            console.log('View comments')
          },
        },
      ],
    },
  ]

  return (
    <div className="relative @container">
      <h3 className="mb-4 text-xl font-light text-opacity-80">
        Data Dashboard:
        {/* <small className="text-sm">
          Updated at: <RelativeTime date={new Date()} />
        </small> */}
      </h3>
      <div className="grid grid-cols-1 gap-6 @[550px]:grid-cols-2 @[900px]:grid-cols-3 @[1124px]:grid-cols-4 @[1200px]:grid-cols-5">
        {dataStatus.map(stat => {
          return (
            <div
              className={cn(
                'relative rounded-md border p-4',
                stat.highlight && 'border-accent bg-accent/20',
              )}
              key={stat.label}
            >
              <div className="font-medium">{stat.label}</div>

              <div className="my-2 text-2xl font-medium">
                {formatNumber(stat.value)}
              </div>

              <div className="absolute right-4 top-1/2 flex -translate-y-1/2 text-[30px] center">
                {stat.icon}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {stat.actions?.map(action => {
                  return (
                    <Button
                      variant={action.primary ? 'default' : 'secondary'}
                      key={action.name}
                      className="rounded-md shadow-none"
                      onClick={action.onClick}
                    >
                      {action.name}
                    </Button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

const formatNumber = (num: string | number) => {
  const isNumber = !Number.isNaN(+num)
  if (!isNumber) return num
  return Intl.NumberFormat().format(+num)
}
