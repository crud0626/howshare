"use client"

import axios, { AxiosError } from "axios"
import { useMemo, useState } from "react"
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import useRentModal from "@/app/hooks/useRentModal"
import { categories } from "../header/Categories"

import Modal from "./Modal"
import Heading from "../Heading"
import CategoryInput from "../inputs/CategoryInput"
import StateSelect from "../inputs/StateSelect"
import Counter from "../inputs/Counter"
import ImageUpload from "../inputs/ImageUpload"
import Input from "../inputs/Input"

type FormArrayValue = Record<"id" | "src", string>

enum STEPS {
  CATEGORY = 0,
  ADDRESS = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const router = useRouter()
  const rentModal = useRentModal()

  const [step, setStep] = useState(STEPS.CATEGORY)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      address: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      images: [],
      price: 1,
      title: "",
      description: "",
    },
  })

  const { fields, append } = useFieldArray({
    control,
    name: "images",
  })

  const category = watch("category")
  const address = watch("address")
  const guestCount = watch("guestCount")
  const roomCount = watch("roomCount")
  const bathroomCount = watch("bathroomCount")

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    })
  }

  const onBack = () => {
    setStep(prev => prev - 1)
  }

  const onNext = () => {
    setStep(prev => prev + 1)
  }

  const onSubmit: SubmitHandler<FieldValues> = data => {
    if (step !== STEPS.PRICE) {
      onNext()
      return
    }
    setIsLoading(true)

    const updatedValue = {
      ...data,
      images: data.images.map(({ src }: Record<"src", string>) => src),
    }

    axios
      .post("/api/listings", updatedValue)
      .then(() => {
        toast.success("성공했어요~!")
        router.refresh()
        reset()
        setStep(STEPS.CATEGORY)
        rentModal.onClose()
      })
      .catch((err: AxiosError) => {
        if (err.response?.status === 401) {
          toast.error("로그인을 다시 해주세요.")
          rentModal.onClose()
          router.refresh()
          return
        }

        toast.error("알 수 없는 에러가 발생하였습니다.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const actionLabel = useMemo(() => {
    return step === STEPS.PRICE ? "제출" : "다음"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.CATEGORY ? undefined : "이전"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="숙소의 특징을 선택해주세요" subtitle="숙소의 가장 큰 특징 1가지만 선택해주세요" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={value => {
                const category = categories.find(({ label }) => label === value)
                if (category) {
                  setCustomValue("category", category.type)
                }
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.ADDRESS) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="숙소의 위치는 어디인가요?" subtitle="정확한 주소를 입력해주세요" />
        <StateSelect value={address} onChange={value => setCustomValue("address", value)} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="숙소의 정보를 입력해주세요!" subtitle="아래에 정확한 정보를 입력해주세요" />
        <Counter title="최대 인원 수" value={guestCount} onChange={value => setCustomValue("guestCount", value)} />
        <hr />
        <Counter title="방 개수" value={roomCount} onChange={value => setCustomValue("roomCount", value)} />
        <hr />
        <Counter title="화장실 개수" value={bathroomCount} onChange={value => setCustomValue("bathroomCount", value)} />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="숙소의 이미지를 추가해주세요!" subtitle="최대 10장까지 추가할 수 있습니다" />
        <ImageUpload value={fields as FormArrayValue[]} onChange={value => append({ src: value })} />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="숙소에 대해 설명해주세요!" subtitle="사용자에게 보여지는 정보입니다" />
        <Input id="title" label="숙소의 이름" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <div className="w-full relative">
          <textarea 
          id="description" 
          cols={30} 
          rows={10} 
          disabled={isLoading} 
          placeholder="숙소에 대한 설명" 
          {...register("description")}
          className={`peer w-full p-4 pt-6 font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed pl-4
          ${errors["description"] ? "border-main-blue" : "border-neutral-300"}
          ${errors["description"] ? "focus:border-main-blue" : "focus:border-black"}
        `}></textarea>
        </div>
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="숙소의 가격을 입력해주세요!" subtitle="시간당 가격을 입력해주세요" />
        <Input
          id="price"
          label="가격"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    )
  }

  return (
    <Modal
      title="숙소 등록하기"
      isOpen={rentModal.isOpen}
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RentModal
