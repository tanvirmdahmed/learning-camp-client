import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Title from '../../../components/Title/Title';
import { FaUserEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useTitle from '../../../Hooks/useTitle';

const MyClasses = () => {
    useTitle('Dashboard | My Classes')
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: myClasses = [], refetch } = useQuery(['myClasses'], async () => {
        const res = await axiosSecure.get(`/myClasses?email=${user?.email}`)
        return res.data;
    })
    console.log(myClasses);

    const handleEditClass = (event, cls) => {
        event.preventDefault();

        const form = event.target;

        const className = form.className.value;
        const classImage = form.classImage.value;
        const availableSeats = parseInt(form.availableSeats.value);
        const price = parseInt(form.price.value);

        const updatedClass = { className, classImage, availableSeats, price }

        console.log(updatedClass);

        // send data to the server
        fetch(`https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/classes/${cls._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedClass)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: `${cls.className} is updated`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })
                    refetch()
                }
            })
    }


    return (
        <div className='my-12'>
            <Title title='My Classes'></Title>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-center bg-purple-100 text-base'>
                            <th>SL No.</th>
                            <th>Classes</th>
                            <th>Enrolled</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Feedback</th>
                            <th>Update Class</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myClasses.map((cls, index) => <tr key={cls._id} className='text-center hover'>
                                <td className='font-semibold text-base'>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={cls.classImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{cls.className}</div>
                                            <div className="text-sm opacity-70">Available Seats: {cls.availableSeats}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="">Enroll Count</span>
                                </td>
                                <td>${cls.price}</td>
                                <th className='capitalize'>
                                    {
                                        cls?.status ? <span>{cls?.status}</span> : <span>pending</span>
                                    }
                                </th>
                                <th className='capitalize w-40'>
                                    {
                                        cls?.feedback ? <span><small>{cls.feedback}</small></span> : <span><small>No feedback</small></span>
                                    }
                                </th>
                                <th className=''>
                                    {/* modal button */}
                                    <label htmlFor={cls._id} className="btn btn-success btn-md"><FaUserEdit></FaUserEdit></label>

                                    {/* modal body */}
                                    <input type="checkbox" id={cls._id} className="modal-toggle" />
                                    <div className="modal">
                                        <div className="modal-box whitespace-normal items-start">
                                            <label htmlFor={cls._id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                            {/* <h1 className='text-2xl font-bold'>{toyName}</h1> */}
                                            <form onSubmit={(event) => handleEditClass(event, cls)}>
                                                {/* form class name and image row */}

                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Class Name</span>
                                                    </label>
                                                    <label>
                                                        <input type="text" name="className" defaultValue={cls.className} placeholder="Class Name" className="input input-bordered w-full font-normal" />
                                                    </label>
                                                </div>
                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Class Image</span>
                                                    </label>
                                                    <label>
                                                        <input type="url" name="classImage" defaultValue={cls.classImage} placeholder="Class Image" className="input input-bordered w-full font-normal" />
                                                    </label>
                                                </div>

                                                {/* form available seats url and price row */}

                                                <div className="form-control w-full">
                                                    <label className="label">
                                                        <span className="label-text">Available Seats</span>
                                                    </label>
                                                    <label>
                                                        <input type="text" name="availableSeats" defaultValue={cls.availableSeats} placeholder="Available Seats" className="input input-bordered w-full font-normal" />
                                                    </label>
                                                </div>
                                                <div className="form-control w-full mb-6">
                                                    <label className="label">
                                                        <span className="label-text">Price</span>
                                                    </label>
                                                    <label>
                                                        <input type="text" name="price" defaultValue={cls.price} placeholder="Price" className="input input-bordered w-full font-normal" />
                                                    </label>
                                                </div>


                                                <input type="submit" value="Update Class" className="btn btn-block btn-success border-none" />
                                            </form>
                                        </div>
                                    </div>
                                </th>
                            </tr>)
                        }



                    </tbody>

                </table>
            </div>

        </div >
    );
};

export default MyClasses;