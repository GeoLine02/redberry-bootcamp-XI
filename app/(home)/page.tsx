import DummyInProgrtessCourses from "./components/DummyInProgrtessCourses";
import InCompleteCourses from "./components/InCompleteCourses";
import Slider from "./components/Slider";
import StartLerning from "./components/StartLerning";
import { getFeaturedCourses } from "./services";

export default async function Home() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <div className="flex flex-col gap-8">
      <Slider />
      <InCompleteCourses />
      <StartLerning courses={featuredCourses?.data} />
      <DummyInProgrtessCourses />
    </div>
  );
}
