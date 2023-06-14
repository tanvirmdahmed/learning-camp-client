import React from 'react';
import Title from '../../components/Title/Title';
import Cls from '../Cls/Cls';
import useTitle from '../../Hooks/useTitle';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Classes = () => {
    useTitle('Classes')
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axios.get('https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/classes')
        return res.data;
    })
    console.log(classes);

    return (
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
    );
};

export default Classes;