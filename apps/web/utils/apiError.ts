import type { ClerkAPIError } from '@clerk/types'

export interface ClerkAPIResponseError {
  errors: ClerkAPIError[]
}

export function parseClerkError(err: ClerkAPIResponseError): string {
  if (!err) {
    return ''
  }

  if (err.errors) {
    return err.errors[0].longMessage || ''
  }

  throw err
}
