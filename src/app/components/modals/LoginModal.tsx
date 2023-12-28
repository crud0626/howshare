"use client"

import { useCallback, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import useLoginModal from "@/app/hooks/useLoginModal"
import useRegisterModal from "@/app/hooks/useRegisterModal"

import { FcGoogle } from "react-icons/fc"
import { SiKakao, SiNaver } from "react-icons/si"

import Modal from "./Modal"
import Heading from "../Heading"
import Input from "../inputs/Input"
import Button from "../Button"

const LoginModal = () => {
  const router = useRouter()
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true)

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then(res => {
      setIsLoading(false)

      if (res?.ok) {
        toast.success("Logged In")
        router.refresh()
        loginModal.onClose()
      }

      if (res?.error) {
        toast.error(res.error)
      }
    })
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="여행을 떠나볼까요?" subtitle="로그인 정보를 입력해주세요!" />
      <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required />
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

  const toggleModal = useCallback(() => {
    loginModal.onClose()
    registerModal.onOpen()
  }, [loginModal, registerModal])

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button outline label="구글로 로그인하기" icon={FcGoogle} onClick={() => signIn("google")} />
      <Button outline label="네이버로 로그인하기" icon={SiNaver} iconColor="#20cb01" onClick={() => signIn("naver")} />
      <Button outline label="카카오로 로그인하기" icon={SiKakao} iconColor="#000000" onClick={() => signIn("kakao")} />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center items-center gap-2">
          <div>처음이신가요?</div>
          <div onClick={toggleModal} className="text-neutral-800 cursor-pointer hover:underline">
            회원가입
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      isOpen={loginModal.isOpen}
      title="로그인"
      body={bodyContent}
      footer={footerContent}
      actionLabel="로그인"
      disabled={isLoading}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  )
}

export default LoginModal
