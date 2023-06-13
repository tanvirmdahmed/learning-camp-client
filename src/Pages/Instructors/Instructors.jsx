import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Title from '../../components/Title/Title';
import useTitle from '../../Hooks/useTitle';
import { Fade } from 'react-awesome-reveal';
import axios from 'axios';

const Instructors = () => {
    useTitle('Instructors')
    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await axios.get('http://localhost:5000/instructors')
        return res.data;
    })
    console.log(instructors);

    return (
        <div className='my-12'>
            <Title title='All Instructors'></Title>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto'>
                <Fade cascade damping={1e-1}>
                    {
                        instructors.map(instructor => <div key={instructor._id} className="card w-96 bg-base-100 shadow-xl mx-auto">
                            <figure className="px-10 pt-10">
                                <img src={instructor.photo} alt="Shoes" className="rounded-xl" />
                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{instructor.name}</h2>
                                <p>{instructor.email}</p>
                                <div className="card-actions">
                                    <button className="btn btn-neutral">Contact</button>
                                </div>
                            </div>
                        </div>)
                    }
                </Fade>
            </div>
        </div>
    );
};

export default Instructors;