import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = ({ to, children }) => {
    return (
        <div>
            <NavLink
                to={to}
                className={({ isActive }) => isActive ? "sm:text-blue-600 md:text-blue-600 lg:bg-blue-600 lg:text-white lg:px-6 lg:py-8 lg:rounded-b-3xl lg:font-bold" : ""}
            >
                {children}
            </NavLink>
        </div>
    );
};

export default ActiveLink;