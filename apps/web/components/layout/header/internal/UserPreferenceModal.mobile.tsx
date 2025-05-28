import { Avatar, AvatarFallback, AvatarImage } from 'ui/src'
// import { ActionButton } from '@follow/components/ui/button/index.js'
import { LoadingCircle } from '~/components/ui/loading'
// import { ScrollArea } from '@follow/components/ui/scroll-area/index.js'
import { nextFrame } from '~/lib/dom'
// import { getStorageNS } from '@follow/utils/ns'
import { useAnimationControls } from 'motion/react'
import type { FC } from 'react'
import { Fragment, useEffect, useState } from 'react'
// import { useTranslation } from 'react-i18next'

import { zodResolver } from '@hookform/resolvers/zod'
import { m } from 'motion/react'
import { useCurrentModal } from '~/components/ui/modal/stacked/hooks'

import { useForm } from 'react-hook-form'
import { cn } from 'ui/src/utils'
import { z } from 'zod'
import { trpc } from '../../../../utils/trpc'
import { Button } from '../../../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../ui/form'
import { Input } from '../../../ui/input'
import { toast } from 'sonner'

const formSchema = z.object({
  handle: z.string().max(50).optional(),
  name: z.string().min(3).max(50),
  image: z.string().url().or(z.literal('')).optional(),
})
export const UserPreferenceModalContent: FC = () => {
  const { data: user } = trpc.user.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      handle: user?.user_metadata.handle || undefined,
      name: user?.user_metadata.name || '',
      image: user?.user_metadata.image || '',
    },
  })

  const { mutateAsync: updateUser, isLoading } = trpc.user.update.useMutation({
    onSuccess: data => {
      console.log('update success', data)
      toast('Profile updated successfully', {
        duration: 3000,
      })
    },
    onError: error => {
      console.error('update error', error)
      toast.error('Failed to update profile', {
        duration: 3000,
      })
    },
  })

  const userInfo = user
    ? {
        image: user.user_metadata.image,
        name: user.user_metadata.name,
        handle: user.user_metadata.handle,
      }
    : null

  const modal = useCurrentModal()
  const controller = useAnimationControls()
  useEffect(() => {
    nextFrame(() => controller.start('enter'))
  }, [controller])

  const [isHeaderSimple, setHeaderSimple] = useState(false)

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUser(values)
  }

  return (
    <div>
      {userInfo && (
        <Fragment>
          <div
            className={cn(
              'center f-motion-reduce:duration-700 flex shrink-0 flex-col',
              isHeaderSimple ? 'mt-3 flex-row' : 'flex-col',
            )}
          >
            <Avatar
              asChild
              className={cn(
                'aspect-square',
                isHeaderSimple ? 'size-12' : 'size-16',
              )}
            >
              <m.span layout transition={{ duration: 0.35 }}>
                <AvatarImage
                  className="animate-in fade-in-0 duration-200"
                  asChild
                  src={userInfo.image}
                  //   src={
                  //     'https://pub-18930b7066dd4886b3a5570f7af52c94.r2.dev/Avatar.jpeg'
                  //   }
                >
                  <m.img layout transition={{ duration: 0.35 }} />
                </AvatarImage>
                <AvatarFallback>{userInfo.name?.slice(0, 2)}</AvatarFallback>
              </m.span>
            </Avatar>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={cn('mt-4 space-y-4')}
              >
                <FormField
                  control={form.control}
                  name="handle"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>{t('profile.handle.label')}</FormLabel> */}
                      <FormLabel>{'Handle'}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        {/* {t('profile.handle.description')} */}
                        {'Your unique identifier.'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>{t('profile.name.label')}</FormLabel> */}
                      <FormLabel>{'Display name'}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        {/* {t('profile.name.description')} */}
                        {'Your public display Name.'}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <div className="flex gap-4">
                      <FormItem className="w-full">
                        {/* <FormLabel>{t('profile.avatar.label')}</FormLabel> */}
                        <FormLabel>{'Avatar'}</FormLabel>
                        <FormControl>
                          <div className="flex items-center gap-4">
                            <Input {...field} />
                            {field.value && (
                              <Avatar className="size-9">
                                <AvatarImage src={field.value} />
                                <AvatarFallback>
                                  {userInfo?.name?.[0] || ''}
                                </AvatarFallback>
                              </Avatar>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </div>
                  )}
                />

                <div className={'flex flex-1'}>
                  <Button
                    type="submit"
                    buttonClassName="w-full"
                    isLoading={isLoading}
                  >
                    {/* {t('profile.submit')} */}
                    {'Submit'}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Fragment>
      )}

      {!userInfo && <LoadingCircle size="large" className="center h-full" />}
    </div>
  )
}
