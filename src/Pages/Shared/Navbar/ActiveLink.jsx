import React from 'react';
import { NavLink } from 'react-router-dom';

const ActiveLink = ({ to, children }) => {
    return (
        <div>
            <NavLink
                to={to}
                className={({ isActive }) => isActive ? "text-[#C0966B] md:text-[#C0966B] lg:bg-[#C0966B] lg:text-white lg:px-3 lg:py-8 lg:rounded-b-3xl lg:font-bold shadow-md" : ""}
            >
                {children}
            </NavLink>
        </div>
    );
};

export default ActiveLink;