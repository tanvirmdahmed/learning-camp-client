import React from 'react';
import Title from '../../../components/Title/Title';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useTitle from '../../../Hooks/useTitle';

const ManageUsers = () => {
    useTitle('Dashboard | Manage Users')
    const [axiosSecure] = useAxiosSecure();
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure.get(`/users`)
        return res.data;
    })

    const handleMakeAdmin = user => {
        fetch(`https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/users/admin/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'admin' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };


    const handleMakeInstructor = user => {
        fetch(`https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/users/instructor/${user._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: 'instructor' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    refetch();
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: `${user.name} is an Instructor Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };



    return (
        <div>
            <Title title='Manage Users'></Title>

            <div className="overflow-x-auto">
                <table className="table tab-rounded-lg">
                    {/* head */}
                    <thead>
                        <tr className='text-lg font-bold text-gray-600 bg-amber-50'>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Make Admin</th>
                            <th>Make Instructor</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, index) => <tr key={user._id}>

                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photo} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-sm opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold capitalize">
                                        {
                                            user?.role ? <span>{user.role}</span> : <span>student</span>
                                        }
                                    </div>
                                </td>
                                <td>
                                    {
                                        user?.role === 'admin' ? <button className="btn btn-neutral btn-xs capitalize" disabled>Make Admin</button> : <button onClick={() => handleMakeAdmin(user)} className="btn btn-neutral btn-xs capitalize">Make Admin</button>
                                    }
                                </td>
                                <th>
                                    {
                                        user?.role === 'instructor' ? <button className="btn btn-neutral btn-xs capitalize" disabled>Make Instructor</button> : <button onClick={() => handleMakeInstructor(user)} className="btn btn-neutral btn-xs capitalize">Make Instructor</button>
                                    }
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;