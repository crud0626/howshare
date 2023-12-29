"use client"

import { useCallback } from "react"
import Image from "next/image"
import { CldUploadWidget } from "next-cloudinary"
import { TbPhotoPlus } from "react-icons/tb"

declare global {
  var cloudinary: any
}

interface ImageUploadProps {
  value: Record<"id" | "src", string>[]
  onChange: (value: string) => void
}

const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url)
    },
    [onChange],
  )

  return (
    <CldUploadWidget
      onUpload={handleUpload}
      // 배포 이후 변경 필요
      uploadPreset="mbgiats5"
      options={{
        sources: ["local", "url", "camera"],
        multiple: true,
        maxFiles: 10,
      }}
    >
      {({ open }) => {
        return (
          <div
            // 에러 방지
            onClick={() => open?.()}
            className="
              relative 
              cursor-pointer 
              hover:opacity-70
              transition
              border-dashed
              border-2
              p-20
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
          "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">Click to upload</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                {value.map(({ src }) => (
                  <Image src={src} fill alt="Upload" className="object-cover" />
                ))}
              </div>
            )}
          </div>
        )
      }}
    </CldUploadWidget>
  )
}

export default ImageUpload
