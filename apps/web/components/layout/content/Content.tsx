export const Content: Component = ({ children }) => {
  return (
    <main className="relative flex flex-col z-[1] px-4 pt-[4.5rem] fill-content md:px-0">
      {children}
    </main>
  )
}
