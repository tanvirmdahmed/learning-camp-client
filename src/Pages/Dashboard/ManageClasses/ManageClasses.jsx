import React from 'react';
import Title from '../../../components/Title/Title';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import FeedbackModal from '../ManageUsers/FeedbackModal';
import useTitle from '../../../Hooks/useTitle';

const ManageClasses = () => {
    useTitle('Dashboard | Manage Classes')
    const { data: classes = [], refetch } = useQuery(['classes'], async () => {
        const res = await axios.get('https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/classes')
        return res.data;
    })
    console.log(classes);

    const handleApprove = cls => {
        fetch(`https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/classes/approve/${cls._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'approved' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${cls.className} is approved!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleDeny = cls => {
        fetch(`https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/classes/deny/${cls._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'denied' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${cls.className} is denied!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }


            });
        console.log(cls.feedback);
    };

    const handleSendFeedback = (event, cls) => {
        event.preventDefault();

        const form = event.target;
        const feedback = form.feedback.value;

        fetch(`https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/classes/feedback/${cls._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ feedback })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `Your feedback successfully sent`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    }

    return (
        <div className='my-12'>
            <Title title='Manage Classes'></Title>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-center bg-purple-100 text-base'>
                            <th>SL No.</th>
                            <th>Classes</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((cls, index) => <tr key={cls._id} className='text-center hover'>
                                <td className='font-semibold text-base'>{index + 1}</td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-20 h-20">
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
                                    <span className='font-bold'>{cls.instructorName}</span>
                                    <br />
                                    <span className="">{cls.instructorEmail}</span>
                                </td>
                                <td>${cls.price}</td>
                                <th className='capitalize'>
                                    {
                                        cls?.status ? <span>{cls?.status}</span> : <span>pending</span>
                                    }
                                </th>
                                <th className='space-y-3 flex flex-col'>
                                    <button onClick={() => handleApprove(cls)} className="btn btn-success btn-xs" disabled={cls?.status}>Approve</button>
                                    <button onClick={() => handleDeny(cls)} className="btn btn-success btn-xs" disabled={cls.status}>Deny</button>
                                    <div>
                                        {/* modal button */}
                                        <label htmlFor={cls._id} className="btn btn-success btn-xs" disabled={cls?.feedback}>
                                            Feedback
                                        </label>
                                        {/* modal body */}
                                        <FeedbackModal
                                            cls={cls}
                                            handleSendFeedback={handleSendFeedback}
                                        ></FeedbackModal>
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

export default ManageClasses;