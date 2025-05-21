import { Divider } from '~/components/ui/divider'
import { RootPortal } from '~/components/ui/portal'
import { useTypeScriptHappyCallback } from '~/hooks/common/use-typescript-happy-callback'
import { cn } from 'ui/src/utils'
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import * as React from 'react'

import { HotkeyScope } from '~/lib/constants'
import { useConditionalHotkeyScope } from '~/hooks/common/use-switch-hot-key-scope'

const DropdownMenu: typeof DropdownMenuPrimitive.Root = props => {
  const [open, setOpen] = React.useState(!!props.open)
  useConditionalHotkeyScope(HotkeyScope.DropdownMenu, open)

  return (
    <DropdownMenuPrimitive.Root
      {...props}
      onOpenChange={useTypeScriptHappyCallback(
        open => {
          setOpen(open)
          props.onOpenChange?.(open)
        },
        [props.onOpenChange],
      )}
    />
  )
}

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger
const DropdownMenuGroup = DropdownMenuPrimitive.Group
const DropdownMenuPortal = DropdownMenuPrimitive.Portal
const DropdownMenuSub = DropdownMenuPrimitive.Sub
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup

const DropdownMenuSubTrigger = ({
  ref,
  className,
  inset,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean
} & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>>
}) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      'cursor-menu focus:bg-theme-selection-active focus:text-theme-selection-foreground data-[state=open]:bg-theme-selection-active data-[state=open]:text-theme-selection-foreground flex select-none items-center rounded-[5px] px-2.5 py-1.5 outline-none',
      inset && 'pl-8',
      'center gap-2',
      className,
      props.disabled && 'cursor-not-allowed opacity-30',
    )}
    {...props}
  >
    {children}
    <i className="i-mingcute-right-line -mr-1 ml-auto size-3.5" />
  </DropdownMenuPrimitive.SubTrigger>
)
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName

const DropdownMenuSubContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitive.SubContent>>
}) => (
  <RootPortal>
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={cn(
        'bg-material-medium backdrop-blur-background text-text text-body',
        'min-w-32 overflow-hidden',
        'rounded-[6px] border p-1',
        'shadow-context-menu',
        'z-[61]',
        className,
      )}
      {...props}
    />
  </RootPortal>
)
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName

const DropdownMenuContent = ({
  ref,
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitive.Content>>
}) => {
  return (
    <RootPortal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={cn(
          'bg-material-medium backdrop-blur-background text-text shadow-context-menu z-[60] min-w-32 overflow-hidden rounded-[6px] border p-1',
          'motion-scale-in-75 motion-duration-150 text-body lg:animate-none',
          className,
        )}
        {...props}
      />
    </RootPortal>
  )
}
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName

const DropdownMenuItem = ({
  ref,
  className,
  inset,
  icon,
  active,
  highlightColor = 'accent',
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean
  icon?: React.ReactNode | ((props?: { isActive?: boolean }) => React.ReactNode)
  active?: boolean
  highlightColor?: 'accent' | 'gray'
} & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitive.Item>>
}) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      'cursor-menu relative flex select-none items-center rounded-[5px] px-2.5 py-1 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'focus-within:outline-transparent',
      highlightColor === 'accent'
        ? 'data-[highlighted]:bg-theme-selection-hover focus:bg-theme-selection-active focus:text-theme-selection-foreground data-[highlighted]:text-theme-selection-foreground'
        : 'data-[highlighted]:bg-theme-item-hover focus:bg-theme-item-active',

      'h-[28px]',
      inset && 'pl-8',
      className,
    )}
    {...props}
  >
    {!!icon && (
      <span className="mr-1.5 inline-flex size-4 items-center justify-center">
        {typeof icon === 'function' ? icon({ isActive: active }) : icon}
      </span>
    )}
    {props.children}
    {/* Justify Fill */}
    {!!icon && <span className="ml-1.5 size-4" />}
  </DropdownMenuPrimitive.Item>
)
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName

const DropdownMenuCheckboxItem = ({
  ref,
  className,
  children,
  checked,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>>
}) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      'cursor-checkbox focus:bg-theme-selection-active focus:text-theme-selection-foreground relative flex select-none items-center rounded-[5px] px-8 py-1.5 outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'focus-within:outline-transparent',
      'h-[28px]',
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator asChild>
        <i className="i-mgc-check-filled size-3" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
)
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName

const DropdownMenuLabel = ({
  ref,
  className,
  inset,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean
} & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitive.Label>>
}) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      'text-text px-2 py-1.5 font-semibold',
      inset && 'pl-8',
      className,
    )}
    {...props}
  />
)
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName

const DropdownMenuSeparator = ({
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & {
  ref?: React.Ref<React.ElementRef<typeof DropdownMenuPrimitive.Separator>>
}) => (
  <DropdownMenuPrimitive.Separator
    className="backdrop-blur-background mx-2 my-1 h-px"
    asChild
    ref={ref}
    {...props}
  >
    <Divider />
  </DropdownMenuPrimitive.Separator>
)
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName

const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn('ml-auto text-xs tracking-widest opacity-60', className)}
    {...props}
  />
)
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut'

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
}
