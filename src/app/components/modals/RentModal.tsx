"use client"

import axios, { AxiosError } from "axios"
import { useMemo, useState } from "react"
import { FieldValues, SubmitHandler, useFieldArray, useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"

import useRentModal from "@/app/hooks/useRentModal"
import { categories } from "../Navbar/Categories"

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
  LOCATION = 1,
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
      location: null,
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
  const location = watch("location")
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

    const updatedData = {
      ...data,
      images: data.images.map(({ src }: FormArrayValue) => ({ src })),
    }

    setIsLoading(true)

    axios
      .post("/api/listings", updatedData)
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
    if (step === STEPS.PRICE) {
      return "Create"
    }

    return "Next"
  }, [step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return
    }

    return "Back"
  }, [step])

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading title="공유하려는 장소의 특징을 선택해주세요." subtitle="특징을 선택해주세요." />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map(item => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              icon={item.icon}
              label={item.label}
              selected={category === item.label}
              onClick={category => setCustomValue("category", category)}
            />
          </div>
        ))}
      </div>
    </div>
  )

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="숙소의 위치는 어디인가요?" subtitle="손님이 찾을 수 있도록 입력해주세요!" />
        <StateSelect value={location} onChange={value => setCustomValue("location", value)} />
      </div>
    )
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="몇 명까지 입장할 수 있나요?" subtitle="어떤 어메니티들이 있나요?" />
        <Counter
          title="최대 인원 수를 입력해주세요"
          subtitle="최대 인원 수"
          value={guestCount}
          onChange={value => setCustomValue("guestCount", value)}
        />
        <hr />
        <Counter
          title="방 개수"
          subtitle="방 개수가 몇개인가요?"
          value={roomCount}
          onChange={value => setCustomValue("roomCount", value)}
        />
        <hr />
        <Counter
          title="화장실"
          subtitle="화장실이 몇개인가요?"
          value={bathroomCount}
          onChange={value => setCustomValue("bathroomCount", value)}
        />
      </div>
    )
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="장소 이미지를 추가해주세요" subtitle="사용자에게 보여질 이미지를 소개해주세요!" />
        <ImageUpload value={fields as FormArrayValue[]} onChange={value => append({ src: value })} />
      </div>
    )
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="숙소에 대해서 설명해주세요" subtitle="잘 설명해주세요." />
        <Input id="title" label="Title" disabled={isLoading} register={register} errors={errors} required />
        <hr />
        <Input id="description" label="Description" disabled={isLoading} register={register} errors={errors} required />
      </div>
    )
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="가격을 입력해주세요" subtitle="1박 가격을 입력해주세요" />
        <Input
          id="price"
          label="Price"
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
      title="Login"
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
