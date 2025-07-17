/**
 * IP路由器工厂 - 创建可配置的IP相关路由
 */

import { ipInfoController } from '../../controllers/ip'
import {
  ipInfoInputSchema,
  ipInfoOutputSchema,
  ipInfoMeta,
} from '../../schemas/ip'
import { RouterTRPCConfig } from './user.factory'

/**
 * 创建IP路由器
 */
export function createIpRouter(config: RouterTRPCConfig) {
  const { router, publicProcedure } = config

  return router({
    info: publicProcedure
      .meta(ipInfoMeta)
      .input(ipInfoInputSchema)
      .output(ipInfoOutputSchema)
      .query(ipInfoController),
  })
}
