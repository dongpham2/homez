import { Checkbox, type CheckboxProps } from './Checkbox'
import Label from './Label'

interface CheckboxLabelProps extends CheckboxProps {
  className?: string
  label: string
  id?: string
  checked?: boolean | undefined
  variant?: 'default' | 'secondary' | null | undefined
  size?: 'default' | 'sm' | null | undefined
}
const CheckboxLabel = ({ onCheckedChange, checked, className, label, id, variant, size }: CheckboxLabelProps) => {
  return (
    <div className="relative flex items-center gap-2">
      <Checkbox
        id={id}
        checked={checked}
        variant={variant}
        size={size}
        className={className}
        onCheckedChange={onCheckedChange}
      />
      <Label htmlFor={id} className="font-bold leading-9">
        {label}
      </Label>
    </div>
  )
}

export default CheckboxLabel
