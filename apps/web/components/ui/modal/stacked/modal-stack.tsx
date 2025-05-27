import { withResponsiveSyncComponent } from '~/utils/selector'

import { ModalStack as Desktop } from './modal-stack.electron'
import { ModalStack as Mobile } from './modal-stack.mobile'

export const ModalStack = withResponsiveSyncComponent(Desktop, Mobile)
