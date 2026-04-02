import Image from "next/image";
import LogoImage from "@/public/Logo.svg";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href={"/"}>
      <Image className="cursor-pointer" src={LogoImage} alt="Logo" />
    </Link>
  );
}
