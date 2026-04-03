import Slider from "./components/Slider";
import StartLerning from "./components/StartLerning";
import { getFeaturedCourses } from "./services";

export default async function Home() {
  const featuredCourses = await getFeaturedCourses();

  return (
    <div>
      <Slider />
      <StartLerning courses={featuredCourses?.data ?? []} />
    </div>
  );
}
