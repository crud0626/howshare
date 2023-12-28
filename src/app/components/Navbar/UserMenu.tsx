"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { User } from "@prisma/client"

import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import useRentModal from "@/app/hooks/useRentModal"

import Avatar from "../Avatar"
import MenuItem from "./MenuItem"

interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const router = useRouter()
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const rentModal = useRentModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen()
      return
    }

    rentModal.onOpen()
  }, [currentUser, loginModal, rentModal])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={toggleOpen}
          className="p-1 border border-main-light-gray flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <Avatar src={currentUser?.image} />
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-max bg-white overflow-hidden right-0 top-12 text-sm border border-main-light-gray">
          {currentUser ? (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="내 여행" onClick={() => router.push("/trips")} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="내 찜목록" onClick={() => router.push("/favorites")} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="내 예약" onClick={() => router.push("/reservations")} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="내 숙소" onClick={() => router.push("/properties")} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="숙소 등록하기" onClick={onRent} />
              </div>
              <hr />
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="로그아웃" onClick={() => signOut()} />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="로그인" onClick={loginModal.onOpen} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="회원가입" onClick={registerModal.onOpen} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default UserMenu
