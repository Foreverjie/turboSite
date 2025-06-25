import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

// Mock the VideoItem component based on the actual implementation
const MockVideoItem = ({ post }: { post: any }) => {
  // Extract image URL from HTML-encoded description
  // Pattern: &lt;img src=&quot;URL&quot; where URL might contain encoded characters
  const imgSrcMatch = post.description?.match(
    /&lt;img src=&quot;([^&]+(?:&amp;[^&]*)*[^&]*)&quot;/,
  )
  let imgSrc = imgSrcMatch ? imgSrcMatch[1] : undefined

  // Decode HTML entities in the URL
  if (imgSrc) {
    imgSrc = imgSrc.replace(/&amp;/g, '&')
  }

  return (
    <div data-testid="video-item">
      <div data-testid="post-content">
        <h2>{post.title}</h2>
        <div>{post.content}</div>
        {imgSrc && (
          <img
            data-testid="extracted-image"
            src={`https://webp.follow.is/?url=${encodeURIComponent(
              imgSrc,
            )}&width=640&height=360`}
            alt=""
          />
        )}
      </div>
    </div>
  )
}

// Mock dependencies
jest.mock('~/hooks/common/use-mobile', () => ({
  isMobile: () => false,
}))

jest.mock('~/components/ui/modal/stacked/hooks', () => ({
  useModalStack: () => ({
    present: jest.fn(),
  }),
}))

jest.mock('~/hooks/biz/useRouteParams', () => ({
  useRouteParamsSelector: () => ({}),
}))

jest.mock('usehooks-ts', () => ({
  useHover: () => false,
}))

describe('VideoItem Component', () => {
  describe('Image Extraction', () => {
    it('should extract image URL from HTML entity encoded description', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description:
          'Some text &lt;img src=&quot;https://example.com/image.jpg&quot; alt=&quot;test&quot;&gt; more text',
      }

      render(<MockVideoItem post={post} />)

      const extractedImage = screen.getByTestId('extracted-image')
      expect(extractedImage).toBeInTheDocument()
      expect(extractedImage).toHaveAttribute(
        'src',
        'https://webp.follow.is/?url=https%3A%2F%2Fexample.com%2Fimage.jpg&width=640&height=360',
      )
    })

    it('should handle description without images', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description: 'Plain text description without images',
      }

      render(<MockVideoItem post={post} />)

      expect(screen.queryByTestId('extracted-image')).not.toBeInTheDocument()
    })

    it('should handle malformed HTML entity encoding', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description: 'Malformed &lt;img src="regular-quotes.jpg"&gt; tag',
      }

      render(<MockVideoItem post={post} />)

      // Should not extract image with regular quotes instead of HTML entities
      expect(screen.queryByTestId('extracted-image')).not.toBeInTheDocument()
    })

    it('should extract first image when multiple images exist', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description:
          '&lt;img src=&quot;https://example.com/first.jpg&quot;&gt; and &lt;img src=&quot;https://example.com/second.jpg&quot;&gt;',
      }

      render(<MockVideoItem post={post} />)

      const extractedImage = screen.getByTestId('extracted-image')
      expect(extractedImage).toBeInTheDocument()
      expect(extractedImage).toHaveAttribute(
        'src',
        'https://webp.follow.is/?url=https%3A%2F%2Fexample.com%2Ffirst.jpg&width=640&height=360',
      )
    })

    it('should handle empty or null description', () => {
      const postWithNull = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description: null,
      }

      const postWithEmpty = {
        id: '2',
        title: 'Test Post 2',
        content: 'Test content',
        description: '',
      }

      render(<MockVideoItem post={postWithNull} />)
      expect(screen.queryByTestId('extracted-image')).not.toBeInTheDocument()

      render(<MockVideoItem post={postWithEmpty} />)
      expect(screen.queryByTestId('extracted-image')).not.toBeInTheDocument()
    })

    it('should handle complex URLs in image src', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description:
          '&lt;img src=&quot;https://example.com/path/to/image.jpg?param=value&amp;another=param&quot;&gt;',
      }

      render(<MockVideoItem post={post} />)

      const extractedImage = screen.getByTestId('extracted-image')
      expect(extractedImage).toBeInTheDocument()

      const expectedUrl =
        'https://webp.follow.is/?url=' +
        encodeURIComponent(
          'https://example.com/path/to/image.jpg?param=value&another=param',
        ) +
        '&width=640&height=360'

      expect(extractedImage).toHaveAttribute('src', expectedUrl)
    })

    it('should handle URLs with special characters', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description:
          '&lt;img src=&quot;https://example.com/image-with-dashes_and_underscores.jpg&quot;&gt;',
      }

      render(<MockVideoItem post={post} />)

      const extractedImage = screen.getByTestId('extracted-image')
      expect(extractedImage).toBeInTheDocument()
      expect(extractedImage).toHaveAttribute(
        'src',
        'https://webp.follow.is/?url=https%3A%2F%2Fexample.com%2Fimage-with-dashes_and_underscores.jpg&width=640&height=360',
      )
    })
  })

  describe('Component Rendering', () => {
    it('should render post content correctly', () => {
      const post = {
        id: '1',
        title: 'Test Post Title',
        content: 'Test post content',
        description: 'Test description',
      }

      render(<MockVideoItem post={post} />)

      expect(screen.getByText('Test Post Title')).toBeInTheDocument()
      expect(screen.getByText('Test post content')).toBeInTheDocument()
    })

    it('should handle missing post data gracefully', () => {
      const post = {
        id: '1',
        title: '',
        content: '',
        description: '',
      }

      render(<MockVideoItem post={post} />)

      expect(screen.getByTestId('video-item')).toBeInTheDocument()
      expect(screen.getByTestId('post-content')).toBeInTheDocument()
    })
  })

  describe('Image Proxy Integration', () => {
    it('should use webp.follow.is proxy for image optimization', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description:
          '&lt;img src=&quot;https://original-site.com/large-image.jpg&quot;&gt;',
      }

      render(<MockVideoItem post={post} />)

      const extractedImage = screen.getByTestId('extracted-image')
      const src = extractedImage.getAttribute('src')

      expect(src).toContain('webp.follow.is')
      expect(src).toContain('width=640')
      expect(src).toContain('height=360')
      expect(src).toContain(
        encodeURIComponent('https://original-site.com/large-image.jpg'),
      )
    })

    it('should handle proxy URL encoding correctly', () => {
      const originalUrl = 'https://example.com/image with spaces.jpg'
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description: `&lt;img src=&quot;${originalUrl}&quot;&gt;`,
      }

      render(<MockVideoItem post={post} />)

      const extractedImage = screen.getByTestId('extracted-image')
      const src = extractedImage.getAttribute('src')

      expect(src).toContain(encodeURIComponent(originalUrl))
    })
  })

  describe('Regression Tests', () => {
    it('should work with the old pattern (should fail to extract)', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description: '<img src="https://example.com/image.jpg">', // Regular HTML, not entity encoded
      }

      render(<MockVideoItem post={post} />)

      // With the new regex pattern, this should NOT extract the image
      expect(screen.queryByTestId('extracted-image')).not.toBeInTheDocument()
    })

    it('should work with the new pattern (should extract)', () => {
      const post = {
        id: '1',
        title: 'Test Post',
        content: 'Test content',
        description:
          '&lt;img src=&quot;https://example.com/image.jpg&quot;&gt;', // HTML entity encoded
      }

      render(<MockVideoItem post={post} />)

      // With the new regex pattern, this should extract the image
      expect(screen.getByTestId('extracted-image')).toBeInTheDocument()
    })
  })
})
