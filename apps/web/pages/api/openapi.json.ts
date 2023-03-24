import { NextApiRequest, NextApiResponse } from 'next'

import { openApiDocument } from '@/server/openapi'

// Respond with our OpenAPI schema
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log('openApiDocument', openApiDocument)
  res.status(200).send(openApiDocument)
}

export default handler
