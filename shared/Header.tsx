"use client";

import Logo from "@/ui/Logo";
import Image from "next/image";
import Link from "next/link";
import BrowseIcon from "@/public/BrowseCourses.svg";
import { Button } from "@/ui/Button";
export default function Header() {
  return (
    <header className="border-b border-border-gray">
      <div className="flex items-center  justify-between py-6 container">
        <Logo />
        <nav>
          <ul className="flex items-center gap-9">
            <li>
              <Link className="flex gap-1 items-center" href={"/"}>
                <Image src={BrowseIcon} alt="Browse Courses" />
                <span>Browse Courses</span>
              </Link>
            </li>
            <div className="flex items-center gap-3.75">
              <Button variant={"outline"}>Log In</Button>
              <Button variant={"primary"}>Sign Up</Button>
            </div>
          </ul>
        </nav>
      </div>
    </header>
  );
}
