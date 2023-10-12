import { Skeleton } from 'ui'
import { Card, CardContent, CardHeader } from 'ui/src/card'

function PostCardLoading() {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div className="flex">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex flex-col justify-around ml-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-12 h-2" />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="flex-1 h-6 mb-2" />
        <Skeleton className="flex-1 h-6" />
      </CardContent>
    </Card>
  )
}

export default PostCardLoading
