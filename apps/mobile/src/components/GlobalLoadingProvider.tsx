import React, { createContext, useContext, useState, ReactNode } from 'react'
import { GlobalLoader } from './GlobalLoader'

interface GlobalLoadingContextType {
  isLoading: boolean
  showLoading: (text?: string) => void
  hideLoading: () => void
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined)

interface GlobalLoadingProviderProps {
  children: ReactNode
}

export const GlobalLoadingProvider: React.FC<GlobalLoadingProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('正在加载...')

  const showLoading = (text: string = '正在加载...') => {
    setLoadingText(text)
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const value = {
    isLoading,
    showLoading,
    hideLoading,
  }

  return (
    <GlobalLoadingContext.Provider value={value}>
      {children}
      <GlobalLoader visible={isLoading} text={loadingText} />
    </GlobalLoadingContext.Provider>
  )
}

export const useGlobalLoading = (): GlobalLoadingContextType => {
  const context = useContext(GlobalLoadingContext)
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider')
  }
  return context
}
