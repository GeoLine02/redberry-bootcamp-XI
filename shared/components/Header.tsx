import Logo from "@/ui/Logo";
import Image from "next/image";
import Link from "next/link";
import BrowseIcon from "@/public/BrowseCourses.svg";
import AuthButtons from "./AuthButtons";
import { getInprogressCourses } from "@/app/(home)/services/index.server";

export default async function Header() {
  const enrolledCourses = await getInprogressCourses();

  return (
    <header className="border-b border-border-gray">
      <div className="flex items-center  justify-between py-6 container">
        <Logo />
        <nav>
          <ul className="flex items-center gap-9">
            <li>
              <Link className="flex gap-1 items-center" href={"/browse"}>
                <Image src={BrowseIcon} alt="Browse Courses" />
                <span className="text-dark-gray font-medium">
                  Browse Courses
                </span>
              </Link>
            </li>

            <AuthButtons enrolledCourses={enrolledCourses.data} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
