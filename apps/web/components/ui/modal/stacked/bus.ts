import { createEventBus } from '~/utils/event-bus'

export const ModalEventBus = createEventBus<{
  MODAL_DISPATCH: ModalDisposeEvent
}>()

export type ModalDisposeEvent = {
  type: 'dismiss'
  id: string
}
