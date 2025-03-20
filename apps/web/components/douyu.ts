const matchId = (url: string) => {
  const match = url.match(/https:\/\/www\.douyu\.com\/(\d+)/)
  if (match) {
    return match[1]
  }
  throw new Error('Invalid URL')
}

/**
 * 
 * @param url def _download_webpage(
            self, url_or_request, video_id, note=None, errnote=None,
            fatal=True, tries=1, timeout=NO_DEFAULT, *args, **kwargs):

        try_count = 0
        while True:
            try:
                return self.__download_webpage(url_or_request, video_id, note, errnote, None, fatal, *args, **kwargs)
            except IncompleteRead as e:
                try_count += 1
                if try_count >= tries:
                    raise e
                self._sleep(timeout, video_id)
 * @param videoId 
 * @returns 
 */

const downloadWebPage = async ({
  url,
  videoId,
  note,
  errNote,
  fatal = true,
  tries = 1,
}: {
  url: string
  videoId: string
  note?: string
  errNote?: string
  fatal?: boolean
  tries?: number
}) => {
  const response = await fetch(url)
  if (response.status === 200) {
    return response.text()
  }
  throw new Error('Failed to download web page')
}

const extract = (url: any) => {
  const videoId = matchId(url)

  const webPage = downloadWebPage({ url, videoId })

  console.log(webPage)
}

extract('https://www.douyu.com/22619')

// export { extract }
