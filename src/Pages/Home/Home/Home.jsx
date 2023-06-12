import React from 'react';
import Slider from '../Slider/Slider';
import NewsLetter from '../NewsLetter/NewsLetter';
import useTitle from '../../../Hooks/useTitle';

const Home = () => {
    useTitle('Home')
    return (
        <div>
            <Slider></Slider>
            <NewsLetter></NewsLetter>
        </div>
    );
};

export default Home;