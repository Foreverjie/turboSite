import React from 'react'
import { styled } from '@stitches/react'
import { violet, blackA } from '@radix-ui/colors'
import * as AvatarPrimitive from '@radix-ui/react-avatar'

const StyledAvatar = styled(AvatarPrimitive.Root, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
  overflow: 'hidden',
  userSelect: 'none',
  width: 45,
  height: 45,
  borderRadius: '100%',
  backgroundColor: blackA.blackA3,
})

const StyledImage = styled(AvatarPrimitive.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
})

const StyledFallback = styled(AvatarPrimitive.Fallback, {
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'white',
  color: violet.violet11,
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
})

export interface AvatarProps {
  /**
   * img of avatar
   */
  img: string
  /**
   * Avatar contents
   */
  name: string
  /**
   * Optional click handler
   */
  onClick?: () => void
}

// Exports
export const AvatarImage = StyledImage
export const AvatarFallback = StyledFallback

export const Avatar = ({ name, img, onClick, ...props }: AvatarProps) => {
  return (
    <StyledAvatar className="mt-4">
      <div>
        <StyledImage src={img} alt={name} />
        <StyledFallback delayMs={600}>{name}</StyledFallback>
      </div>
    </StyledAvatar>
  )
}
