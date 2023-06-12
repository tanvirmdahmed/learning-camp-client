import React from 'react';
import { Zoom } from 'react-awesome-reveal';
import { FaTelegramPlane } from 'react-icons/fa';

const NewsLetter = () => {
    return (
        <Zoom>
            <div className="hero h-[30vh] md:h-[60vh] lg:h-[70vh] my-12 rounded-lg" style={{ backgroundImage: `url("https://i.ibb.co/16cK40k/sunset-yoga-exercise-wallpaper-5120x3200-10.jpg")` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
                        <p className="mb-2 md:mb-4 lg:mb-5 sm:text-lg">NEWSLETTER SIGNUP</p>
                        <h1 className="mb-4 md:mb-5 lg:mb-5 text-3xl md:text-4xl lg:text-5xl font-bold">Subscribe to updates!</h1>
                        <div className="form-control">
                            <div className="input-group justify-center">
                                <input type="text" placeholder="Enter Your Email Address" className="input input-bordered w-[50%] text-black opacity-85" />
                                <button className="btn btn-square btn-neutral">
                                    <FaTelegramPlane></FaTelegramPlane>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Zoom>
    );
};

export default NewsLetter;