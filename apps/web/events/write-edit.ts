import { EmitKeyMap } from '~/constants/keys'
import { PostEditInput, PostNewInput } from '../server/schemas/posts'

export class WriteEditEvent extends Event {
  static readonly type = EmitKeyMap.EditDataUpdate
  constructor(
    public readonly data: {
      content: string
      postId: string | undefined
    },
  ) {
    super(EmitKeyMap.EditDataUpdate)
  }
}
