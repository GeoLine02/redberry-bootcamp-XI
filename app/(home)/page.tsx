import { cookies } from "next/headers";
import InCompleteCourses from "./components/InCompleteCourses";
import Slider from "./components/Slider";
import StartLerning from "./components/StartLerning";
import { getFeaturedCourses } from "./services";
import { getInprogressCourses } from "./services/index.server";

export default async function Home() {
  const featuredCourses = await getFeaturedCourses();
  const inProgressCourses = await getInprogressCourses();

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;
  console.log(token);
  return (
    <div className="flex flex-col gap-8">
      <Slider />
      <div className={`${token ? "flex-col" : "flex-col-reverse"} flex gap-8`}>
        <InCompleteCourses incompleteCourses={inProgressCourses?.data ?? []} />
        <StartLerning courses={featuredCourses?.data ?? []} />
      </div>
    </div>
  );
}
