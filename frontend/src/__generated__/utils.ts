import { twMerge } from 'tailwind-merge'
import { cx } from 'class-variance-authority'

export const cn: typeof cx = (...inputs) => {
  return twMerge(cx(inputs))
}
