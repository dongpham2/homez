import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { Button } from '~/components/Button'
import { Checkbox } from '~/components/Checkbox'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/components/Form'
import { Input } from '~/components/Input'
import Label from '~/components/Label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/Select'
import { fetchDistricts, fetchProvinces, fetchWards, useAppDispatch } from '~/redux/province/provinceSlice'
import { type RootState } from '~/redux/store'
import { type District, type Province, type Ward } from '~/types/province.type'
import postValidate, { type IPost, postInitValues } from '~/validate/post/config'

import app from '~/firebase'

interface FormData {
  imageUrls: string[]
}

const unitValue = [
  {
    value: 1,
    name: 'tỷ',
  },
  {
    value: 2,
    name: 'm2',
  },
  {
    value: 3,
    name: 'thỏa thuận',
  },
]

const CreatePost = () => {
  const dispatch = useAppDispatch()
  const { provinces } = useSelector((state: RootState) => state.provinceReducer)
  const { districts } = useSelector((state: RootState) => state.provinceReducer)
  const { wards } = useSelector((state: RootState) => state.provinceReducer)
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [],
  })
  const [imageUploadError, setImageUploadError] = useState<string | false>(false)
  const [uploading, setUploading] = useState<boolean>(false)
  const [_, setUploadProgress] = useState<number | undefined>(undefined)

  useEffect(() => {
    const promise = dispatch(fetchProvinces())
    return () => {
      promise.abort()
    }
  }, [dispatch])

  const handleProvinceChange = (selectedValue: number | null) => {
    if (selectedValue !== null) {
      dispatch(fetchDistricts(selectedValue))
    }
  }

  const handleDistrictChange = (selectedValue: number | null) => {
    if (selectedValue !== null) {
      dispatch(fetchWards(selectedValue))
    }
  }

  const form = useForm<IPost>({
    mode: 'all',
    defaultValues: postInitValues,
    resolver: yupResolver(postValidate),
  })

  const { watch, setValue } = form

  const furnished = watch('furnished')

  const handleCheckedFurnished = (checked: boolean) => {
    setValue('furnished', checked)
  }

  const onSubmit = async () => {}
  const storageImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setUploadProgress(progress)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        },
      )
    })
  }

  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      const promises = []
      for (let i = 0; i < files.length; i++) {
        promises.push(storageImage(files[i]))
      }

      Promise.all(promises)
        .then((urls: string[] | unknown[]) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            imageUrls: prevFormData.imageUrls.concat(urls as string[]),
          }))
          setImageUploadError(false)
          setUploading(false)
        })
        .catch((error: string) => {
          console.log('error', error)
          setImageUploadError('Image upload failed (2 mb max per image)')
          setUploading(false)
        })
    } else {
      setImageUploadError('You can only upload 6 images per listing')
      setUploading(false)
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="px-[300px] py-8">
      <div className="rounded-lg border border-black p-5">
        <Form {...form}>
          <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium">Tiêu đề</h3>
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nhập tiêu đề..." {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-base font-medium">Nội dung bài đăng</h3>
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nhập nội dung..." {...field} />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <h3 className="text-base font-medium">Chọn tỉnh, thành phố</h3>
                <FormField
                  name="city"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={(value: string) => {
                              handleProvinceChange(parseInt(value, 10))
                            }}
                          >
                            <SelectTrigger className="h-14 w-full border border-input bg-white">
                              <SelectValue placeholder="Select" className="px-2 text-base font-medium" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {provinces.map((province: Province) => (
                                  <SelectItem key={province.province_id} value={province.province_id}>
                                    {province.province_name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              <div className="w-full">
                <h3 className="text-base font-medium">Chọn quận, huyện</h3>
                <FormField
                  name="district"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={(value: string) => {
                              handleDistrictChange(parseInt(value, 10))
                            }}
                          >
                            <SelectTrigger className="h-14 w-full border border-input bg-white">
                              <SelectValue placeholder="Chọn quận/huyện" className="px-2 text-base font-medium" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {districts.map((district: District) => (
                                  <SelectItem key={district.district_id} value={district.district_id}>
                                    {district.district_name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <h3 className="text-base font-medium">Phường, xã</h3>
                <FormField
                  name="wards"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-14 w-full border border-input bg-white">
                              <SelectValue placeholder="Select" className="px-2 text-base font-medium" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {wards.map((ward: Ward) => (
                                  <SelectItem key={ward.ward_id} value={ward.ward_id}>
                                    {ward.ward_name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              <div className="w-full">
                <h3 className="text-base font-medium">Nhập tên đường</h3>
                <FormField
                  name="address"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nhập địa chỉ (vd: 112 Hà Huy Tập)" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <h3 className="text-base font-medium">Diện tích</h3>
                <FormField
                  name="area"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nhập diện tích (vd: 100)" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              <div className="w-[30%]">
                <h3 className="text-base font-medium">Đơn vị</h3>
                <FormField
                  name="unit"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Select defaultValue={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className="h-14 w-full border border-input bg-white">
                              <SelectValue placeholder="Đơn vị" className="px-2 text-base font-medium" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {unitValue.map((unit) => (
                                  <SelectItem key={unit.value} value={unit.name}>
                                    {unit.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <h3 className="text-base font-medium">Số phòng ngủ</h3>
                <FormField
                  name="bathrooms"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="2" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
              <div className="w-full">
                <h3 className="text-base font-medium">Số phòng tắm</h3>
                <FormField
                  name="bedRooms"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="2" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-full">
                <h3 className="text-base font-medium">Nội thất</h3>
                <Checkbox
                  name="furnished"
                  checked={furnished}
                  onCheckedChange={handleCheckedFurnished}
                  className="border border-black"
                />
              </div>
              <div className="w-full">
                <h3 className="text-base font-medium">Loại bất động sản</h3>
                <FormField
                  name="typeofrealestate"
                  control={form.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Nhập địa chỉ (vd: 112 Hà Huy Tập)" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
              </div>
            </div>
            <div className="rounded-lg border border-gray-300 p-3">
              <div>
                <h3 className="mb-1 text-2xl font-bold">Hình ảnh & Video</h3>
                <p className="text-sm">• Đăng tối thiểu 4 ảnh thường với tin VIP</p>
                <p className="text-sm">• Đăng tối đa 24 ảnh với tất cả các loại tin</p>
                <p className="text-sm">• Hãy dùng ảnh thật, không trùng, không chèn SĐT</p>
                <p className="text-sm">• Mỗi ảnh kích thước tối thiểu 100x100 px, tối đa 15 MB</p>
                <p className="text-sm">• Mô tả ảnh tối đa 45 kí tự.</p>
              </div>
              <div className="mt-5">
                <div className="flex w-full items-center justify-center">
                  <Label className="dark:hover:bg-bray-800 flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <svg
                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <Input
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFiles(Array.from(e.target.files ?? []))
                      }}
                      className="hidden"
                      type="file"
                      accept="image/*"
                      multiple
                    />
                  </Label>
                </div>
                {imageUploadError && <p>{imageUploadError}</p>}
                <div className="flex">
                  {formData.imageUrls.length > 0 &&
                    formData.imageUrls.map((url, index) => (
                      <div key={url} className="flex flex-col p-3">
                        <img
                          src={url}
                          alt="listing image"
                          className="h-full max-h-32 w-full max-w-44 rounded-lg object-cover"
                        />
                        <Button
                          type="button"
                          onClick={() => {
                            handleRemoveImage(index)
                          }}
                          className="rounded-lg p-3 uppercase text-red-700 hover:opacity-75"
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                </div>
                <Button type="button" disabled={uploading} onClick={handleImageSubmit} variant="primary" size="lg">
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              </div>
            </div>
            <div className="mt-3 flex justify-end">
              <Button type="submit" variant="primary" size="lg" className="w-56 text-white">
                Đăng bài
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default CreatePost
