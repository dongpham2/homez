import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/Select'

interface SelectOptionProps {
  options?: { value: string | number; label: string }[]
  field: {
    value: string
    onChange: (option: string) => void
  }
  placeholder?: string
}
const SelectOption = ({ options = [], field, placeholder }: SelectOptionProps) => {
  return (
    <div className="relative">
      <Select onValueChange={field.onChange} {...field} defaultValue={String(field.value)}>
        <SelectTrigger className="h-12 w-[250px] rounded border-2 border-gray-primary ">
          <SelectValue placeholder={placeholder} className="text-base font-medium" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => {
              return (
                <SelectItem value={String(option.value)} key={option.value} className="font-medium">
                  {option.label}
                </SelectItem>
              )
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default SelectOption
