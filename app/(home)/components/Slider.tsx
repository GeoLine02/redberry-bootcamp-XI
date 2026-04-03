"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import SliderBgOne from "@/public/SliderBg1.png";
import SliderBgTwo from "@/public/SliderBg2.png";
import SliderBgThree from "@/public/SliderBg3.png";
import { StaticImageData } from "next/image";
import { Button } from "@/ui/Button";
import ArrowLeft from "@/public/ArrowLeftCircled.svg";
import ArrowRight from "@/public/ArrowRightCircled.svg";

const sliderData = [
  {
    image: SliderBgOne,
    title: "Start learning something new today",
    description:
      "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
    buttonLabel: "Browse Courses",
  },
  {
    image: SliderBgTwo,
    title: "Pick up where you left off",
    description:
      "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
    buttonLabel: "Start Learning",
  },
  {
    image: SliderBgThree,
    title: "Learn together, grow faster",
    description: "",
    buttonLabel: "Learn More",
  },
];

interface SlideProps {
  slide: {
    image: StaticImageData;
    title: string;
    description: string;
    buttonLabel: string;
  };
}

const Slide = ({ slide }: SlideProps) => {
  return (
    <div
      className="relative w-full h-105 rounded-[30px] overflow-hidden"
      style={{
        backgroundImage: `url(${slide.image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="relative z-10 flex h-full flex-col p-8 text-white">
        <h2 className="text-[48px] font-semibold mb-3">{slide.title}</h2>
        <p className="text-6 text-2xl font-light max-w-304.5 mb-10">
          {slide.description}
        </p>
        <Button className="" variant={"primary"}>
          {slide.buttonLabel}
        </Button>
      </div>
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
};

export default function Slider() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const isLast = currentIndex === sliderData.length - 1;
  const isFirst = currentIndex === 0;

  return (
    <div className="relative mt-16">
      <Swiper
        className="custom-swiper"
        slidesPerView={1}
        pagination={{
          clickable: true,
          el: ".custom-pagination",
        }}
        speed={650}
        modules={[Pagination, Navigation]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
        {sliderData.map((slider, index) => (
          <SwiperSlide key={index}>
            <Slide slide={slider} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom-right: dots + prev + next all in one row */}
      <div className="absolute bottom-11 right-11 z-20 flex items-center gap-6 w-[59%]">
        <div className="custom-pagination flex items-center" />
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className={`transition-opacity duration-300 ${isFirst ? "opacity-40" : "opacity-100"}`}
        >
          <Image src={ArrowLeft} alt="Previous" width={54} height={54} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className={`transition-opacity duration-300 ${isLast ? "opacity-40" : "opacity-100"}`}
        >
          <Image src={ArrowRight} alt="Next" width={54} height={54} />
        </button>
      </div>
    </div>
  );
}
