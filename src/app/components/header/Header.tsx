"use client"

import { User } from "@prisma/client"
import Container from "../Container"
import Logo from "./Logo"
import SearchBar from "./SearchBar"
import UserMenu from "./UserMenu"
import CategoryBar from "./CategoryBar"

interface HeaderProps {
  currentUser?: User | null
}

const Header = ({ currentUser }: HeaderProps) => {
  return (
    <header className="fixed w-full bg-white z-20 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row justify-between items-center gap-3 md:gap-0">
            <Logo />
            <SearchBar />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <CategoryBar />
    </header>
  )
}

export default Header
