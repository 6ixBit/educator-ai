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
    <div className="mt-4 w-full">
      <p className="text-slate-400 mb-6">
        Practise these regularly to build your understanding.
      </p>

      <div className="flex flex-row items-baseline justify-center">
        <div className="flex flex-row gap-1">
          <h2 className="text-white text-md mb-3 font-normal">
            {currentOption + 1} /
          </h2>

          <h2 className="text-gray-500 text-md mb-3 font-normal">
            {options.length}
          </h2>
        </div>
        p
      </div>

      <div className=" mx-auto">
        <Swiper
          modules={[EffectFlip, Pagination, Navigation]}
          grabCursor={true}
          pagination={true}
          navigation={false}
          effect={"flip"}
          className="mySwiper"
        >
          <SwiperSlide className="text-white">
            <div className="flex flex-col gap-3 border rounded justify-center text-center h-44 px-2 bg-card-blue">
              <h2>{options[currentOption].front}</h2>
            </div>
          </SwiperSlide>
          <SwiperSlide className="text-white">
            <div className="flex flex-col gap-3 border rounded justify-center text-center h-44 bg-card-orange">
              <h2> {options[currentOption].back}</h2>
            </div>
          </SwiperSlide>
        </Swiper>
        <div className="flex flex-row justify-between mt-6">
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
    </div>
  );
}