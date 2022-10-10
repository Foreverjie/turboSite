import { styled, VariantProps } from '../theme/stitches.config'
import { cssHideShowIn } from '../theme/shared-css'
export const StyledText = styled(
  'p',
  {
    variants: {
      weight: {
        hairline: {
          fontWeight: '$hairline',
        },
        thin: {
          fontWeight: '$thin',
        },
        light: {
          fontWeight: '$light',
        },
        normal: {
          fontWeight: '$normal',
        },
        medium: {
          fontWeight: '$medium',
        },
        semibold: {
          fontWeight: '$semibold',
        },
        bold: {
          fontWeight: '$bold',
        },
        extrabold: {
          fontWeight: '$extrabold',
        },
        black: {
          fontWeight: '$black',
        },
      },
    },
  },
  cssHideShowIn,
)

export type TextVariantsProps = VariantProps<typeof StyledText>
