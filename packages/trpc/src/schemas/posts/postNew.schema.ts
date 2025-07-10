import type { TRPCPanelMeta } from 'trpc-panel'
import { z } from 'zod'
import { feedEvent } from '../../../app/api/webhook/post/type'

export const postNewMeta: TRPCPanelMeta = {
  description: 'Create a new post',
}
export const postNewInputSchema = z.object({
  content: z.string(),
  files: z.string().array().optional(),
})
export const postNewOutputSchema = z.object({
  content: z.string(),
  files: z.string().array().optional(),
})

export const postNewHookMeta: TRPCPanelMeta = {
  description: 'Create a new post from webhook',
}

export const postNewHookOutputSchema = z.object({
  success: z.boolean(),
})

export type PostNewInput = z.TypeOf<typeof postNewInputSchema>
export type PostNewOutput = z.TypeOf<typeof postNewOutputSchema>
export type PostNewHookInput = z.TypeOf<typeof feedEvent>
export type PostNewHookOutput = z.TypeOf<typeof postNewHookOutputSchema>
