import { useCallback, useMemo } from 'react'
import { cva } from 'class-variance-authority'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

import { Button } from './Button'

interface IPropsPagination {
  totalPage: number
  currentPage: number
  onChangePage: (page: number) => void
  itemsPerPage: number
  visiblePages: number
}

const buttonVariants = cva('h-10 w-10 border-2 border-gray-primary', {
  variants: {
    variant: {
      default: 'bg-white text-black',
      active: 'bg-gray-primary text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const Pagination = ({ totalPage, onChangePage, currentPage, itemsPerPage = 10, visiblePages }: IPropsPagination) => {
  const totalData = totalPage * itemsPerPage
  const fromItem = (currentPage - 1) * itemsPerPage + 1
  const toItem = Math.min(currentPage * itemsPerPage, totalData)

  const getPageList = useMemo(() => {
    const pages = Array.from({ length: totalPage }, (_, index) => index + 1)

    if (totalPage <= visiblePages) return pages

    const middle = Math.ceil(visiblePages / 2)
    let start = currentPage - middle + 1
    let end = currentPage + middle - 1

    if (start < 1) {
      start = 1
      end = visiblePages
    }

    if (end > totalPage) {
      end = totalPage
      start = totalPage - visiblePages + 1
    }

    return Array.from({ length: end - start + 1 }, (_, index) => index + start)
  }, [currentPage, totalPage, visiblePages])

  const handlePageChange = useCallback(
    (page: number) => {
      onChangePage(page)
    },
    [onChangePage],
  )

  const renderPages = useMemo<JSX.Element[]>(() => {
    return getPageList.map((page) => (
      <Button
        key={page}
        onClick={() => {
          handlePageChange(page)
        }}
        className={buttonVariants({ variant: page === currentPage ? 'active' : 'default' })}
      >
        {page}
      </Button>
    ))
  }, [currentPage, getPageList, handlePageChange])

  return (
    <div className="mt-20">
      <div className="mb-8 text-center font-medium leading-6 tracking-wider text-black">{`${fromItem}-${toItem} / ${totalData}`}</div>
      <div className="mt-10 flex items-center justify-center gap-x-2">
        <ChevronLeft
          onClick={() => {
            if (currentPage > 1) {
              handlePageChange(currentPage - 1)
            }
          }}
          className="h-10 w-10 cursor-pointer border-2 border-black bg-orange-primary"
        />

        {currentPage > visiblePages / 2 && (
          <>
            <Button
              className="h-10 w-10 border-2 border-gray-primary"
              onClick={() => {
                handlePageChange(1)
              }}
            >
              1
            </Button>
            {currentPage > visiblePages / 2 + 1 && <MoreHorizontal />}
          </>
        )}
        {renderPages}
        {currentPage <= totalPage - visiblePages / 2 && (
          <>
            {currentPage <= totalPage - visiblePages / 2 - 1 && <MoreHorizontal />}
            <Button
              className="h-10 w-10 border-2 border-gray-primary"
              onClick={() => {
                handlePageChange(totalPage)
              }}
            >
              <span>{totalPage}</span>
            </Button>
          </>
        )}

        <ChevronRight
          onClick={() => {
            if (currentPage < totalPage) handlePageChange(currentPage + 1)
          }}
          className="h-10 w-10 cursor-pointer border-2 border-black bg-orange-primary"
        />
      </div>
    </div>
  )
}

export default Pagination
