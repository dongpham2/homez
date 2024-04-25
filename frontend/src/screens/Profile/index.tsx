import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/components/Form'
import { Button } from '../../components/Button'
import { Input } from '~/components/Input'
import { useForm } from 'react-hook-form'
import cameraIcon from '~/assets/icons/camera.icon.svg'
import { ChangeEvent, useState } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '~/__generated__/utils'
import { type IUser } from '~/types/user.type'

const tabVariant = cva('h-1 w-full', {
  variants: {
    variant: {
      default: 'bg-transparent',
      active: 'bg-orange-primary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

const Profile = () => {
  const img = ''
  const [toggleState, setToggleState] = useState(1)
  const [imageUrl, setImageUrl] = useState('')
  const form = useForm()

  const toggleTab = (index: number) => {
    setToggleState(index)
  }

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()

    reader.onload = (e) => {
      if (e.target) {
        setImageUrl(e.target.result as string)
      }
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[--gray-secondary]">
      <Form {...form}>
        <form className="absolute flex h-full w-full flex-col overflow-hidden rounded-lg bg-white p-6 sm:top-[10%] sm:max-h-[855px] sm:max-w-[650px]">
          <h1 className="pb-5 text-xl font-medium sm:text-2xl">Quản lý tài khoản</h1>
          {/* setting bar */}
          <div className="flex gap-4">
            <div>
              <h4 className="cursor-pointer text-base" onClick={() => toggleTab(1)}>
                Chỉnh sửa thông tin
              </h4>
              <div className={cn(tabVariant({ variant: toggleState === 1 ? 'active' : 'default' }))}></div>
            </div>
            <div>
              <h4 className="cursor-pointer text-base" onClick={() => toggleTab(2)}>
                Cài đặt tài khoản
              </h4>
              <div className={cn(tabVariant({ variant: toggleState === 2 ? 'active' : 'default' }))}></div>
            </div>
          </div>
          <div className="mb-5 w-full bg-gray-300 pb-[0.5px]"></div>
          {/* personal infor */}
          {toggleState === 1 && (
            <div>
              <div className="flex-col items-center justify-center pb-5">
                <h2 className="text-lg font-medium sm:text-xl">Thông tin cá nhân</h2>
                <div className="flex h-60 items-center justify-center">
                  {
                    <div className="absolute flex h-32 w-32 flex-col items-center justify-center rounded-full bg-[--gray-secondary]">
                      {imageUrl ? (
                        <img src={imageUrl} alt="preview" className="h-full w-full rounded-full object-cover" />
                      ) : img ? (
                        <img src={img} alt="preview" className="h-full w-full rounded-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center">
                          <img src={cameraIcon} alt="preview" />
                          <span>Tải ảnh</span>
                        </div>
                      )}
                    </div>
                  }
                  <FormField
                    name="avatar"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="file"
                              placeholder="Tải ảnh"
                              className="h-32 w-32 cursor-pointer rounded-full opacity-0"
                              {...{ ...field, onChange: handleImageChange }}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
                <div>
                  <h3 className="pb-2">Họ và tên</h3>
                  <FormField
                    name="fullName"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Nguyễn Văn A" {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
              </div>
              <div className="mb-5 h-[0.5px] w-full bg-gray-300"></div>
              <div className="pb-5">
                <h2 className="pb-5 text-lg font-medium sm:text-xl">Thông tin liên hệ</h2>
                <div>
                  <h3 className="pb-2">Số điện thoại chính</h3>
                  <FormField
                    name="phone"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="0123456789" {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )
                    }}
                  />
                </div>
                <div>
                  <h3 className="pb-2">Email</h3>
                  <Input
                    className="bg-[--gray-secondary]"
                    placeholder="nguyenvana@gmail.com"
                    type="email"
                    disabled={true}
                    value="asd@gmail.com"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="sm" variant="primary" className="sm:w-38 w-50 text-white">
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          )}
          {/* Account Settings */}
          {toggleState === 2 && <div>Account Settings</div>}
        </form>
      </Form>
    </div>
  )
}

export default Profile
