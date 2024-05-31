import { z } from 'zod'

export const feedEvent = z.discriminatedUnion('event_type', [
  /** {
    "event_type": "new_entries",
    "feed": {
      "id": 8,
      "user_id": 1,
      "feed_url": "https://example.org/feed.xml",
      "site_url": "https://example.org",
      "title": "Example website",
      "checked_at": "2023-09-10T12:48:43.428196-07:00"
    },
    "entries": [
      {
        "id": 231,
        "user_id": 1,
        "feed_id": 3,
        "status": "unread",
        "hash": "1163a93ef12741b558a3b86d7e975c4c1de0152f3439915ed185eb460e5718d7",
        "title": "Example",
        "url": "https://example.org/article",
        "comments_url": "",
        "published_at": "2023-08-17T19:29:22Z",
        "created_at": "2023-09-10T12:48:43.428196-07:00",
        "changed_at": "2023-09-10T12:48:43.428196-07:00",
        "content": "<p>Some HTML content</p>",
        "share_code": "",
        "starred": false,
        "reading_time": 1,
        "enclosures": [{
            "id": 158,
            "user_id": 1,
            "entry_id": 231,
            "url": "https://example.org/podcast.mp3",
            "mime_type": "audio/mpeg",
            "size": 63451045,
            "media_progression": 0
        }],
        "tags": ["Some category", "Another label"]
      }
    ]
  }  */
  z.object({
    event_type: z.literal('new_entries'),
    feed: z.object({
      id: z.number(),
      user_id: z.number(),
      feed_url: z.string(),
      site_url: z.string(),
      title: z.string(),
      checked_at: z.string(),
    }),
    entries: z.array(
      z.object({
        id: z.number(),
        user_id: z.number(),
        feed_id: z.number(),
        status: z.string(),
        hash: z.string(),
        title: z.string(),
        url: z.string(),
        comments_url: z.string(),
        published_at: z.string(),
        created_at: z.string(),
        changed_at: z.string(),
        content: z.string(),
        share_code: z.string(),
        starred: z.boolean(),
        reading_time: z.number(),
        enclosures: z.array(
          z.object({
            id: z.number(),
            user_id: z.number(),
            entry_id: z.number(),
            url: z.string(),
            mime_type: z.string(),
            size: z.number(),
            media_progression: z.number(),
          }),
        ),
        tags: z.array(z.string()),
      }),
    ),
  }),
  /**   {
  "event_type": "save_entry",
  "entry": {
    "id": 592,
    "user_id": 1,
    "feed_id": 9,
    "status": "read",
    "hash": "ed97d338e7ea23fd82d14f0623c1953a22ddda32ce406f0cdfbd14632db8ff8b",
    "title": "Some example",
    "url": "https://example.org/article",
    "comments_url": "",
    "published_at": "2023-09-10T19:13:40Z",
    "created_at": "2023-09-10T20:06:23.000332Z",
    "changed_at": "2023-09-11T00:39:49.615812Z",
    "content": "Some HTML content",
    "author": "",
    "share_code": "",
    "starred": false,
    "reading_time": 1,
    "enclosures": [
      {
        "id": 1492,
        "user_id": 1,
        "entry_id": 592,
        "url": "https://example.org/file.zip",
        "mime_type": "application/octet-stream",
        "size": 0,
        "media_progression": 0
      }
    ],
    "tags": [],
    "feed": {
      "id": 9,
      "user_id": 1,
      "feed_url": "https://example.org/feed.xml",
      "site_url": "https://example.org/,
      "title": "Example website",
      "checked_at": "2023-09-10T20:07:22.956279Z"
    }
  }
} */
  z.object({
    event_type: z.literal('save_entry'),
    entry: z.object({
      id: z.number(),
      user_id: z.number(),
      feed_id: z.number(),
      status: z.string(),
      hash: z.string(),
      title: z.string(),
      url: z.string(),
      comments_url: z.string(),
      published_at: z.string(),
      created_at: z.string(),
      changed_at: z.string(),
      content: z.string(),
      author: z.string(),
      share_code: z.string(),
      starred: z.boolean(),
      reading_time: z.number(),
      enclosures: z.array(
        z.object({
          id: z.number(),
          user_id: z.number(),
          entry_id: z.number(),
          url: z.string(),
          mime_type: z.string(),
          size: z.number(),
          media_progression: z.number(),
        }),
      ),
      tags: z.array(z.string()),
      feed: z.object({
        id: z.number(),
        user_id: z.number(),
        feed_url: z.string(),
        site_url: z.string(),
        title: z.string(),
        checked_at: z.string(),
      }),
    }),
  }),
])
