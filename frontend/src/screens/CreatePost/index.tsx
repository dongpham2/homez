import { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

import { Button } from '~/components/Button'
import { Input } from '~/components/Input'

import { app } from '~/firebase'

interface FormData {
  imageUrls: string[]
}

const CreatePost = () => {
  const [files, setFiles] = useState<File[]>([])
  const [formData, setFormData] = useState<FormData>({
    imageUrls: [],
  })
  const [imageUploadError, setImageUploadError] = useState<string | false>(false)
  const [uploading, setUploading] = useState<boolean>(false)

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
