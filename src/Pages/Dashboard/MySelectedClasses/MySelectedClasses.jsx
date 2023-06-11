import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Title from '../../../components/Title/Title';
import MySelectedClass from './MySelectedClass';


const MySelectedClasses = () => {
    const [selectedClasses, setSelectedClassed] = useState([]);
    const { user } = useAuth();
    // // const [axiosSecure] = useAxiosSecure();
    // const { data: selectedClasses = [], refetch } = useQuery(['selectedClasses'], async () => {
    //     const res = await axios.get(`selectedClasses?email=${user?.email}`)
    //     return res.data;
    // })


    useEffect(() => {
        axios.get(`http://localhost:5000/selectedClasses?email=${user?.email}`)
            .then(data => setSelectedClassed(data.data))
    }, [])
    console.log(selectedClasses);

    return (
        <div>
            <Title title='My Selected Classes'></Title>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg bg-amber-50'>
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
                            ></MySelectedClass>)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default MySelectedClasses;