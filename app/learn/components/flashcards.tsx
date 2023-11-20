"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface IFlashCards {
  front_body: string;
  back_body: string;
}

export default function FlashCards({ front_body, back_body }: IFlashCards) {
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
            <h2>{front_body}</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide className="text-white">
          <div className="flex flex-col gap-3 border rounded justify-center text-center h-44 bg-card-orange">
            <h2> {back_body}</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
