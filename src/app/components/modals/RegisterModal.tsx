"use client"

import { useCallback, useState } from "react"
import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { SiKakao, SiNaver } from "react-icons/si"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import Button from "../Button"

const RegisterModal = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("회원가입에 성공하였습니다!")
        registerModal.onClose()
        loginModal.onOpen()
      })
      .catch(() => {
        toast.error("회원가입에 실패하였습니다.")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const toggleModal = useCallback(() => {
    registerModal.onClose()
    loginModal.onOpen()
  }, [loginModal, registerModal])

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="HowShare와 함께 여행을 떠나보세요!" subtitle="계정 정보를 입력해주세요!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
      <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="구글로 회원가입하기" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="네이버로 회원가입하기" icon={SiNaver} onClick={() => signIn("naver")} />
      <Button outline label="카카오로 회원가입하기" icon={SiKakao} onClick={() => signIn("kakao")} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>이미 계정이 있으신가요?</div>
          <div onClick={toggleModal} className="text-neutral-800 cursor-pointer hover:underline">
            로그인
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={registerModal.isOpen}
      title="회원가입"
      body={bodyContent}
      footer={footerContent}
      actionLabel="회원가입"
      disabled={isLoading}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default RegisterModal
