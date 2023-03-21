import prisma from '../../../prisma/prisma-client'

export const catListController = async () => {
  const cats = await prisma.cat.findMany({
    select: {
      name: true,
      id: true,
    },
  })
  return cats
}
