import React, { useRef } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

const Slider = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
        progressCircle.current.style.setProperty('--progress', 1 - progress);
        progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <div className='h-[70vh]'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                className="mySwiper rounded-lg"
            >
                {/* <SwiperSlide>
                    <img className='h-[60vh]' src="https://i.ibb.co/RY9cfzx/istockphoto-1263424631-612x612.jpg" alt="" />
                </SwiperSlide> */}
                <SwiperSlide>
                    <img className='relative' src="https://i.ibb.co/bPMbc7C/Learning.jpg" alt="" />
                    <h1 className='absolute'>hello bro how are you</h1>
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/TWhYPBr/consejos-sacar-maximo-partido-elearning.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="https://i.ibb.co/R95PLqh/istockphoto-1271697681-612x612.jpg" alt="" />
                </SwiperSlide>

                <div className="autoplay-progress" slot="container-end">
                    <svg viewBox="0 0 48 48" ref={progressCircle}>
                        <circle cx="24" cy="24" r="20"></circle>
                    </svg>
                    <span ref={progressContent}></span>
                </div>
            </Swiper>
        </div>
    );
};

export default Slider;