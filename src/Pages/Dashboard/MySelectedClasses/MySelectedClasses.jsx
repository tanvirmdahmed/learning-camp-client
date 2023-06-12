import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../../../components/Title/Title';
import MySelectedClass from './MySelectedClass';
import Swal from 'sweetalert2';
import useTitle from '../../../Hooks/useTitle';


const MySelectedClasses = () => {
    useTitle('Dashboard | My Selected Classes')
    // const [selectedClasses, setSelectedClasses] = useState([]);
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: selectedClasses = [], refetch } = useQuery(['selectedClasses'], async () => {
        const res = await axiosSecure.get(`/selectedClasses?email=${user?.email}`)
        return res.data;
    })
    console.log(selectedClasses);


    // useEffect(() => {
    //     axios.get(`https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/selectedClasses?email=${user?.email}`)
    //         .then(data => setSelectedClasses(data.data))
    // }, [])
    // console.log(selectedClasses);


    const handleDelete = _id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://b7a12-summer-camp-server-side-tanvirmdahmed.vercel.app/selectedClasses/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire(

                                'Deleted!',
                                'Your selected class has been deleted.',
                                'success'
                            )
                            // const remaining = selectedClasses.filter(selectedClass => selectedClass._id !== _id);
                            // setSelectedClasses(remaining);
                            refetch()
                        }
                    })
            }
        })
    }

    return (
        <div>
            <Title title='My Selected Classes'></Title>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg bg-amber-50 text-center'>
                            <th>SL No.</th>
                            <th>Class Name</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                            <th>Payment</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClasses.map((selectedClass, i) => <MySelectedClass
                                key={selectedClass._id}
                                selectedClass={selectedClass}
                                i={i}
                                handleDelete={handleDelete}
                            ></MySelectedClass>)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MySelectedClasses;