import { atom } from 'jotai'
import { createAtomHooks } from '~/lib/jotai'
import { UserRole } from '~/constants/enums'
import type { UserMeOutput } from '~/server/schemas/users'

// Types
export type Nullable<T> = T | null

export interface AuthSession {
  user: UserMeOutput
  accessToken: string
  refreshToken?: string
}

export type AuthUser = NonNullable<AuthSession['user']>

// User authentication atom
const whoamiAtom = atom<Nullable<AuthUser>>(null)
export const [, , useWhoami, , whoami, setWhoami] =
  createAtomHooks<Nullable<AuthUser>>(whoamiAtom)

// Login modal visibility atom
export const [
  ,
  ,
  useLoginModalShow,
  useSetLoginModalShow,
  getLoginModalShow,
  setLoginModalShow,
] = createAtomHooks<boolean>(atom<boolean>(false))

// User role atom for public beta trial user
export const [, , useUserRole, , getUserRole, setUserRole] = createAtomHooks<
  Nullable<UserRole>
>(atom<Nullable<UserRole>>(null))

// Authentication session atom
export const [
  ,
  ,
  useAuthSession,
  useSetAuthSession,
  getAuthSession,
  setAuthSession,
] = createAtomHooks<Nullable<AuthSession>>(atom<Nullable<AuthSession>>(null))

// User loading state
export const [
  ,
  ,
  useUserLoading,
  useSetUserLoading,
  getUserLoading,
  setUserLoading,
] = createAtomHooks<boolean>(atom<boolean>(false))

// Authentication status derived atom
export const isAuthenticatedAtom = atom<boolean>(get => {
  return get(whoamiAtom) !== null
})

export const [, , useIsAuthenticated, , getIsAuthenticated] =
  createAtomHooks<boolean>(atom<boolean>(false))

// Helper functions
export const signOut = () => {
  setWhoami(null)
  setAuthSession(null)
  setUserRole(null)
  setLoginModalShow(false)
}

export const signIn = (session: AuthSession) => {
  setAuthSession(session)
  setWhoami(session.user)
  setUserRole(session.user.role as UserRole)
  setLoginModalShow(false)
}

// User preferences atom (can be extended based on needs)
export const [
  ,
  ,
  useUserPreferences,
  useSetUserPreferences,
  getUserPreferences,
  setUserPreferences,
] = createAtomHooks<{
  theme?: 'light' | 'dark' | 'system'
  language?: string
  notifications?: boolean
}>(
  atom<{
    theme?: 'light' | 'dark' | 'system'
    language?: string
    notifications?: boolean
  }>({}),
)

// tRPC integration hooks (can be adjusted based on actual tRPC routes)
export const useAuth = () => {
  const user = useWhoami()
  const session = useAuthSession()
  const isLoading = useUserLoading()
  const isAuthenticated = Boolean(user)

  return {
    user,
    session,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
  }
}

// Error state management
export const [, , useAuthError, useSetAuthError, getAuthError, setAuthError] =
  createAtomHooks<string | null>(atom<string | null>(null))

// User initialization state
export const [
  ,
  ,
  useUserInitialized,
  useSetUserInitialized,
  getUserInitialized,
  setUserInitialized,
] = createAtomHooks<boolean>(atom<boolean>(false))

// Extended authentication utility functions
export const initializeAuth = (session: AuthSession | null) => {
  setUserLoading(true)
  setAuthError(null)

  try {
    if (session) {
      signIn(session)
    } else {
      signOut()
    }
  } catch (error) {
    setAuthError(
      error instanceof Error ? error.message : 'Authentication error',
    )
  } finally {
    setUserLoading(false)
    setUserInitialized(true)
  }
}

// User permission checking
export const hasRole = (requiredRole: UserRole): boolean => {
  const currentRole = getUserRole()
  if (!currentRole) return false

  // Simple role hierarchy check (can be extended as needed)
  const roleHierarchy = {
    [UserRole.Trial]: 0,
    [UserRole.User]: 1,
  }

  return roleHierarchy[currentRole] >= roleHierarchy[requiredRole]
}

// Check if user can perform a specific action
export const canPerformAction = (action: string): boolean => {
  const user = whoami()
  if (!user) return false

  // Determine permissions based on user role and action type
  const userRole = getUserRole()
  if (!userRole) return false

  // This can be extended based on the actual permission system
  switch (action) {
    case 'create_post':
      return hasRole(UserRole.User)
    case 'delete_post':
      return hasRole(UserRole.User)
    case 'admin_panel':
      return userRole === UserRole.User // Assuming only User role can access admin panel
    default:
      return true
  }
}

// User data update helper
export const updateUserData = (updates: Partial<AuthUser>) => {
  const currentUser = whoami()
  if (currentUser) {
    setWhoami({ ...currentUser, ...updates })
  }
}
