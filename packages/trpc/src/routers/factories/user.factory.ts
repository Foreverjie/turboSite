/**
 * 用户路由器工厂 - 创建可配置的用户相关路由
 */

import {
  userALlController,
  userCreateController,
  userMeController,
  userStatusController,
  userUpdateController,
  userSignInController,
  userSignOutController,
  userSignUpController,
  userVerifyController,
  userSendOtpController,
} from '../../controllers/users'
import {
  userAllInputSchema,
  userAllMeta,
  userAllOutputSchema,
  userCreateInputSchema,
  userCreateMeta,
  userCreateOutputSchema,
  userMeInputSchema,
  userMeMeta,
  userMeOutputSchema,
  userSignInInputSchema,
  userSignInMeta,
  userSignInOutputSchema,
  userSignOutMeta,
  userSignOutOutputSchema,
  userSignUpInputSchema,
  userSignUpMeta,
  userSignUpOutputSchema,
  userStatusInputSchema,
  userStatusMeta,
  userStatusOutputSchema,
  userUpdateInputSchema,
  userUpdateMeta,
  userUpdateOutputSchema,
  userVerifyInputSchema,
  userVerifyMeta,
  userVerifyOutputSchema,
  userSendOtpInputSchema,
  userSendOtpMeta,
  userSendOtpOutputSchema,
} from '../../schemas/users'

/**
 * tRPC 路由器配置接口 - 每个平台需要提供这些 procedures
 */
export interface RouterTRPCConfig {
  router: any
  publicProcedure: any
  protectedProcedure: any
  adminProcedure?: any
}

/**
 * 创建用户路由器
 */
export function createUserRouter(config: RouterTRPCConfig) {
  const { router, publicProcedure, protectedProcedure, adminProcedure } = config

  return router({
    create: protectedProcedure
      .meta(userCreateMeta)
      .input(userCreateInputSchema)
      .output(userCreateOutputSchema)
      .mutation(userCreateController),
    signIn: publicProcedure
      .meta(userSignInMeta)
      .input(userSignInInputSchema)
      .output(userSignInOutputSchema)
      .mutation(userSignInController),
    signUp: publicProcedure
      .meta(userSignUpMeta)
      .input(userSignUpInputSchema)
      .output(userSignUpOutputSchema)
      .mutation(userSignUpController),
    signOut: protectedProcedure
      .meta(userSignOutMeta)
      .output(userSignOutOutputSchema)
      .mutation(userSignOutController),
    verify: publicProcedure
      .meta(userVerifyMeta)
      .input(userVerifyInputSchema)
      .output(userVerifyOutputSchema)
      .mutation(userVerifyController),
    sendOtp: publicProcedure
      .meta(userSendOtpMeta)
      .input(userSendOtpInputSchema)
      .output(userSendOtpOutputSchema)
      .mutation(userSendOtpController),
    me: protectedProcedure
      .meta(userMeMeta)
      .input(userMeInputSchema)
      .output(userMeOutputSchema)
      .query(userMeController),
    status: protectedProcedure
      .meta(userStatusMeta)
      .input(userStatusInputSchema)
      .output(userStatusOutputSchema)
      .query(userStatusController),
    update: protectedProcedure
      .meta(userUpdateMeta)
      .input(userUpdateInputSchema)
      .output(userUpdateOutputSchema)
      .mutation(userUpdateController),
    ...(adminProcedure ? {
      all: adminProcedure
        .meta(userAllMeta)
        .input(userAllInputSchema)
        .output(userAllOutputSchema)
        .query(userALlController),
    } : {}),
  })
}
