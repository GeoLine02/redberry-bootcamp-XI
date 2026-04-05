import DummyInProgrtessCourses from "./components/DummyInProgrtessCourses";
import InCompleteCourses from "./components/InCompleteCourses";
import Slider from "./components/Slider";
import StartLerning from "./components/StartLerning";
import { getFeaturedCourses } from "./services";
import { getInprogressCourses } from "./services/index.server";

export default async function Home() {
  const featuredCourses = await getFeaturedCourses();
  const inProgressCourses = await getInprogressCourses();

  return (
    <div className="flex flex-col gap-8">
      <Slider />
      <InCompleteCourses incompleteCourses={inProgressCourses?.data ?? []} />
      <StartLerning courses={featuredCourses?.data} />
      <DummyInProgrtessCourses />
    </div>
  );
}
