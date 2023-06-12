import React from 'react';
import useTitle from '../../../Hooks/useTitle';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';

const PaymentHistory = () => {
    useTitle('Dashboard | Payment History')

    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: myPaymentHistory = [], refetch } = useQuery(['myPaymentHistory'], async () => {
        const res = await axiosSecure.get(`/myPaymentHistory?email=${user?.email}`)
        return res.data;
    })
    console.log(myPaymentHistory);

    return (
        <div>
            <Title title='My Selected Classes'></Title>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-lg bg-amber-50 text-center'>
                            <th>SL No.</th>
                            <th>Details</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClasses.map((selectedClass, i) => <tr className="hover text-center">
                                <th>{i + 1}</th>
                                <td>{className}</td>
                                <td>{instructorName}</td>
                                <td>${price}</td>
                                <td>
                                    <Link onClick={() => setModal(true)} className="btn btn-square btn-neutral btn-sm">Pay</Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                    </button>
                                </td>
                                <Payment isOpen={modal} closeModal={closeModal} selectedClass={selectedClass} />
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>


        </div>
    );
};

export default PaymentHistory;