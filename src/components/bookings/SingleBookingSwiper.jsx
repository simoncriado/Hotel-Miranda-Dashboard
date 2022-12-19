import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

const SingleBookingSwiper = () => {
  return (
    <Swiper
      className="mySwiper"
      navigation={true}
      modules={[Navigation]}
      // spaceBetween={30}
      slidesPerView={1}
    >
      <SwiperSlide className="slider-container">
        <img
          src="https://images.unsplash.com/photo-1576354302919-96748cb8299e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=658&q=80"
          alt="Hotel Room"
        />
      </SwiperSlide>
      <SwiperSlide className="slider-container">
        <img
          src="https://images.unsplash.com/photo-1611971263575-ab653c31a5a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="Hotel Room"
        />
      </SwiperSlide>
      <SwiperSlide className="slider-container">
        <img
          src="https://images.unsplash.com/photo-1541628951107-a9af5346a3e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80"
          alt="Hotel Room"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default SingleBookingSwiper;
