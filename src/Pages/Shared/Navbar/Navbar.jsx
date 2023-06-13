import React, { useContext } from 'react';
import ActiveLink from './ActiveLink';
import { Link } from 'react-router-dom';
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaUser } from 'react-icons/fa';
import useAuth from '../../../Hooks/useAuth';
import useAdmin from '../../../Hooks/useAdmin';
import useInstructor from '../../../Hooks/useInstructor';
import ThemeChange from '../../../components/ThemeChange/ThemeChange';

const Navbar = () => {
    const { user, logOut, photo } = useAuth();
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();


    const handleLogOut = () => {
        logOut()
            .then()
            .catch(error => console.log(error));
    }

    return (
        <div className="navbar text-base-content bg-base-200 rounded-b-lg shadow-lg px-4 py-4 w-full mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <CgMenuLeftAlt className='h-8 w-8'></CgMenuLeftAlt>
                    </label>

                    <div tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-4 bg-base-200 shadow rounded-box w-40 gap-4 z-50">
                        <ActiveLink to='/'>Home</ActiveLink>
                        <ActiveLink to='/instructors'>Instructors</ActiveLink>
                        <ActiveLink to='/classes'>Classes</ActiveLink>
                        {
                            (!isAdmin && !isInstructor && user) && <ActiveLink to='/dashboard/mySelectedClasses'>Dashboard</ActiveLink>
                        }
                        {
                            isInstructor && <ActiveLink to='/dashboard/addClass'>Dashboard</ActiveLink>
                        }
                        {
                            isAdmin && <ActiveLink to='/dashboard/manageClasses'>Dashboard</ActiveLink>
                        }
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    <Link to='/'>
                        <img src="https://i.ibb.co/n3qfJ7W/summer-learning-camp-1.png" className='w-8 md:w-10 lg:w-14' alt="" />
                    </Link>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <div className="menu menu-horizontal gap-7 text-lg">
                    <ActiveLink to='/'>Home</ActiveLink>
                    <ActiveLink to='/instructors'>Instructors</ActiveLink>
                    <ActiveLink to='/classes'>Classes</ActiveLink>
                    {
                        (!isAdmin && !isInstructor && user) && <ActiveLink to='/dashboard/mySelectedClasses'>Dashboard</ActiveLink>
                    }
                    {
                        isInstructor && <ActiveLink to='/dashboard/addClass'>Dashboard</ActiveLink>
                    }
                    {
                        isAdmin && <ActiveLink to='/dashboard/manageClasses'>Dashboard</ActiveLink>
                    }
                </div>
            </div>
            <div className="navbar-end gap-6">
                {/* <div className="avatar">
                    <div className="w-8 md:w-10 lg:w-12 rounded-full">
                        <img src="https://i.ibb.co/d5jTFNf/3147853.jpg" />
                    </div>
                </div> */}
                {
                    user &&
                    <div className="avatar">
                        <div className="w-8 md:w-12 lg:w-12 border-gray-200 border-2 rounded-full">
                            {
                                photo ? <img title={user.displayName} className='tool' src={photo} /> : <div className='h-full w-full flex justify-center items-center'><FaUser title={user.displayName} className='text-2xl'></FaUser></div>
                            }

                        </div>
                    </div>
                }
                {
                    user ? <Link onClick={handleLogOut} className="btn bg-gradient-to-r from-[#C0966B] to-[#9f570f]  border-none text-zinc-50">Logout</Link> : <Link to='/login' className="btn bg-gradient-to-r from-[#aa6117] to-[#C0966B] border-none text-zinc-50">Login</Link>
                }
                <ThemeChange></ThemeChange>
            </div>
        </div>
    );
};

export default Navbar;