import { type ReactNode } from 'react'

import closeModalIcon from '~/assets/closeModal.svg'

import { Button } from './Button'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle } from './Dialog'

interface ModalBaseProps {
  isOpen: boolean
  onClose?: () => void
  title?: string
  children?: ReactNode
}
interface ModalConfirmProps {
  isOpen: boolean
  onClose?: () => void
  title?: string
  onDelete?: () => void
}

const ModalBase = ({ isOpen, onClose, title, children }: ModalBaseProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="border-2 border-gray-primary px-25 pb-9 pt-16 sm:max-w-[510px]">
        <DialogClose className="absolute -right-9 -top-8">
          <img src={closeModalIcon} alt="closeModalIcon" />
        </DialogClose>
        <DialogHeader className="px-7.5">
          <DialogTitle className="text-center text-base font-bold leading-7 tracking-wider">{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

const ModalConfirm = ({ isOpen, onClose, title, onDelete }: ModalConfirmProps) => {
  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={title}>
      <div>
        <Button variant="secondary" onClick={onDelete}>
          削除する
        </Button>
        <DialogClose asChild>
          <Button variant="ghost">キャンセル</Button>
        </DialogClose>
      </div>
    </ModalBase>
  )
}

export default ModalBase
export { ModalConfirm }
