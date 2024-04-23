import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/components/Form'
import { Button } from '../../components/Button'
import { Input } from '~/components/Input'
import { useForm } from 'react-hook-form'
import cameraIcon from '~/assets/icons/camera.icon.svg'
import { useState } from 'react'
import { cva } from 'class-variance-authority'
import { cn } from '~/__generated__/utils'

const settingVariant = cva('h-1 w-full', {
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
  const img = 'https://www.vietnamworks.com/hrinsider/wp-content/uploads/2023/12/anh-dep-thien-nhien-3d-001.jpg'
  const [isEdit, setIsEdit] = useState(true)
  const [isSetting, setIsSetting] = useState(false)
  const form = useForm()
  const handleEdit = () => {
    setIsEdit(true)
    setIsSetting(false)
  }
  const handleSetting = () => {
    setIsEdit(false)
    setIsSetting(true)
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-[--gray-secondary]">
      <Form {...form}>
        <form className="absolute flex h-full w-full flex-col overflow-hidden rounded-lg bg-white p-6 sm:top-[10%] sm:max-h-[855px] sm:max-w-[650px]">
          <h1 className="pb-5 text-xl font-medium sm:text-2xl">Quản lý tài khoản</h1>
          {/* setting bar */}
          <div className="flex gap-4">
            <div>
              <h4 className="cursor-pointer text-base" onClick={handleEdit}>
                Chỉnh sửa thông tin
              </h4>
              <div className={cn(settingVariant({ variant: isEdit ? 'active' : 'default' }))}></div>
            </div>
            <div>
              <h4 className="cursor-pointer text-base" onClick={handleSetting}>
                Cài đặt tài khoản
              </h4>
              <div className={cn(settingVariant({ variant: isSetting ? 'active' : 'default' }))}></div>
            </div>
          </div>
          <div className="mb-5 w-full bg-gray-300 pb-[0.5px]"></div>
          {/* personal infor */}
          {isEdit && (
            <div>
              <div className="flex-col items-center justify-center pb-5">
                <h2 className="text-lg font-medium sm:text-xl">Thông tin cá nhân</h2>
                <div className="flex h-60 items-center justify-center">
                  <Button variant="default">
                    {img ? (
                      <img className="flex h-32 w-32 flex-col items-center justify-center rounded-full" src={img} />
                    ) : (
                      <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white">
                        <img src={cameraIcon} alt="camera" />
                        <span>Tải ảnh</span>
                      </div>
                    )}
                  </Button>
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
                            <Input type="fullName" placeholder="Nguyễn Văn A" {...field} />
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
                            <Input type="phone" placeholder="0123456789" {...field} />
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
          {isSetting && <div>Account Settings</div>}
        </form>
      </Form>
    </div>
  )
}

export default Profile
