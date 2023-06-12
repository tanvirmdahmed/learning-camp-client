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
        <div className='h-[90vh] my-12'>
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
                <SwiperSlide>
                    <img className='relative' src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXhlcmNpc2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80" alt="" />
                    <div className='absolute space-y-4'>
                        <h1 className='text-white font-bold text-7xl'>MAKE YOUR SUMMER</h1>
                        <p className='text-red-300 font-bold text-5xl'>Unforgettable!</p>
                        <button className='btn btn-success btn-lg rounded-full'>Enroll Now</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='relative' src="https://i0.wp.com/studyinfitness.com/wp-content/uploads/2020/07/mor-shani-li4dxZ0KYRw-unsplash-scaled.jpg?fit=2560%2C1787&ssl=1" alt="" />
                    <div className='absolute space-y-4'>
                        <h1 className='text-white font-bold text-7xl'>MAKE YOUR SUMMER</h1>
                        <p className='text-slate-300 font-bold text-5xl'>Unforgettable!</p>
                        <button className='btn btn-success btn-lg rounded-full'>Enroll Now</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='relative' src="https://images.healthshots.com/healthshots/en/uploads/2023/05/10200007/exercise.jpg" alt="" />
                    <div className='absolute space-y-4'>
                        <h1 className='text-white font-bold text-7xl'>MAKE YOUR SUMMER</h1>
                        <p className='text-slate-300 font-bold text-5xl'>Unforgettable!</p>
                        <button className='btn btn-success btn-lg rounded-full'>Enroll Now</button>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='relative' src="https://wp.en.aleteia.org/wp-content/uploads/sites/2/2018/05/web3-stretch-stretching-exercise-health-wellness-woman-sunset-shutterstock.jpg" alt="" />
                    <div className='absolute space-y-4'>
                        <h1 className='text-white font-bold text-7xl'>MAKE YOUR SUMMER</h1>
                        <p className='text-slate-300 font-bold text-5xl'>Unforgettable!</p>
                        <button className='btn btn-success btn-lg rounded-full'>Enroll Now</button>
                    </div>
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