import React from 'react';
import Slider from '../Slider/Slider';
import NewsLetter from '../NewsLetter/NewsLetter';
import useTitle from '../../../Hooks/useTitle';
import PopularInstructor from '../PopularInstructor/PopularInstructor';

const Home = () => {
    useTitle('Home')
    return (
        <div>
            <Slider></Slider>
            <PopularInstructor></PopularInstructor>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;