"use client"

import { useCallback, useEffect, useState } from "react"
import { IoMdClose } from "react-icons/io"

import Button from "../Button"

interface ModalProps {
  isOpen?: boolean
  title?: string
  body?: React.ReactElement
  footer?: React.ReactElement
  disabled?: boolean
  actionLabel: string
  secondaryActionLabel?: string
  secondaryAction?: () => void
  onClose: () => void
  onSubmit: () => void
}

const Modal = ({
  isOpen,
  title,
  body,
  footer,
  disabled,
  actionLabel,
  secondaryActionLabel,
  secondaryAction,
  onClose,
  onSubmit,
}: ModalProps) => {
  const [showModal, setShowModal] = useState(isOpen)

  const handleClose = useCallback(() => {
    if (disabled) return

    setShowModal(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }, [disabled, onClose])

  const handleSubmit = useCallback(() => {
    if (disabled) return

    onSubmit()
  }, [disabled, onSubmit])

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return

    secondaryAction()
  }, [disabled, secondaryAction])

  useEffect(() => {
    setShowModal(isOpen)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      <div className="fixed top-0 left-0 z-50 w-full h-full">
        <div className="absolute w-full h-full bg-neutral-800/70 z-10"></div>
        <div
          className={`relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 h-full my-0 mx-auto sm:my-6 translate overflow-auto duration-300 z-10 
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opcaity-0"}`}
        >
          <div className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <div className="text-lg font-semibold">{title}</div>
              <button className="p-1 border-0 hover:opacity-50 transition absolute right-9" onClick={handleClose}>
                <IoMdClose size={22} />
              </button>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">{body}</div>
            <div className="px-6">
              <hr />
            </div>
            {/* Footer */}
            <div className="flex flex-col gap-2 p-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button outline disabled={disabled} label={secondaryActionLabel} onClick={handleSecondaryAction} />
                )}
                <Button disabled={disabled} label={actionLabel} onClick={handleSubmit} />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
