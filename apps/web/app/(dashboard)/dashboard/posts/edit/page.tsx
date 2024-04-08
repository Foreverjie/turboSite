'use client'

import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import dayjs from 'dayjs'
import { useRouter, useSearchParams } from 'next/navigation'
import type { FC } from 'react'

import { useIsMobile } from '~/utils/viewport'
import { PageLoading } from '~/components/layout/PageLoading'
import { editorViewCtx, schemaCtx } from '@milkdown/core'
import { redoCommand, undoCommand } from '@milkdown/plugin-history'
import {
  toggleEmphasisCommand,
  toggleStrongCommand,
  wrapInBulletListCommand,
  wrapInHeadingCommand,
  wrapInOrderedListCommand,
} from '@milkdown/preset-commonmark'
import { callCommand } from '@milkdown/utils'
// import {
//   PostEditorSidebar,
//   PostModelDataAtomProvider,
//   SlugInput,
//   usePostModelGetModelData,
//   usePostModelSetModelData,
// } from '~/components/modules/dashboard/post-editing'
// import {
//   BaseWritingProvider,
//   useAutoSaver,
// } from '~/components/modules/dashboard/writing/BaseWritingProvider'
// import { EditorLayer } from '~/components/modules/dashboard/writing/EditorLayer'
// import { ImportMarkdownButton } from '~/components/modules/dashboard/writing/ImportMarkdownButton'
// import { PreviewButton } from '~/components/modules/dashboard/writing/PreviewButton'
// import {
//   useEditorRef,
//   Writing,
// } from '~/components/modules/dashboard/writing/Writing'
import { Button, Textarea, useToast, Progress } from 'ui'
import { useEventCallback } from '~/hooks/common/use-event-callback'
import { cloneDeep } from 'lodash'
import { trpc } from '~/utils/trpc'
import { PostIdOutput } from '../../../../../server/schemas/posts'
import { cn } from 'ui/src/utils'
import { MilkdownEditor, MilkdownRef } from '~/components/ui/editor'
import { BaseWritingProvider } from '~/components/writing/BaseWritingProvider'
import { EditorLayer } from '~/components/writing/EditorLayer'
import { post } from 'cypress/types/jquery'
import { XIcon, ImageIcon, MapPinIcon } from 'lucide-react'
import { UploadButton } from '~/utils/uploadthing'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'

import './style.css'

export default function Page() {
  const search = useSearchParams()
  const id = search.get('id')

  const { data, isLoading } = trpc.post.getById.useQuery(
    {
      id,
    },
    {
      enabled: !!id,
    },
  )

  const utils = trpc.useUtils()
  const { mutateAsync: createPost, isLoading: p1 } = trpc.post.new.useMutation({
    onSuccess: () => {
      utils.post.all.invalidate()
    },
  })
  const { mutateAsync: updatePost, isLoading: p2 } = trpc.post.edit.useMutation(
    {
      onSuccess: () => {
        utils.post.all.invalidate()
      },
    },
  )
  const isPending = p1 || p2

  const [postContent, setPostContent] = useState<string>()
  const [files, setFiles] = useState<string[]>([])
  const { toast } = useToast()
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (data) {
      setPostContent(data.content)
      setFiles(data.files)
    }
  }, [data])

  const UploadProgress = useCallback(() => {
    return <Progress value={progress} />
  }, [progress])

  const addPost = async () => {
    if (!postContent) return
    if (data) {
      await updatePost({ postId: data.postId, content: postContent, files })
    } else {
      await createPost({ content: postContent, files })
    }
    router.push('/dashboard/posts/list')
  }

  const handleImageClick = () => {}
  const handleLocationClick = () => {}

  if (id && isLoading) return <PageLoading />
  return (
    <BaseWritingProvider>
      <div className="text-2xl font-bold">{data ? 'Edit' : 'New'}</div>

      {/* <Writing middleSlot={SlugInput} /> */}
      <Textarea
        className="flex flex-grow mt-4"
        value={postContent}
        onChange={e => {
          setPostContent(e.target.value)
        }}
      />

      {!!files?.length && (
        <Swiper slidesPerView={'auto'} spaceBetween={24} className="mt-4">
          {files.map((file, i) => (
            <SwiperSlide key={i} className="w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-24 aspect-auto rounded-md"
                src={file}
                alt="Image"
                onClick={handleImageClick}
              />
              <button
                className="absolute top-0 right-0 mt-1 mr-1"
                onClick={() => {
                  const newFiles = [...files]
                  newFiles.splice(i, 1)
                  setFiles(newFiles)
                }}
              >
                <XIcon size={16} />
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      <div className="flex justify-between mt-4">
        <div className="flex items-center justify-start">
          <UploadButton
            className="ut-button:bg-transparent ut-button:w-fit ut-button:h-fit ut-allowed-content:hidden mr-2"
            endpoint="imageUploader"
            content={{
              button: <ImageIcon />,
            }}
            onUploadBegin={() => {
              toast({
                description: <UploadProgress />,
              })
            }}
            onUploadProgress={progress => {
              setProgress(progress)
            }}
            onClientUploadComplete={res => {
              const newFiles = [...files]
              setProgress(0)
              res?.map(r => {
                newFiles.push(r.url)
              })
              setFiles(newFiles)
              toast({
                description: 'Upload Success!',
              })
            }}
            onUploadError={(error: Error) => {
              toast({
                title: 'Error',
                variant: 'destructive',
                description: error.message || 'Something went wrong',
              })
            }}
          />
          <MapPinIcon className="mr-2" onClick={handleLocationClick} />
        </div>
        <Button onClick={addPost} loading={isPending} disabled={!postContent}>
          {data ? 'Edit' : 'Post'}
        </Button>
      </div>
    </BaseWritingProvider>
  )
}
//
