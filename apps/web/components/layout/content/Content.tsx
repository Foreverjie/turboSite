export const Content: Component = ({ children }) => {
  return (
    <div
      className="flex h-screen min-w-0 grow overflow-hidden"
      data-testid="main-content"
    >
      {children}
    </div>
  )
}
