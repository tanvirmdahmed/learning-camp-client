import React from 'react';
import useAuth from '../../Hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Cls = ({ cls }) => {
    const { user } = useAuth();

    const { _id, className, classImage, instructorName, availableSeats, price } = cls;

    const handleSelectedClass = () => {
        if (!user) {
            Navigate('/login')
            return;
        }

        let email = user?.email;
        const selectedClass = { email, classImage, className, instructorName, availableSeats, price }

        fetch('http://localhost:5000/selectedClasses', {
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
            })
    }


    return (
        <div>
            <div className={availableSeats === 0 ? 'card card-compact w-[80%] bg-red-400 shadow-xl mx-auto' : 'card card-compact w-[80%] bg-base-100 shadow-xl mx-auto'}>
                <figure><img src={classImage} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{className}</h2>
                    <p><strong>Instructor Name:</strong> {instructorName}</p>
                    <p><strong>Available Seats:</strong> {availableSeats}</p>
                    <p><strong>Price:</strong> ${price}</p>
                    <div className="">
                        {/* <button className={availableSeats === 0 ? 'btn bg-red-800 border-none text-white' : 'btn btn-neutral border-none'}>Select</button> */}
                        {
                            availableSeats === 0 ? <button className='btn btn-neutral border-none' disabled>Select</button> : <button onClick={handleSelectedClass} className='btn btn-neutral border-none'>Select</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cls;