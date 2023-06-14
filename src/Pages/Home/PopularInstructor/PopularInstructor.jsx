import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Title from '../../../components/Title/Title';
import { Zoom } from 'react-awesome-reveal';
import axios from 'axios';


const PopularInstructor = () => {
    const { data: popularInstructors = [], refetch } = useQuery(['popularInstructors'], async () => {
        const res = await axios.get('https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/popularInstructors')
        return res.data;
    })
    console.log(popularInstructors);

    return (
        <div className='my-12'>
            <Title title='Popular Instructor'></Title>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto'>
                <Zoom delay={1e3} cascade damping={1e-1}>
                    {
                        popularInstructors.map(instructor => <div key={instructor._id} className="card w-96 bg-base-100 shadow-xl mx-auto">
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
                </Zoom>
            </div>
        </div>

    );
};

export default PopularInstructor;