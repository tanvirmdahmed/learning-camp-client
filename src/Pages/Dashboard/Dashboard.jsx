import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useInstructor from '../../Hooks/useInstructor';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();


    return (
        <div className='my-2'>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <div className='mx-6 my-6'>
                        <Outlet></Outlet>
                    </div>

                </div>
                <div className="drawer-side drop-shadow-lg">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu text-lg space-y-3 font-semibold p-4 w-80 h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}

                        {/* Student */}
                        {
                            (!isAdmin && !isInstructor) && <>
                                <li><Link to='/dashboard/mySelectedClasses'>My Selected Classes</Link></li>
                                <li><Link to='/dashboard/payment'>Payment</Link></li>
                                <li><Link to='/dashboard/myEnrolledClasses'>My Enrolled Classes</Link></li>
                                <li><Link to='/dashboard/paymentHistory'>Payment History</Link></li>
                            </>
                        }

                        {/* Instructor */}
                        {
                            isInstructor && <>
                                <li><Link to='/dashboard/addClass'>Add a Class</Link></li>
                                <li><Link to='/dashboard/myClasses'>My Classes</Link></li>
                            </>
                        }

                        {/* Admin */}
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/manageClasses'>Manage Classes</Link></li>
                                <li><Link to='/dashboard/manageUsers'>Manage Users</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;