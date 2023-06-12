import React, { useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAdmin from '../../Hooks/useAdmin';
import useInstructor from '../../Hooks/useInstructor';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Zoom } from 'react-awesome-reveal';

const Cls = ({ cls }) => {
    const { user, loading } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], refetch } = useQuery({
        queryKey: ['selectedClasses'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/selectedClasses?email=${user?.email}`);
            return res.data;
        }
    });

    console.log(selectedClasses);

    const { _id, className, classImage, instructorName, availableSeats, price } = cls;

    const alreadyExist = selectedClasses.find(selectedClass => selectedClass.classId === cls._id);

    const handleSelectedClass = (_id) => {

        if (!user) {
            Navigate('/login')
            return;
        }

        let email = user?.email;
        const selectedClass = { classId: _id, email, classImage, className, instructorName, availableSeats, price }

        fetch('https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/selectedClasses', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(selectedClass)
        })
            .then(res => res.json())
            .then(data => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Class successfully selected.',
                    showConfirmButton: false,
                    timer: 2500
                });
                refetch();
            })
    }


    return (
        <Zoom>
            <div>
                <div className={availableSeats === 0 ? 'card card-compact w-[80%] h-[420px] bg-red-400 shadow-xl mx-auto' : 'card card-compact w-[80%] h-[420px] bg-base-100 shadow-xl mx-auto'}>
                    <figure><img src={classImage} alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">{className}</h2>
                        <p><strong>Instructor Name:</strong> {instructorName}</p>
                        <p><strong>Available Seats:</strong> {availableSeats}</p>
                        <p><strong>Price:</strong> ${price}</p>
                        <div className="">
                            {
                                (availableSeats === 0 || isAdmin || isInstructor || alreadyExist) ? <button className='btn btn-neutral border-none' disabled>Select</button> : <button onClick={() => handleSelectedClass(_id)} className='btn btn-neutral border-none'>Select</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Zoom>
    );
};

export default Cls;