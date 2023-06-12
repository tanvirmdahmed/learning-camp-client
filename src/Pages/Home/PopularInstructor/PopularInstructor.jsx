import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Title from '../../../components/Title/Title';
import { Zoom } from 'react-awesome-reveal';


const PopularInstructor = () => {
    useTitle('Instructors')
    // const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: instructors = [], refetch } = useQuery(['instructors'], async () => {
        const res = await axiosSecure.get('/instructors')
        return res.data;
    })
    console.log(instructors);

    return (
        <Zoom>
            <div className='my-12'>
                <Title title='Popular Instructor'></Title>
                <div className='grid grid-cols-3 gap-4 mx-auto'>
                    {
                        instructors.slice(0, 6).map(instructor => <div key={instructor._key} className="card w-96 bg-slate-50 shadow-xl mx-auto">
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
                </div>
            </div>
        </Zoom>
    );
};

export default PopularInstructor;