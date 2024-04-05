import * as React from 'react'

import { cn } from '~/__generated__/utils'

import DatePicker from './DatePicker'
import { Input } from './Input'

import convertDate from '~/utils/convertDate'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => {
    const [isDragging, setIsDragging] = React.useState(false)
    const [startX, setStartX] = React.useState(0)
    const scrollLeft = React.useRef(0)

    const startDragging: React.MouseEventHandler<HTMLDivElement> = (e) => {
      setIsDragging(true)
      setStartX(e.pageX - e.currentTarget.offsetLeft)
      scrollLeft.current = e.currentTarget.scrollLeft
    }

    const stopDragging = () => {
      setIsDragging(false)
    }

    const onDragging: React.MouseEventHandler<HTMLDivElement> = (e) => {
      if (!isDragging) return
      e.preventDefault()
      const x = e.pageX - e.currentTarget.offsetLeft
      const walk = (x - startX) * 2
      const targetElement = e.currentTarget
      targetElement.scrollLeft = scrollLeft.current - walk
    }

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className="relative w-full overflow-auto rounded-lg border-2 border-gray-primary"
        onMouseDown={startDragging}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
        onMouseMove={onDragging}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <table ref={ref} className={`w-full caption-bottom text-sm ${className}`} {...props} />
      </div>
    )
  },
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => <thead ref={ref} className={cn('w-full [&_tr]:border-b', className)} {...props} />,
)
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
  ),
)
TableBody.displayName = 'TableBody'

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn('border-t bg-muted/50 font-medium [&>tr]:last:border-b-0', className)} {...props} />
  ),
)
TableFooter.displayName = 'TableFooter'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn('border-b border-gray-primary', className)} {...props} />
  ),
)
TableRow.displayName = 'TableRow'

interface IPropsTableHead {
  className?: string
  dataFields: string
  label: string
  typeInputData?: string
  onInputChange?: (columnName: string, value: string) => void
}

const TableHead = ({ className, label, typeInputData, onInputChange, dataFields }: IPropsTableHead) => {
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date())

  const handleDateChange = (date: Date) => {
    const formattedDate = convertDate(date)
    setSelectedDate(date)
    if (onInputChange) onInputChange(dataFields, formattedDate)
  }

  return (
    <th className={cn('h-12 p-4 text-left align-middle font-medium text-muted-foreground', className)}>
      <h5 className="text-bold mb-5 h-[50px] text-sm not-italic leading-5 text-white">{label}</h5>
      {typeInputData === 'DatePicker' ? (
        <DatePicker
          className="h-[30px] w-24 px-2 py-0 text-sm text-muted-foreground lg:w-28 lg:text-sm"
          field={{ value: selectedDate, onChange: handleDateChange }}
        />
      ) : (
        <Input
          className={cn('h-[30px] w-24 text-sm lg:w-28', dataFields === 'user.email' && 'w-70 lg:w-70')}
          onChange={(e) => {
            if (onInputChange) onInputChange(dataFields, e.target.value)
          }}
        />
      )}
    </th>
  )
}
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn('p-4 align-middle text-sm font-normal not-italic text-black', className)} {...props} />
  ),
)
TableCell.displayName = 'TableCell'

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn('mt-4 text-sm text-muted-foreground', className)} {...props} />
  ),
)
TableCaption.displayName = 'TableCaption'

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow }

export default Table
