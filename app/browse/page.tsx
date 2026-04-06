import Image from "next/image";
import Link from "next/link";
import ArrowRight from "@/public/ArrowOutLined.svg";
import {
  getCategoryFilters,
  getCourses,
  getIntructorFilters,
  getTopicFilters,
} from "./services";
import BrowseClient from "./[id]/components/BrowseClient";

export default async function Browse() {
  const initialCourses = await getCourses();
  console.log(initialCourses);
  const categoryFilters = await getCategoryFilters();

  const topicFilters = await getTopicFilters();
  console.log(topicFilters);
  const instructorFilters = await getIntructorFilters();

  return (
    <div>
      <div className="flex items-center gap-1 mt-16.75">
        <Link className="text-dark-gray font-medium" href={"/"}>
          Home
        </Link>
        <Image src={ArrowRight} alt="arrow" />
        <Link className="text-primary-purple font-medium" href={"/browse"}>
          Browse
        </Link>
      </div>
      <BrowseClient
        categoryFilters={categoryFilters.data}
        instructorFilters={instructorFilters.data}
        topicFilters={topicFilters.data}
        coursesData={initialCourses}
      />
    </div>
  );
}
