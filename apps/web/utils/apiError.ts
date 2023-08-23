import type { ClerkAPIError } from '@clerk/types'

export interface ClerkAPIResponseError {
  errors: ClerkAPIError[]
}

export function parseClerkError(err: ClerkAPIResponseError): string {
  if (!err) {
    return ''
  }

  if (err.errors) {
    if (err.errors[0].code === 'session_exists') {
      return 'This account has already signed up.'
    }
    return err.errors[0].longMessage || ''
  }

  throw err
}
