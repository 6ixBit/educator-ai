"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFlip, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function FlashCards() {
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
            <h1 className="text-lg">Kashtira</h1>
            <h2>The kashtira clan was lead by the infamous Rise Heart</h2>
          </div>
        </SwiperSlide>
        <SwiperSlide className="text-white">
          <div className="flex flex-col gap-3 border rounded justify-center text-center h-44 bg-card-orange">
            <h1>Tearlament</h1>
            <h2>Tearlaments was lead by Kaleido heart</h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
