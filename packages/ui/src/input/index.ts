import Textarea from '../textarea'

import Input from './input'
import InputPrivate from './input-private'

export type { FormElement } from './input-props'

export type { InputProps } from './input'
export type { InputPrivateProps } from './input-private'

export {
  StyledInputMainContainer,
  StyledInputContainer,
  StyledInputWrapper,
  StyledHelperTextContainer,
  StyledHelperText,
  StyledInputPlaceholder,
  StyledInputBlockLabel,
  StyledInputLabel,
  StyledInputContent,
  StyledInputClearButton,
  StyledInput,
} from './input.styles'

export type {
  InputVariantsProps,
  InputBlockLabelVariantsProps,
  InputLabelVariantsProps,
  InputContentVariantsProps,
} from './input.styles'

Input.Textarea = Textarea
Input.Private = InputPrivate

export default Input
