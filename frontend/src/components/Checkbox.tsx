import React from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Check } from 'lucide-react'

import { cn } from '~/__generated__/utils'

const checkboxVariants = cva(
  'peer h-6 w-6 shrink-0 rounded border-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:text-primary-foreground',
  {
    variants: {
      variant: {
        default: 'border-gray-primary data-[state=checked]:bg-gray-primary',
        secondary: 'border-orange-primary data-[state=checked]:bg-orange-primary',
      },
      size: {
        default: 'h-6 w-6',
        sm: 'h-5 w-5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface CheckboxProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof checkboxVariants> {
  asChild?: boolean
  onCheckedChange?(checked: CheckboxPrimitive.CheckedState): void
  checked?: boolean
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CheckboxProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : CheckboxPrimitive.Root

    return (
      <Comp
        ref={ref}
        className={cn(checkboxVariants({ variant, size, className }), 'flex items-center justify-center text-current')}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn('flex items-center justify-center')}>
          <Check className="h-4 w-4" />
        </CheckboxPrimitive.Indicator>
      </Comp>
    )
  },
)

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox, checkboxVariants }
