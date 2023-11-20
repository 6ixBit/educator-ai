import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface IFlashCards {
  options: { front: string; back: string }[];
}

export default function FlashCards({ options }: IFlashCards) {
  const [currentOption, setCurrentOption] = useState(0);

  const handleNext = () => {
    if (currentOption < options.length - 1) {
      setCurrentOption(currentOption + 1);
    }
  };

  const handlePrev = () => {
    if (currentOption > 0) {
      setCurrentOption(currentOption - 1);
    }
  };

  return (
    <div className="mt-16">
      <p className="text-white text-lg font-bold text-center mb-2">
        FlashCards
      </p>
      <Swiper
        modules={[EffectFlip, Pagination, Navigation]}
        grabCursor={true}
        pagination={true}
        navigation={false}
        effect={"flip"}
        onSlideChange={() => console.log("slide change")}
        style={{ width: "20rem" }}
        className="mySwiper"
      >
        <SwiperSlide className="text-white">
          <div className="flex flex-col gap-3 border rounded  justify-center text-center h-44 px-2 bg-card-blue">
            <h2>{options[currentOption].front}</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide className="text-white">
          <div className="flex flex-col gap-3 border rounded justify-center text-center h-44 bg-card-orange">
            <h2> {options[currentOption].back}</h2>
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="flex flex-row justify-between mt-4">
        <button
          onClick={handlePrev}
          disabled={currentOption === 0}
          className={`bg-red-500 text-white rounded-lg w-20 text-center h-8 ${
            currentOption === 0 ? "opacity-50" : ""
          }`}
        >
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentOption === options.length - 1}
          className={`bg-green-400 text-white rounded-lg w-20 text-center h-8 ${
            currentOption === options.length - 1 ? "opacity-50" : ""
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
