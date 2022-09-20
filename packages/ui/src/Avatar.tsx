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

type User = {
  /**
   * img of avatar
   */
  avatar: string
  /**
   * user name
   */
  name: string
}

export interface AvatarProps {
  user: User | undefined | null
  /**
   * Optional click handler
   */
  onClick?: () => void
}

// Exports
export const AvatarImage = StyledImage
export const AvatarFallback = StyledFallback

export const Avatar = ({ user, onClick, ...props }: AvatarProps) => {
  return (
    <StyledAvatar className="mt-4">
      {user ? (
        <>
          <StyledImage src={user.avatar} alt={user.name} />
          <StyledFallback delayMs={600}>{user.name}</StyledFallback>
        </>
      ) : (
        <>
          <StyledImage
            src={
              'https://jie-site.oss-cn-shenzhen.aliyuncs.com/avatar-man-icon-profile-placeholder-260nw-1229859850-e1623694994111.jpeg'
            }
            alt={'NotLogin'}
          />
          <StyledFallback delayMs={600}>{'NotLogin'}</StyledFallback>
        </>
      )}
    </StyledAvatar>
  )
}
