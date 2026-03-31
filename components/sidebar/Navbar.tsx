"use client";
import Image from "next/image";
import { logo } from "@/constants/images";
import NavMenu from "./NavMenu";
import NavMenuSheet from "./NavMenuSheet";
import { soure_gummy } from "@/constants/fonts";

function Navbar() {
  return (
    <header className="flex justify-between items-center md:px-30 px-10 py-2">
      <div className="flex items-center justify-between">
        <Image
          src={logo}
          alt="logo"
          width={100}
          height={100}
          className="w-10 h-10"
        />
        <h1
          className={`text-3xl ml-2 font-bold ${soure_gummy.className} text-[#1F4163] dark:text-white`}
        >
          Lmverse
        </h1>
      </div>
      <NavMenu />
      <NavMenuSheet />
    </header>
  );
}

export default Navbar;
