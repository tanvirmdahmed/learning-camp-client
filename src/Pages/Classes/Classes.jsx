import React, { useEffect, useState } from 'react';
import Title from '../../components/Title/Title';
import Cls from '../Cls/Cls';
import useTitle from '../../Hooks/useTitle';

const Classes = () => {
    useTitle('Classes')
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch('https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/classes')
            .then(res => res.json())
            .then(data => setClasses(data))
    }, [])

    return (
        <zoom>
            <div className='my-12'>
                <Title title='All Classes'></Title>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {
                        classes.map(cls => <Cls
                            key={cls._id}
                            cls={cls}
                        ></Cls>)
                    }
                </div>
            </div>
        </zoom>
    );
};

export default Classes;