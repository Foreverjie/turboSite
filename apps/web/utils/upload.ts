import OSS from 'ali-oss'
import { v4 as uuid } from 'uuid'
// import config from 'config'

const client = new OSS({
  // region填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangzhou。
  region: 'oss-cn-shenzhen',
  // 阿里云账号AccessKey拥有所有API的访问权限，风险很高。强烈建议您创建并使用RAM用户进行API访问或日常运维，请登录RAM控制台创建RAM用户。
  accessKeyId: 'config....',
  accessKeySecret: 'config...',
  // 填写存储空间名称。
  bucket: 'jie-site',
})

const ossPrefix = 'https://jie-site.oss-cn-shenzhen.aliyuncs.com/'

export async function put(file: any): Promise<string | undefined> {
  if (!file) return
  const fileType = file.name.split('.').slice(-1)
  console.log('file', file, fileType)
  const fileName = `${uuid()}.${fileType}`

  await client.put(fileName, file)
  //   console.log(result.res.headers['x-oss-version-id']) // 查看此次上传object的版本ID。
  return `${ossPrefix}${fileName}`
}

export default client
