import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import useInstructor from '../../Hooks/useInstructor';
import { FaCashRegister, FaHistory, FaPlusSquare, FaRegBookmark, FaTachometerAlt, FaTasks, FaUserEdit } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import useTitle from '../../Hooks/useTitle';

const Dashboard = () => {
    useTitle('Dashboard')
    const { user } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();

    const userProfile = <div className='flex flex-col items-center mx-auto'>
        <div className="avatar">
            <div className="w-24 mask mask-squircle">
                <img src={user.photoURL} />
            </div>
        </div>
        <div>
            <h2 className="card-title mt-3">{user.displayName}</h2>
        </div>
    </div>


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
                        {userProfile}

                        <div className="divider"></div>

                        {/* Student */}
                        {
                            (!isAdmin && !isInstructor) && <>
                                <li><Link to='/dashboard/mySelectedClasses'><FaRegBookmark></FaRegBookmark> My Selected Classes</Link></li>
                                <li><Link to='/dashboard/myEnrolledClasses'><FaCashRegister></FaCashRegister> My Enrolled Classes</Link></li>
                                <li><Link to='/dashboard/paymentHistory'><FaHistory></FaHistory> Payment History</Link></li>
                            </>
                        }

                        {/* Instructor */}
                        {
                            isInstructor && <>
                                <li><Link to='/dashboard/addClass'><FaPlusSquare></FaPlusSquare> Add a Class</Link></li>
                                <li><Link to='/dashboard/myClasses'><FaTachometerAlt></FaTachometerAlt> My Classes</Link></li>
                            </>
                        }

                        {/* Admin */}
                        {
                            isAdmin && <>
                                <li><Link to='/dashboard/manageClasses'><FaTasks></FaTasks> Manage Classes</Link></li>
                                <li><Link to='/dashboard/manageUsers'><FaUserEdit></FaUserEdit> Manage Users</Link></li>
                            </>
                        }

                    </ul>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;