import type { ReactNode } from 'react'
import type { UseCardProps } from './use-card'

import React, { PropsWithoutRef, RefAttributes } from 'react'

import Drip from '../utils/drip'
import { CSS } from '../theme/stitches.config'
import { Image, Divider } from '../index'
import { __DEV__ } from '../utils/assertion'

import { useCard } from './use-card'
import {
  StyledCard,
  StyledCardHeader as CardHeader,
  StyledCardSideContent as CardSideContent,
  StyledCardFooter as CardFooter,
  StyledCardBody as CardBody,
} from './card.styles'

interface Props extends Omit<UseCardProps, 'ref'> {
  children: ReactNode | ReactNode[]
  as?: keyof JSX.IntrinsicElements
}

export type CardProps = Props & { css?: CSS }

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ ...cardProps }, ref: React.Ref<HTMLDivElement | null>) => {
    const { as, css, children, ...otherProps } = cardProps

    const {
      cardRef,
      variant,
      isFocusVisible,
      isPressAble,
      isPressed,
      disableAnimation,
      disableRipple,
      borderWeight,
      isHovered,
      getCardProps,
      dripBindings,
    } = useCard({ ...otherProps, ref })

    return (
      <StyledCard
        ref={cardRef}
        as={as}
        borderWeight={borderWeight}
        css={css as any}
        disableAnimation={disableAnimation}
        isFocusVisible={isFocusVisible}
        isHovered={isHovered}
        isPressAble={isPressAble}
        isPressed={isPressed}
        role={isPressAble ? 'button' : 'section'}
        tabIndex={isPressAble ? 0 : -1}
        variant={variant}
        {...getCardProps()}
      >
        {isPressAble && !disableAnimation && !disableRipple && (
          <Drip {...dripBindings} />
        )}
        {children}
      </StyledCard>
    )
  },
)

type CardComponent<T, P = {}> = React.ForwardRefExoticComponent<
  PropsWithoutRef<P> & RefAttributes<T>
> & {
  Header: typeof CardHeader
  SideContent: typeof CardSideContent
  Body: typeof CardBody
  Footer: typeof CardFooter
  Image: typeof Image
  Divider: typeof Divider
}

if (__DEV__) {
  Card.displayName = 'Turbo.Card'
}

Card.toString = () => '.turbo-card'

export default Card as CardComponent<HTMLDivElement, CardProps>
