'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { WriteEditEvent } from '~/events'
import type { Dispatch, FC, PropsWithChildren, SetStateAction } from 'react'

import { Button } from 'ui'
// import { useModalStack } from '~/components/ui/modal'
import { EmitKeyMap } from '~/constants/keys'
import { useBeforeUnload } from '~/hooks/common/use-before-unload'
// import { useForceUpdate } from '~/hooks/common/use-force-update'
import { throttle } from 'lodash'
import { buildNSKey } from '../../lib/ns'

type BaseModelType = {
  title: string
  slug?: string
  text: string
  categoryId?: string
  subtitle?: string
}

export const BaseWritingProvider = <T extends BaseModelType>(
  props: {} & PropsWithChildren,
) => {
  const [isFormDirty, setIsDirty] = useState(false)
  useEffect(() => {
    const handler = () => {
      setIsDirty(true)
    }
    window.addEventListener(EmitKeyMap.EditDataUpdate, handler)

    return () => {
      window.removeEventListener(EmitKeyMap.EditDataUpdate, handler)
    }
  }, [])
  useBeforeUnload(isFormDirty)

  return <AutoSaverProvider>{props.children}</AutoSaverProvider>
}

const AutoSaverContext = createContext({
  reset(postId?: string) {},
})

const AutoSaverProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const handler = throttle((e: any) => {
      const ev = e as WriteEditEvent

      const { postId, content } = ev.data

      const id = postId || 'new-post'
      const key = `auto-saved-${id}`
      localStorage.setItem(buildNSKey(key), JSON.stringify(content))
    }, 300)
    window.addEventListener(EmitKeyMap.EditDataUpdate, handler)

    return () => {
      window.removeEventListener(EmitKeyMap.EditDataUpdate, handler)
    }
  }, [])

  return (
    <AutoSaverContext.Provider
      value={useMemo(() => {
        return {
          reset(nsKey?: string) {
            const id = nsKey || 'new-post'
            const key = `auto-saved-${id}`
            console.log('reset', key)
            localStorage.removeItem(buildNSKey(key))
          },
        }
      }, [])}
    >
      {children}
    </AutoSaverContext.Provider>
  )
}

export const useResetAutoSaverData = () => useContext(AutoSaverContext).reset

// export const useAutoSaver = <T extends { id: string }>([
//   editingData,
//   setEditingData,
// ]: [T, Dispatch<SetStateAction<T>>]) => {
//   const { present } = useModalStack()
//   const [forceUpdate, forceUpdateKey] = useForceUpdate()

//   useEffect(() => {
//     const id = 'new-post'

//     if (!autoSavedDataString) return
//     const autoSavedData = JSON.parse(autoSavedDataString)
//     if (!autoSavedData) return

//     // setTimeout(() => {
//     //   present({
//     //     title: '存在为保存的数据，需要恢复吗？',
//     //     content: ({ dismiss }) => (
//     //       <div className="flex justify-end">
//     //         <Button
//     //           onClick={() => {
//     //             dismiss()
//     //             setEditingData(autoSavedData)
//     //             forceUpdate()
//     //           }}
//     //         >
//     //           恢复
//     //         </Button>
//     //       </div>
//     //     ),
//     //   })
//     // }, 100)
//   }, [editingData?.id, forceUpdate, present])

//   return [forceUpdateKey]
// }

// export const useBaseWritingContext = () => {
//   return useContext(BaseWritingContext)
// }

// export const useBaseWritingAtom = (key: keyof BaseModelType) => {
//   const ctxAtom = useBaseWritingContext()
//   return useAtom(
//     useMemo(
//       () =>
//         atom(
//           get => get(ctxAtom)[key],
//           (get, set, newValue) => {
//             set(ctxAtom, prev => {
//               return produce(prev, draft => {
//                 ;(draft as any)[key] = newValue
//               })
//             })
//           },
//         ),
//       [ctxAtom, key],
//     ),
//   )
// }
