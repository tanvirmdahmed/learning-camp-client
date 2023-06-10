import React from 'react';

const Title = ({ title }) => {
    return (
        <div className='flex justify-center mb-6'>
            <h1 className='text-3xl text-[#C0966B] font-bold border-t-4 border-b-4 py-2 px-8 border-[#C0966B] border-dashed w-fit'>{title}</h1>
        </div>
    );
};

export default Title;