"use client"

import { useCallback, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { signOut } from "next-auth/react"
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { User } from "@prisma/client"

interface UserMenuProps {
  currentUser?: User | null
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <button
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => {}}
        >
          Airbnb your home
        </button>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          {currentUser ? (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="My trips" onClick={() => {}} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="My favorites" onClick={() => {}} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="My reservations" onClick={() => {}} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="My properties" onClick={() => {}} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="My home" onClick={() => {}} />
              </div>
              <hr />
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="Log out" onClick={() => signOut()} />
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="Login" onClick={loginModal.onOpen} />
              </div>
              <div className="flex flex-col cursor-pointer">
                <MenuItem label="Sign Up" onClick={registerModal.onOpen} />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default UserMenu
