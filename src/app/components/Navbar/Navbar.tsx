"use client"

import { User } from "@prisma/client"
import Container from "../Container"
import Logo from "./Logo"
import SearchBar from "./SearchBar"
import UserMenu from "./UserMenu"
import Categories from "./Categories"

interface NavbarProps {
  currentUser?: User | null
}

const Navbar = ({ currentUser }: NavbarProps) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row justify-between items-center gap-3 md:gap-0">
            <Logo />
            <SearchBar />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  )
}

export default Navbar
