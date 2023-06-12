import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import Title from '../../../components/Title/Title';

const MyEnrolledClasses = () => {
    useTitle('Dashboard | My Enrolled Classes')

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: myEnrolledClasses = [], refetch } = useQuery(['myEnrolledClasses'], async () => {
        const res = await axiosSecure.get(`/myEnrolledClasses?email=${user?.email}`)
        return res.data;
    })
    console.log(myEnrolledClasses);


    return (
        <div>
            <Title title='My Enrolled Classes'></Title>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg bg-amber-50'>
                            <th>SL No.</th>
                            <th>Details</th>
                            <th>Instructor Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myEnrolledClasses.map((myEnrolledClass, i) => <tr key={myEnrolledClass._id} className="hover">
                                <th>{i + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={myEnrolledClass.classImage} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{myEnrolledClass.className}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="font-bold">{myEnrolledClass.instructorName}</td>
                                <td>${myEnrolledClass.price}</td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MyEnrolledClasses;