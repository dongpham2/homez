import { CalendarIcon } from 'lucide-react'

import { cn } from '~/__generated__/utils'
import { Button } from '~/components/Button'
import { Calendar } from '~/components/Calendar'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/Popover'
import convertDate from '~/utils/convertDate'

interface DatePickerProps {
  field: {
    value?: Date | string
    onChange: (date: string) => void
  }
  className?: string
}
const DatePicker = ({ field, className }: DatePickerProps) => {
  const handleSelect = (selectedDay: Date | string | undefined) => {
    if (selectedDay) {
      field.onChange(convertDate(selectedDay))
    }
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'h-12 w-[250px] justify-between rounded px-5 py-3 text-left text-base font-medium',
              className,
            )}
          >
            {field.value ? convertDate(field.value as Date) : <span>YYYY/MM/DD</span>}
            <CalendarIcon className="m-0 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={field.value as Date} onSelect={handleSelect} initialFocus />{' '}
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePicker
