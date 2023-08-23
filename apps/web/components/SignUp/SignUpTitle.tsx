import React from 'react'

function SignUpTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8">
      {children}
    </div>
  )
}

export default SignUpTitle
