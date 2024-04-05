import doneIcon from '~/assets/done.svg'

import { Dialog, DialogContent, DialogTitle } from './Dialog'

interface ModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
}
const SuccessPopup = ({ title, isOpen, onClose }: ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="px-18 py-19 bg-green-primary flex h-44 items-center justify-center border-2 border-gray-primary sm:max-w-[510px]">
        <img
          src={doneIcon}
          alt="doneIcon"
          className="absolute -top-[50%] left-[50%] translate-x-[-50%] translate-y-[50%]"
        />
        <DialogTitle className="text-center text-base font-bold leading-7 tracking-wide">{title}</DialogTitle>
      </DialogContent>
    </Dialog>
  )
}

export default SuccessPopup
