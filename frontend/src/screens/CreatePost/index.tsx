import { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

import { app } from '~/firebase'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '~/components/Form'
import { useForm } from 'react-hook-form'
import postValidate, { IPost, postInitValues } from '~/validate/post/config'
import { yupResolver } from '@hookform/resolvers/yup'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '~/components/Select'
import CityData from "~/data/dataCity"

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
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [],
  })
  const [imageUploadError, setImageUploadError] = useState<string | false>(false)
  const [uploading, setUploading] = useState<boolean>(false)

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)
  const [districts, setDistricts] = useState<any[]>([])

  const handleProvinceChange = (selectedValue: string | null) => {
    setSelectedProvince(selectedValue)
  }
 
  useEffect(() => {
    if (selectedProvince) {
      const filteredDistricts = CityData.district.filter((district) => district.idProvince === selectedProvince)
      setDistricts(filteredDistricts)
    } else {
      setDistricts([])
    }
  }, [selectedProvince]) 
  
  const form = useForm<IPost>({
      mode: 'all',
      defaultValues: postInitValues,
      resolver: yupResolver(postValidate),
    })

    const onSubmit = async () => {
      
    }
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
          console.log('progress', progress)
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
    <div>
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
                        <Select defaultValue={field.value} onValueChange={handleProvinceChange}>
                          <SelectTrigger className="h-14 w-full border border-input bg-white">
                            <SelectValue placeholder="Select" className="px-2 text-base font-medium" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {CityData.province.map((province) => (
                                <SelectItem key={province.value} value={province.value}>
                                  {province.name}
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
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="h-14 w-full border border-input bg-white">
                            <SelectValue placeholder="Chọn quận/huyện" className="px-2 text-base font-medium" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {districts.map((district) => (
                                <SelectItem key={district.value} value={district.value}>
                                  {district.name}
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
                        <Select defaultValue={field.value} onValueChange={handleProvinceChange}>
                          <SelectTrigger className="h-14 w-full border border-input bg-white">
                            <SelectValue placeholder="Select" className="px-2 text-base font-medium" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {CityData.province.map((province) => (
                                <SelectItem key={province.value} value={province.value}>
                                  {province.name}
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
              <h3 className="text-base font-medium">Đường, phố</h3>
              <FormField
                name="street"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Select defaultValue={field.value} onValueChange={field.onChange}>
                          <SelectTrigger className="h-14 w-full border border-input bg-white">
                            <SelectValue placeholder="Chọn quận/huyện" className="px-2 text-base font-medium" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {districts.map((district) => (
                                <SelectItem key={district.value} value={district.value}>
                                  {district.name}
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
                name="bedRooms"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nhập mức giá (vd: 1000000)" {...field} />
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
                name="bathrooms"
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
              <h3 className="text-base font-medium">Nội thất</h3>
              <FormField
                name="furnished"
                control={form.control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        {/* <Input placeholder="Nhập địa chỉ (vd: 112 Hà Huy Tập)" {...field} /> */}
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )
                }}
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
          <div className="mt-3 flex justify-end">
            <Button type="submit" variant="primary" size="lg" className="w-56 text-white">
              Đăng bài
            </Button>
          </div>
        </form>
      </Form>
      <Input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setFiles(Array.from(e.target.files ?? []))
        }}
        className="w-full rounded border border-gray-300 p-3"
        type="file"
        id="images"
        accept="image/*"
        multiple
      />
      <Button type="button" disabled={uploading} onClick={handleImageSubmit} variant="primary" size="lg">
        {uploading ? 'Uploading...' : 'Upload'}
      </Button>
      {imageUploadError && <p>{imageUploadError}</p>}
      {formData.imageUrls.length > 0 &&
        formData.imageUrls.map((url, index) => (
          <div key={url} className="flex items-center justify-between border p-3">
            <img src={url} alt="listing image" className="h-20 w-20 rounded-lg object-contain" />
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
  )
}

export default CreatePost
