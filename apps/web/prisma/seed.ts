import {
  PrismaClient,
  Gender,
  UserType,
  UserStatus,
  PostType,
  User,
} from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

const generateRandomUser = () => {
  const name = Math.random().toString(36).substring(7)
  const email = `${name}@${Math.random().toString(36).substring(7)}.com`
  const userId = name
  const gender = Math.random() > 0.5 ? Gender.FEMALE : Gender.MALE
  const role = UserType.USER
  const status = UserStatus.ACTIVE
  const phone = Math.random().toString(36).substring(7)
  return {
    name,
    email,
    userId,
    gender,
    role,
    status,
    phone,
  }
}

const generateRandomPost = (user: User) => {
  const content = Math.random().toString(36).substring(7)
  const type = PostType.POST
  const files: string[] = []
  const postId = randomUUID()
  return {
    content,
    type,
    files,
    authorId: user.userId,
    postId,
  }
}

async function main() {
  const users = await Promise.all(
    Array.from({ length: 10 }, async () => {
      const user = generateRandomUser()
      return await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      })
    }),
  )
  const posts = Array.from({ length: 100 }, async () => {
    const user = users[Math.floor(Math.random() * users.length)]
    const post = generateRandomPost(user)
    return await prisma.post.upsert({
      where: { postId: post.postId },
      update: {},
      create: post,
    })
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
