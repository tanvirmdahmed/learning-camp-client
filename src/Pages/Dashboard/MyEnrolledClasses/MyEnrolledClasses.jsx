import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

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
            My Enrolled Classes
        </div>
    );
};

export default MyEnrolledClasses;