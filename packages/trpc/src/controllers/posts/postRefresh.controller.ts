import { TRPCError } from '@trpc/server'
import { PostRefreshInput, PostRefreshOutput } from '../../schemas/posts'
import { db } from '../../drizzle/client'

export const postRefreshController = async (input: {
  input: PostRefreshInput
  ctx: any
}): Promise<PostRefreshOutput> => {
  const { force } = input.input

  try {
    // Fetch newest RSS items from external source
    const response = await fetch('https://barry.scflash.win/fetch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        force: force || false,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('Data fetched:', data)

    // Here you could process and save the fetched data to your database
    // For example, if the response contains RSS items:
    let itemsCount = 0

    if (data && data.items && Array.isArray(data.items)) {
      itemsCount = data.items.length

      // You could save the items to your database here
      // Example (uncomment and modify based on your schema):
      /*
      for (const item of data.items) {
        await db.insert(rssItemsTable).values({
          title: item.title,
          link: item.link,
          description: item.description,
          datePublished: new Date(item.datePublished),
          // ... other fields
        }).onConflictDoNothing()
      }
      */
    }

    return {
      success: true,
      message: `Successfully refreshed RSS items. ${itemsCount} items processed.`,
      itemsCount,
      error: null,
    }
  } catch (error) {
    console.error('Error refreshing RSS items:', error)

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred'

    // Return error in response instead of throwing, so client can handle gracefully
    return {
      success: false,
      message: 'Failed to refresh RSS items',
      error: errorMessage,
    }
  }
}
